import { describe, expect, it, test } from 'vitest';

import type { ParsedCustomLabel } from '../quick_numbering.js';
import {
  getNextCustomLabel,
  getPreviousCustomLabel,
  internals,
  splitCustomLabels,
} from '../quick_numbering.js';

describe('internal parseLabel', () => {
  describe('numberOnly', () => {
    it('should parse empty', () => {
      expect(internals.parseLabel('')).toBeUndefined();
    });

    it.each('0,1,2,5,10,15'.split(','))('should parse %s', (label) => {
      expect(internals.parseLabel(label)).toStrictEqual({
        category: 'numberOnly',
        value: Number.parseInt(label, 10),
      });
    });

    // negative number unsupported
    it.each('-1,-2,-5,-10,-15'.split(','))('should not parse %s', (label) => {
      expect(internals.parseLabel(label)).toBeUndefined();
    });
  });

  describe('numberPrime', () => {
    it.each([
      ["0'", { value: 0, prime: 1 }],
      ["1'", { value: 1, prime: 1 }],
      ["2'", { value: 2, prime: 1 }],
      ["1''", { value: 1, prime: 2 }],
      ["5''", { value: 5, prime: 2 }],
      ["25''", { value: 25, prime: 2 }],
      ["11'''''", { value: 11, prime: 5 }],
    ])('should parse %s', (label, expected) => {
      expect(internals.parseLabel(label)).toStrictEqual({
        ...expected,
        category: 'numberPrime',
      });
    });

    // prime before -> undefined
    it.each("'0,'1,'2,''1,''5,''25,'''''11".split(','))(
      'should parse %s to undefined',
      (label) => {
        expect(internals.parseLabel(label)).toBeUndefined();
      },
    );
  });

  describe('numberLowerLetter', () => {
    it.each([
      ['0a', { value: 0, letter: 'a' }],
      ['1a', { value: 1, letter: 'a' }],
      ['5a', { value: 5, letter: 'a' }],
      ['11a', { value: 11, letter: 'a' }],
      ['1b', { value: 1, letter: 'b' }],
      ['5b', { value: 5, letter: 'b' }],
      ['11b', { value: 11, letter: 'b' }],
      ['1z', { value: 1, letter: 'z' }],
      ['5z', { value: 5, letter: 'z' }],
      ['11z', { value: 11, letter: 'z' }],
    ])('should parse %s', (label, expected) => {
      expect(internals.parseLabel(label)).toStrictEqual({
        ...expected,
        category: 'numberLowerLetter',
      });
    });

    // don't support multiple letters pattern
    it.each('0aa,1ba,5ab,11zz'.split(','))(
      'should parse %s to undefined',
      (label) => {
        expect(internals.parseLabel(label)).toBeUndefined();
      },
    );
  });

  describe('lowerLetterNumber', () => {
    it.each([
      ['a0', { value: 0, letter: 'a' }],
      ['a1', { value: 1, letter: 'a' }],
      ['a5', { value: 5, letter: 'a' }],
      ['a11', { value: 11, letter: 'a' }],
      ['b1', { value: 1, letter: 'b' }],
      ['b5', { value: 5, letter: 'b' }],
      ['b11', { value: 11, letter: 'b' }],
      ['z1', { value: 1, letter: 'z' }],
      ['z5', { value: 5, letter: 'z' }],
      ['z11', { value: 11, letter: 'z' }],
    ])('should parse %s', (label, expected) => {
      expect(internals.parseLabel(label)).toStrictEqual({
        ...expected,
        category: 'lowerLetterNumber',
      });
    });

    // don't support multiple letters pattern
    it.each('aa0,ba1,ab5,zz11'.split(','))(
      'should parse %s to undefined',
      (label) => {
        expect(internals.parseLabel(label)).toBeUndefined();
      },
    );
  });

  describe('oneLowerLetter', () => {
    it.each('a,b,c,z'.split(','))('should parse %s', (label) => {
      expect(internals.parseLabel(label)).toStrictEqual({
        category: 'oneLowerLetter',
        letter: label,
      });
    });

    // don't support multiple letters pattern
    it.each('aa,ba,ab,zz'.split(','))(
      'should parse %s to undefined',
      (label) => {
        expect(internals.parseLabel(label)).toBeUndefined();
      },
    );
  });
});

