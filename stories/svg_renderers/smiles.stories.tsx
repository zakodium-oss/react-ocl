import type { Meta, StoryObj } from '@storybook/react-vite';

import type { ErrorComponentProps } from '../../src/index.ts';
import { SmilesSvgRenderer } from '../../src/index.ts';

import { commonArgTypes, commonArgs } from './common-args.ts';

export default {
  title: 'SVG renderers/SmilesSvgRenderer',
  component: SmilesSvgRenderer,
  args: {
    smiles: 'COCCOc1ccccc1',
    ...commonArgs,
  },
  argTypes: {
    ...commonArgTypes,
  },
  parameters: {
    docs: {
      description: {
        component:
          'The SMILES SVG renderer will always invent the coordinates.',
      },
    },
  },
} satisfies Meta<typeof SmilesSvgRenderer>;

type Story = StoryObj<typeof SmilesSvgRenderer>;

export const Smiles: Story = {
  name: 'SMILES',
};

function ErrorComponent(props: ErrorComponentProps) {
  return (
    <div style={{ color: 'red' }}>
      <div>{props.value}</div>
      <div>{props.error.message}</div>
    </div>
  );
}

export const CustomError: Story = {
  name: 'With custom error rendering',
  args: {
    smiles: 'COVVVCC',
    ErrorComponent,
  },
};

export const DefaultError: Story = {
  name: 'With default error rendering',
  args: {
    smiles: 'COVVVCC',
  },
};
