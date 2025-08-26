import { composeStories } from '@storybook/react-vite';
import { expect, test } from 'vitest';

import * as stories from './smiles.stories.tsx';

const { Smiles, DefaultError, CustomError } = composeStories(stories);

test('Molecule renders SMILES with custom id', async () => {
  await Smiles.run({ args: { ...Smiles.args, id: 'mol1' } });

  expect(document.body.firstChild).toMatchSnapshot();
});

test('Syntax error in SMILES - default renderer', async () => {
  await DefaultError.run();

  expect(document.body.firstChild).toMatchSnapshot();
});

test('Syntax error in SMILES - custom renderer', async () => {
  await CustomError.run();

  expect(document.body.firstChild).toMatchSnapshot();
});