describe('internal serializeParsedLabel', () => {
  describe('numberOnly', () => {
    it.each('0,1,2,5,10,15'.split(','))(
      'should serialize {category: "numberOnly", value: %d} to $0',
      (value) => {
        expect(
          internals.serializeParsedLabel({
            category: 'numberOnly',
            value: Number(value),
          }),
        ).toBe(value);
      },
    );
  });

  describe('numberPrime', () => {
    it.each([
      [{ value: 0, prime: 1 }, "0'"],
      [{ value: 1, prime: 1 }, "1'"],
      [{ value: 2, prime: 1 }, "2'"],
      [{ value: 1, prime: 2 }, "1''"],
      [{ value: 5, prime: 2 }, "5''"],
      [{ value: 25, prime: 2 }, "25''"],
      [{ value: 11, prime: 5 }, "11'''''"],
    ])('should serialize %o to "%s"', (parsedLabel, expected) => {
      expect(
        internals.serializeParsedLabel({
          category: 'numberPrime',
          ...parsedLabel,
        }),
      ).toBe(expected);
    });
  });

  describe('numberLowerLetter', () => {
    it.each([
      [{ value: 0, letter: 'a' }, '0a'],
      [{ value: 1, letter: 'a' }, '1a'],
      [{ value: 5, letter: 'a' }, '5a'],
      [{ value: 11, letter: 'a' }, '11a'],
      [{ value: 1, letter: 'b' }, '1b'],
      [{ value: 5, letter: 'b' }, '5b'],
      [{ value: 11, letter: 'b' }, '11b'],
      [{ value: 1, letter: 'z' }, '1z'],
      [{ value: 5, letter: 'z' }, '5z'],
      [{ value: 11, letter: 'z' }, '11z'],
    ])('should serialize %o to $1', (label, expected) => {
      expect(
        internals.serializeParsedLabel({
          ...label,
          category: 'numberLowerLetter',
        }),
      ).toBe(expected);
    });
  });

  describe('lowerLetterNumber', () => {
    it.each([
      [{ value: 0, letter: 'a' }, 'a0'],
      [{ value: 1, letter: 'a' }, 'a1'],
      [{ value: 5, letter: 'a' }, 'a5'],
      [{ value: 11, letter: 'a' }, 'a11'],
      [{ value: 1, letter: 'b' }, 'b1'],
      [{ value: 5, letter: 'b' }, 'b5'],
      [{ value: 11, letter: 'b' }, 'b11'],
      [{ value: 1, letter: 'z' }, 'z1'],
      [{ value: 5, letter: 'z' }, 'z5'],
      [{ value: 11, letter: 'z' }, 'z11'],
    ])('should parse %o to $1', (label, expected) => {
      expect(
        internals.serializeParsedLabel({
          ...label,
          category: 'lowerLetterNumber',
        }),
      ).toBe(expected);
    });
  });

  describe('oneLowerLetter', () => {
    it.each('a,b,c,z'.split(','))(
      'should serialize {category: "oneLowerLetter", value: $0} to $0',
      (letter) => {
        expect(
          internals.serializeParsedLabel({
            category: 'oneLowerLetter',
            letter,
          }),
        ).toBe(letter);
      },
    );
  });
});

