import type { Molecule } from 'openchemlib';

export type ParsedCustomLabel =
  | { category: 'numberOnly'; value: number }
  | { category: 'numberPrime'; prime: number; value: number }
  | { category: 'numberLowerLetter'; letter: string; value: number }
  | { category: 'lowerLetterNumber'; letter: string; value: number }
  | { category: 'oneLowerLetter'; letter: string };

function parseLabel(label: string): ParsedCustomLabel | void {
  if (/^\d+$/.test(label)) {
    return { category: 'numberOnly', value: Number.parseInt(label, 10) };
  }

  const numberPrimeMatch = label.match(/^(?<numberStr>\d+)(?<prime>'+)$/);
  if (numberPrimeMatch) {
    const { numberStr, prime } = numberPrimeMatch.groups ?? {};

    const nPrime = prime.length;
    const number = Number.parseInt(numberStr, 10);

    return { category: 'numberPrime', prime: nPrime, value: number };
  }

  const numberLowerLetterMatch = label.match(
    /^(?<numberStr>\d+)(?<letter>[a-z])$/,
  );
  if (numberLowerLetterMatch) {
    const { numberStr, letter } = numberLowerLetterMatch.groups ?? {};
    const number = Number.parseInt(numberStr, 10);

    return { category: 'numberLowerLetter', letter, value: number };
  }

  const lowerLetterNumberMatch = label.match(
    /^(?<letter>[a-z])(?<numberStr>\d+)$/,
  );
  if (lowerLetterNumberMatch) {
    const { numberStr, letter } = lowerLetterNumberMatch.groups ?? {};
    const number = Number.parseInt(numberStr, 10);

    return { category: 'lowerLetterNumber', letter, value: number };
  }

  // '`' is the char before 'a', consider it as the 0 of the lowercase letters
  // needed for previousParsedCustomLabel in oneLowerLetter category
  if (/^[`-z]$/.test(label)) {
    return { category: 'oneLowerLetter', letter: label };
  }
}

/**
 * split the labels into different categories
 * @param labels - The labels to split.
 * @returns An object containing the split labels by categories.
 */
export function splitCustomLabels(labels: Iterable<string>) {
  const numberOnly = new Set<number>();
  const numberPrime = new Map<number, Set<number>>();
  const numberLowerLetter = new Map<string, Set<number>>();
  const lowerLetterNumber = new Map<string, Set<number>>();
  const oneLowerLetter = new Set<string>();

  // split the labels into different categories
  for (const label of labels) {
    const parsedLabel = parseLabel(label);
    if (!parsedLabel) continue;

    switch (parsedLabel.category) {
      case 'numberOnly':
        numberOnly.add(parsedLabel.value);
        break;
      case 'numberPrime': {
        const { prime, value } = parsedLabel;
        if (numberPrime.has(prime)) numberPrime.get(prime)?.add(value);
        else numberPrime.set(prime, new Set([value]));
        break;
      }
      case 'numberLowerLetter': {
        const { letter, value } = parsedLabel;

        if (numberLowerLetter.has(letter)) {
          numberLowerLetter.get(letter)?.add(value);
        } else {
          numberLowerLetter.set(letter, new Set([value]));
        }
        break;
      }
      case 'lowerLetterNumber': {
        const { letter, value } = parsedLabel;

        if (lowerLetterNumber.has(letter)) {
          lowerLetterNumber.get(letter)?.add(value);
        } else {
          lowerLetterNumber.set(letter, new Set([value]));
        }
        break;
      }

      case 'oneLowerLetter':
        oneLowerLetter.add(parsedLabel.letter);
        break;
      default:
        break;
    }
  }

  return {
    numberOnly,
    numberPrime,
    numberLowerLetter,
    lowerLetterNumber,
    oneLowerLetter,
  };
}

function nextParsedCustomLabel(
  parsedLabel: ParsedCustomLabel,
): ParsedCustomLabel {
  switch (parsedLabel.category) {
    case 'numberOnly':
    case 'numberPrime':
    case 'numberLowerLetter':
    case 'lowerLetterNumber': {
      return { ...parsedLabel, value: parsedLabel.value + 1 };
    }
    case 'oneLowerLetter': {
      const { letter } = parsedLabel;
      if (letter === 'z') return { category: 'numberOnly', value: 1 };

      const codePoint = letter.codePointAt(0);
      if (typeof codePoint !== 'number') {
        throw new Error(
          `no code point available on position 0 for "${letter}"`,
        );
      }
      return { ...parsedLabel, letter: String.fromCodePoint(codePoint + 1) };
    }
    default:
      throw new Error('Unreachable code');
  }
}

function labelsHasParsedCustomLabel(
  label: ParsedCustomLabel,
  labels: ReturnType<typeof splitCustomLabels>,
) {
  switch (label.category) {
    case 'numberOnly':
      return labels.numberOnly.has(label.value);
    case 'numberPrime': {
      const { prime, value } = label;
      const numbers = labels.numberPrime.get(prime);
      return numbers?.has(value) ?? false;
    }
    case 'numberLowerLetter': {
      const { letter, value } = label;
      const numbers = labels.numberLowerLetter.get(letter);
      return numbers?.has(value) ?? false;
    }
    case 'lowerLetterNumber': {
      const { letter, value } = label;
      const numbers = labels.lowerLetterNumber.get(letter);
      return numbers?.has(value) ?? false;
    }
    case 'oneLowerLetter': {
      const { letter } = label;
      return labels.oneLowerLetter.has(letter);
    }
    default:
      throw new Error('Unreachable code');
  }
}

function serializeParsedLabel(label: ParsedCustomLabel) {
  switch (label.category) {
    case 'numberOnly':
      return label.value.toString();
    case 'numberPrime': {
      const { prime, value } = label;
      return `${value}${"'".repeat(prime)}`;
    }
    case 'numberLowerLetter': {
      const { letter, value } = label;
      return `${value}${letter}`;
    }
    case 'lowerLetterNumber': {
      const { letter, value } = label;
      return `${letter}${value}`;
    }
    case 'oneLowerLetter': {
      const { letter } = label;
      return letter;
    }
    default:
      throw new Error('Unreachable code');
  }
}

/**
 * Find the next possible custom label
 * @param label - The current label.
 * @param labels - The labels to skip.
 * @returns The next possible custom label.
 */
export function getNextCustomLabel(
  label: string | undefined,
  labels: ReturnType<typeof splitCustomLabels>,
) {
  let parsedLabel = parseLabel(label ?? '0') ?? {
    category: 'numberOnly',
    value: 0,
  };

  while (true) {
    parsedLabel = nextParsedCustomLabel(parsedLabel);
    if (labelsHasParsedCustomLabel(parsedLabel, labels)) continue;
    return serializeParsedLabel(parsedLabel);
  }
}

function previousParsedCustomLabel(
  parsedLabel: ParsedCustomLabel,
): ParsedCustomLabel {
  switch (parsedLabel.category) {
    case 'numberOnly':
    case 'numberPrime':
    case 'numberLowerLetter':
    case 'lowerLetterNumber': {
      return { ...parsedLabel, value: Math.max(parsedLabel.value - 1, 0) };
    }
    case 'oneLowerLetter': {
      const { letter } = parsedLabel;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const minCodePoint = '`'.codePointAt(0)!; // ` is the char before a
      const codePoint = letter.codePointAt(0);
      if (typeof codePoint !== 'number') {
        throw new Error(
          `no code point available on position 0 for "${letter}"`,
        );
      }

      return {
        ...parsedLabel,
        letter: String.fromCodePoint(Math.max(codePoint - 1, minCodePoint)),
      };
    }
    default:
      throw new Error('Unreachable code');
  }
}

/**
 * Get the previous possible custom label.
 * Used by UI onClean feature, set the label as previous,
 * so the next quick numbering to be the same as the deleted one.
 *
 * Known edge case issues:
 * - If the deleted label is "`", the next label will be "a" instead of "`"
 * - If the deleted label is "0", the next label will be "1" instead of "0"
 *
 * We consider users use 1-indexed and a-indexed quick numbering.
 * So we don't consider theses edge cases as real issues.
 * @param label - The deleted label
 * @returns The previous possible custom label.
 */
export function getPreviousCustomLabel(label: string) {
  const parsedLabel = parseLabel(label);
  if (!parsedLabel) return;

  return serializeParsedLabel(previousParsedCustomLabel(parsedLabel));
}

/**
 * Return an iterable of the custom labels of the molecule.
 * It removes the `]` special characters from the labels.
 * @param molecule - The molecule to get the custom labels from.
 * @yields {string} - The custom labels of the molecules without the `]` special characters.
 * @returns An iterable of the custom labels of the molecule.
 */
export function* moleculeCustomLabels(molecule: Molecule) {
  for (let i = 0; i < molecule.getAllAtoms(); i++) {
    const rawLabel = molecule.getAtomCustomLabel(i);
    if (!rawLabel) continue;

    const label = rawLabel.replaceAll(']', '');
    if (!label) continue;

    yield label;
  }
}

export const internals = {
  parseLabel,
  nextParsedCustomLabel,
  labelsHasParsedCustomLabel,
  serializeParsedLabel,
};
