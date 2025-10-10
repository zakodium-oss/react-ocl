import type { Molecule } from 'openchemlib';

/**
 * Get cleaned custom labels from a molecule sorted by priority.
 * Remove special `]` characters from the label.
 * @param molecule - The molecule to get labels from.
 * @returns An array of labels sorted by priority.
 */
export function getSortedCustomLabels(molecule: Molecule) {
  const labels: string[] = [];
  for (let atomId = 0; atomId < molecule.getAllAtoms(); atomId++) {
    let label = molecule.getAtomCustomLabel(atomId) || '';
    label = label.replaceAll(']', '');
    if (!label) continue;
    if (/[a-zA-Z]/.test(label) && !/\d/.test(label) && label.length > 1) {
      // ignore patterns known to not be incrementable
      continue;
    }

    labels.push(label);
  }
  labels.sort(sortLabelByPriority);

  return labels;
}

/**
 * Sort labels by priority.
 * @param a - The first label to compare.
 * @param b - The second label to compare.
 * @returns -1 if a is less than b, 0 if they are equal, and 1 if a is greater than b.
 */
export function sortLabelByPriority(a: string, b: string) {
  // 1st priority: digit only
  const aDigitOnly = /\^d+$/.test(a);
  const bDigitOnly = /\^d+$/.test(b);
  if (aDigitOnly && !bDigitOnly) return -1;
  if (bDigitOnly && !aDigitOnly) return 1;

  // 2nd priority: start with a digit
  const aStartDigit = /\^\d/.test(a);
  const bStartDigit = /\^\d/.test(a);
  if (aStartDigit && !bStartDigit) return -1;
  if (bStartDigit && !aStartDigit) return 1;

  // 3rd priority: have a digit
  const aDigit = /\d/.test(a);
  const bDigit = /\d/.test(b);
  if (aDigit && !bDigit) return -1;
  if (bDigit && !aDigit) return 1;

  // 4th priority: no letter
  const aLetter = /[a-zA-Z]/.test(a);
  const bLetter = /[a-zA-Z]/.test(b);
  if (!aLetter && bLetter) return -1;
  if (!bLetter && aLetter) return 1;

  // 5th priority: shorter label
  if (a.length < b.length) return -1;
  if (a.length > b.length) return 1;

  // fallback to lexical order
  const lc = a.localeCompare(b);
  return lc / Math.abs(lc); // normalize to -1, 0, 1
}

export type IncrementLabelMode =
  | 'start'
  | 'increment_number'
  | 'increment_letter';
/**
 * parse the label to determine the mode to increment the number
 * @param label - The label to parse.
 * @returns The mode to increment the number.
 */
export function getLabelMode(label: string | undefined): IncrementLabelMode {
  if (!label) return 'start';
  if (/\d/.test(label)) return 'increment_number';
  if (/^[a-zA-Z]$/.test(label)) return 'increment_letter';

  return 'start';
}

/**
 * increment the label based on the mode
 * @param label - The label to increment.
 * @param mode - The mode to increment the label.
 * @returns The incremented label.
 */
export function incrementLabel(
  label: string | undefined,
  mode: IncrementLabelMode,
): string | undefined {
  switch (mode) {
    case 'start':
      return '1';
    case 'increment_number': {
      if (!label) throw new Error('lastLabel falsy, logic error');

      return label.replace(/\d+/, (match) =>
        String(Number.parseInt(match, 10) + 1),
      );
    }
    case 'increment_letter': {
      if (!label) throw new Error('lastLabel falsy, logic error');
      let codePoint = label.codePointAt(0);
      if (!codePoint) throw new Error('codePoint falsy, logic error');
      /* eslint-disable @typescript-eslint/no-non-null-assertion */
      const Z = 'Z'.codePointAt(0)!;
      const a = 'a'.codePointAt(0)!;
      const z = 'z'.codePointAt(0)!;
      /* eslint-enable @typescript-eslint/no-non-null-assertion */
      if (codePoint === Z) codePoint = a - 1; // switch to the lowercase
      if (codePoint === z) return; // we are at the last letter, do nothing

      return String.fromCodePoint(codePoint + 1);
    }
    default:
  }

  return undefined;
}