describe('internal nextParsedCustomLabel', () => {
  describe('numberOnly', () => {
    it.each([
      [1, 2],
      [2, 3],
      [3, 4],
      [5, 6],
      [9, 10],
      [99, 100],
    ])('next of %d should be %d', (current, expected) => {
      expect(
        internals.nextParsedCustomLabel({
          category: 'numberOnly',
          value: current,
        }),
      ).toStrictEqual({ category: 'numberOnly', value: expected });
    });
  });

  describe('numberPrime', () => {
    it.each([
      [
        { category: 'numberPrime', value: 0, prime: 1 },
        { category: 'numberPrime', value: 1, prime: 1 },
      ],
      [
        { category: 'numberPrime', value: 1, prime: 1 },
        { category: 'numberPrime', value: 2, prime: 1 },
      ],
      [
        { category: 'numberPrime', value: 2, prime: 1 },
        { category: 'numberPrime', value: 3, prime: 1 },
      ],
      [
        { category: 'numberPrime', value: 1, prime: 2 },
        { category: 'numberPrime', value: 2, prime: 2 },
      ],
      [
        { category: 'numberPrime', value: 5, prime: 2 },
        { category: 'numberPrime', value: 6, prime: 2 },
      ],
      [
        { category: 'numberPrime', value: 25, prime: 2 },
        { category: 'numberPrime', value: 26, prime: 2 },
      ],
      [
        { category: 'numberPrime', value: 11, prime: 5 },
        { category: 'numberPrime', value: 12, prime: 5 },
      ],
    ] satisfies Array<[ParsedCustomLabel, ParsedCustomLabel]>)(
      'next of %d should be %d',
      (current, expected) => {
        expect(internals.nextParsedCustomLabel(current)).toStrictEqual(
          expected,
        );
      },
    );
  });

  describe('numberLowerLetter', () => {
    it.each([
      [
        { category: 'numberLowerLetter', value: 0, letter: 'a' },
        { category: 'numberLowerLetter', value: 1, letter: 'a' },
      ],
      [
        { category: 'numberLowerLetter', value: 1, letter: 'a' },
        { category: 'numberLowerLetter', value: 2, letter: 'a' },
      ],
      [
        { category: 'numberLowerLetter', value: 5, letter: 'a' },
        { category: 'numberLowerLetter', value: 6, letter: 'a' },
      ],
      [
        { category: 'numberLowerLetter', value: 11, letter: 'a' },
        { category: 'numberLowerLetter', value: 12, letter: 'a' },
      ],
      [
        { category: 'numberLowerLetter', value: 1, letter: 'b' },
        { category: 'numberLowerLetter', value: 2, letter: 'b' },
      ],
      [
        { category: 'numberLowerLetter', value: 5, letter: 'b' },
        { category: 'numberLowerLetter', value: 6, letter: 'b' },
      ],
      [
        { category: 'numberLowerLetter', value: 11, letter: 'b' },
        { category: 'numberLowerLetter', value: 12, letter: 'b' },
      ],
      [
        { category: 'numberLowerLetter', value: 1, letter: 'z' },
        { category: 'numberLowerLetter', value: 2, letter: 'z' },
      ],
      [
        { category: 'numberLowerLetter', value: 5, letter: 'z' },
        { category: 'numberLowerLetter', value: 6, letter: 'z' },
      ],
      [
        { category: 'numberLowerLetter', value: 11, letter: 'z' },
        { category: 'numberLowerLetter', value: 12, letter: 'z' },
      ],
    ] satisfies Array<[ParsedCustomLabel, ParsedCustomLabel]>)(
      'next of %d should be %d',
      (current, expected) => {
        expect(internals.nextParsedCustomLabel(current)).toStrictEqual(
          expected,
        );
      },
    );
  });

  describe('lowerLetterNumber', () => {
    it.each([
      [
        { category: 'lowerLetterNumber', value: 0, letter: 'a' },
        { category: 'lowerLetterNumber', value: 1, letter: 'a' },
      ],
      [
        { category: 'lowerLetterNumber', value: 1, letter: 'a' },
        { category: 'lowerLetterNumber', value: 2, letter: 'a' },
      ],
      [
        { category: 'lowerLetterNumber', value: 5, letter: 'a' },
        { category: 'lowerLetterNumber', value: 6, letter: 'a' },
      ],
      [
        { category: 'lowerLetterNumber', value: 11, letter: 'a' },
        { category: 'lowerLetterNumber', value: 12, letter: 'a' },
      ],
      [
        { category: 'lowerLetterNumber', value: 1, letter: 'b' },
        { category: 'lowerLetterNumber', value: 2, letter: 'b' },
      ],
      [
        { category: 'lowerLetterNumber', value: 5, letter: 'b' },
        { category: 'lowerLetterNumber', value: 6, letter: 'b' },
      ],
      [
        { category: 'lowerLetterNumber', value: 11, letter: 'b' },
        { category: 'lowerLetterNumber', value: 12, letter: 'b' },
      ],
      [
        { category: 'lowerLetterNumber', value: 1, letter: 'z' },
        { category: 'lowerLetterNumber', value: 2, letter: 'z' },
      ],
      [
        { category: 'lowerLetterNumber', value: 5, letter: 'z' },
        { category: 'lowerLetterNumber', value: 6, letter: 'z' },
      ],
      [
        { category: 'lowerLetterNumber', value: 11, letter: 'z' },
        { category: 'lowerLetterNumber', value: 12, letter: 'z' },
      ],
    ] satisfies Array<[ParsedCustomLabel, ParsedCustomLabel]>)(
      'next of %d should be %d',
      (current, expected) => {
        expect(internals.nextParsedCustomLabel(current)).toStrictEqual(
          expected,
        );
      },
    );
  });

  describe('oneLowerLetter', () => {
    it.each([
      ['a', 'b'],
      ['b', 'c'],
      ['c', 'd'],
    ])('next of %s should be %s', (letter, expectedLetter) => {
      expect(
        internals.nextParsedCustomLabel({ category: 'oneLowerLetter', letter }),
      ).toStrictEqual({
        category: 'oneLowerLetter',
        letter: expectedLetter,
      });
    });

    it('next of z should be 1', () => {
      expect(
        internals.nextParsedCustomLabel({
          category: 'oneLowerLetter',
          letter: 'z',
        } satisfies ParsedCustomLabel),
      ).toStrictEqual({
        category: 'numberOnly',
        value: 1,
      } satisfies ParsedCustomLabel);
    });
  });
});

