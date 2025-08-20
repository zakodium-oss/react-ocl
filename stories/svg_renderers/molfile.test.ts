import { composeStories } from '@storybook/react-vite';
import { expect, test } from 'vitest';

import * as stories from './molfile.stories.tsx';

const { V2000 } = composeStories(stories);

test('Molecule renders molfile with default id', async () => {
  await V2000.run();

  expect(document.body.firstChild).toMatchSnapshot();
});
