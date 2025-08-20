import type { Meta, StoryObj } from '@storybook/react-vite';

import { IdcodeSvgRenderer } from '../../src/index.ts';
import { idcode } from '../data.ts';

import { commonArgTypes, commonArgs } from './common-args.ts';

export default {
  title: 'SVG renderers/IdcodeSvgRenderer',
  component: IdcodeSvgRenderer,
  args: {
    ...commonArgs,
  },
  argTypes: {
    ...commonArgTypes,
  },
} satisfies Meta<typeof IdcodeSvgRenderer>;

type Story = StoryObj<typeof IdcodeSvgRenderer>;

export const Idcode: Story = {
  name: 'ID code',
  args: {
    idcode: idcode.idCode,
  },
};

export const WithCoordinates: Story = {
  name: 'ID code (with coordinates)',
  args: {
    idcode: idcode.idCode,
    coordinates: idcode.coordinates,
  },
};