describe('internal labelsHasParsedCustomLabel', () => {
  const rawLabels = [
    '0,1,9,10,11,19,90,91,99,100,101,999'.split(','),
    "0',1',9'".split(','),
    "1'',5'',25''".split(','),
    "11''''',99'''''".split(','),
    '0a,1a,5a,11a,1b,5b,11b,1z,5z,11z'.split(','),
    'a0,a1,a5,a11,b1,b5,b11,z1,z5,z11'.split(','),
    'a,b,c,z'.split(','),

    // unsupported patterns
    '-1,-2,-5,-10,-15'.split(','), // negative numbers
    "'0,'1,'2,''1,''5,''25,'''''11".split(','), // prime before
    '0aa,1ba,5ab,11zz'.split(','), // multiple letters pattern
    'aa0,ba1,ab5,zz11'.split(','), // multiple letters pattern
    'aa,ba,ab,zz'.split(','), // multiple letters pattern
  ].flat();
  const labels = splitCustomLabels(rawLabels);

  describe('numberOnly', () => {
    it('should contains existing numbers', () => {
      expect(
        internals.labelsHasParsedCustomLabel(
          { category: 'numberOnly', value: 90 },
          labels,
        ),
      ).toBe(true);
    });

    it('should not contains not-existing numbers', () => {
      expect(
        internals.labelsHasParsedCustomLabel(
          { category: 'numberOnly', value: 205 },
          labels,
        ),
      ).toBe(false);
    });
  });

  describe('numberPrime', () => {
    it('should contains existing numbers with prime', () => {
      expect(
        internals.labelsHasParsedCustomLabel(
          { category: 'numberPrime', value: 9, prime: 1 },
          labels,
        ),
      ).toBe(true);
    });

    it('should not contains not-existing numbers with prime', () => {
      expect(
        internals.labelsHasParsedCustomLabel(
          { category: 'numberPrime', value: 10, prime: 1 },
          labels,
        ),
      ).toBe(false);
    });
  });

  describe('numberLowerLetter', () => {
    it('should contains existing number letter', () => {
      expect(
        internals.labelsHasParsedCustomLabel(
          { category: 'numberLowerLetter', value: 11, letter: 'a' },
          labels,
        ),
      ).toBe(true);
    });

    it('should not contains not-existing number letter', () => {
      expect(
        internals.labelsHasParsedCustomLabel(
          { category: 'numberLowerLetter', value: 2, letter: 'b' },
          labels,
        ),
      ).toBe(false);
    });
  });

  describe('lowerLetterNumber', () => {
    it('should contains existing letter number', () => {
      expect(
        internals.labelsHasParsedCustomLabel(
          { category: 'numberLowerLetter', value: 11, letter: 'a' },
          labels,
        ),
      ).toBe(true);
    });

    it('should not contains not-existing letter number', () => {
      expect(
        internals.labelsHasParsedCustomLabel(
          { category: 'numberLowerLetter', value: 2, letter: 'b' },
          labels,
        ),
      ).toBe(false);
    });
  });

  describe('oneLowerLetter', () => {
    it('should contains existing letter', () => {
      expect(
        internals.labelsHasParsedCustomLabel(
          { category: 'oneLowerLetter', letter: 'a' },
          labels,
        ),
      ).toBe(true);
    });

    it('should not contains not-existing letter', () => {
      expect(
        internals.labelsHasParsedCustomLabel(
          { category: 'oneLowerLetter', letter: 'g' },
          labels,
        ),
      ).toBe(false);
    });
  });
});

