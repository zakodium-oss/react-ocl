import type { Meta, StoryObj } from '@storybook/react-vite';

import { MolfileSvgRenderer } from '../../src/index.ts';
import { molfileV2000, molfileV3000 } from '../data.ts';

import { commonArgTypes, commonArgs } from './common-args.ts';

export default {
  title: 'SVG renderers/MolfileSvgRenderer',
  component: MolfileSvgRenderer,
  args: {
    ...commonArgs,
  },
  argTypes: {
    ...commonArgTypes,
  },
} satisfies Meta<typeof MolfileSvgRenderer>;

type Story = StoryObj<typeof MolfileSvgRenderer>;

export const V2000: Story = {
  name: 'Molfile (V2000)',
  args: {
    molfile: molfileV2000,
  },
};

export const V3000: Story = {
  name: 'Molfile (V3000)',
  args: {
    molfile: molfileV3000,
  },
};