test('splitCustomLabels', () => {
  const labels =
    `3,2,1,10,3',2',1',10',3'',2'',10'',3b,2b,1b,10b,3a,2a,1a,10a,b3,b2,b1,b10,a3,a2,a1,a10,z,b,a,aa,zz,10ad`.split(
      ',',
    );
  const groupedLabels = splitCustomLabels(labels);

  expect(groupedLabels).toStrictEqual({
    numberOnly: new Set([1, 2, 3, 10]),
    numberPrime: new Map([
      [1, new Set([1, 2, 3, 10])],
      [2, new Set([2, 3, 10])],
    ]),
    numberLowerLetter: new Map([
      ['b', new Set([1, 2, 3, 10])],
      ['a', new Set([1, 2, 3, 10])],
    ]),
    lowerLetterNumber: new Map([
      ['b', new Set([1, 2, 3, 10])],
      ['a', new Set([1, 2, 3, 10])],
    ]),
    oneLowerLetter: new Set(['a', 'b', 'z']),
  });
});

test('getNextCustomLabel', () => {
  const labels =
    `3,2,1,10,3',2',1',10',3'',2'',10'',3b,2b,1b,10b,3a,2a,1a,10a,b3,b2,b1,b10,a3,a2,a1,a10,z,b,a,aa,zz,10ad`.split(
      ',',
    );
  const groupedLabels = splitCustomLabels(labels);

  // fresh view, last input fallback to '' or '0'
  // 1, 2, 3 slots are not available, 4 is the first available slot in numberOnly set.
  expect(getNextCustomLabel('', groupedLabels)).toBe('4');
  expect(getNextCustomLabel('0', groupedLabels)).toBe('4');

  expect(getNextCustomLabel('5', groupedLabels)).toBe('6');

  // the next of 9 should be 10, but it is not available, the first available in sequence is 11.
  expect(getNextCustomLabel('9', groupedLabels)).toBe('11');

  // the numberOnly sequence is virtually infinite
  expect(getNextCustomLabel('99999', groupedLabels)).toBe('100000');

  // the last input was in prime sequence
  // 2' and 3' are not available, 4' is the first available slot in numberPrime 1 set.
  expect(getNextCustomLabel("1'", groupedLabels)).toBe("4'");
  // 10' is taken so the next available is 11'.
  expect(getNextCustomLabel("9'", groupedLabels)).toBe("11'");

  // the last input was in prime prime sequence
  // 2'' and 3'' are not available, 4'' is the first available slot in numberPrime 2 set.
  expect(getNextCustomLabel("1''", groupedLabels)).toBe("4''");
  expect(getNextCustomLabel("10''", groupedLabels)).toBe("11''");

  // the last input was in numberLowerLetter a sequence
  expect(getNextCustomLabel('1a', groupedLabels)).toBe('4a');
  expect(getNextCustomLabel('4a', groupedLabels)).toBe('5a');
  expect(getNextCustomLabel('1b', groupedLabels)).toBe('4b');
  expect(getNextCustomLabel('4b', groupedLabels)).toBe('5b');

  // the last input was in lowerLetterNumber a sequence
  expect(getNextCustomLabel('a1', groupedLabels)).toBe('a4');
  expect(getNextCustomLabel('a4', groupedLabels)).toBe('a5');
  expect(getNextCustomLabel('b1', groupedLabels)).toBe('b4');
  expect(getNextCustomLabel('b4', groupedLabels)).toBe('b5');

  // the last input was in oneLowerLetter sequence
  // b is taken so the next available is c.
  expect(getNextCustomLabel('a', groupedLabels)).toBe('c');
  // next z is 1 but 1, 2 and 3 are taken, so the next available is 4.
  expect(getNextCustomLabel('z', groupedLabels)).toBe('4');
});

test('getPreviousCustomLabel', () => {
  // normal cases
  expect(getPreviousCustomLabel('2')).toBe('1');
  expect(getPreviousCustomLabel('10')).toBe('9');
  expect(getPreviousCustomLabel('1000')).toBe('999');

  expect(getPreviousCustomLabel("2'")).toBe("1'");
  expect(getPreviousCustomLabel("10'")).toBe("9'");

  expect(getPreviousCustomLabel("2''")).toBe("1''");
  expect(getPreviousCustomLabel("10''")).toBe("9''");

  expect(getPreviousCustomLabel('2a')).toBe('1a');
  expect(getPreviousCustomLabel('10a')).toBe('9a');
  expect(getPreviousCustomLabel('2b')).toBe('1b');
  expect(getPreviousCustomLabel('10b')).toBe('9b');

  expect(getPreviousCustomLabel('b')).toBe('a');
  expect(getPreviousCustomLabel('z')).toBe('y');

  // 1-indexed / a-indexed
  expect(getPreviousCustomLabel('1')).toBe('0');
  expect(getPreviousCustomLabel("1'")).toBe("0'");
  expect(getPreviousCustomLabel("1''")).toBe("0''");
  expect(getPreviousCustomLabel('1a')).toBe('0a');
  expect(getPreviousCustomLabel('1b')).toBe('0b');
  expect(getPreviousCustomLabel('a1')).toBe('a0');
  expect(getPreviousCustomLabel('b1')).toBe('b0');
  expect(getPreviousCustomLabel('a')).toBe('`');

  // 0-indexed / `-indexed edge cases
  expect(getPreviousCustomLabel('0')).toBe('0');
  expect(getPreviousCustomLabel("0'")).toBe("0'");
  expect(getPreviousCustomLabel("0''")).toBe("0''");
  expect(getPreviousCustomLabel('0a')).toBe('0a');
  expect(getPreviousCustomLabel('0b')).toBe('0b');
  expect(getPreviousCustomLabel('a0')).toBe('a0');
  expect(getPreviousCustomLabel('b0')).toBe('b0');
  expect(getPreviousCustomLabel('`')).toBe('`');
});
