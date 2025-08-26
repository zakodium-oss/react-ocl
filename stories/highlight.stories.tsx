import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { SvgRenderer } from '../src/index.ts';

import { molecule } from './data.ts';

export default {
  title: 'Highlighting',
  component: SvgRenderer,
  // We cannot pass a Molecule as arg because it is not serializable.
  render: (args) => <SvgRenderer {...args} molecule={molecule} />,
  args: {
    atomHighlightColor: 'yellow',
    atomHighlightOpacity: 0.5,
    bondHighlightColor: 'red',
    bondHighlightOpacity: 0.5,
  },
  argTypes: {
    molecule: { control: false },
    atomHighlightColor: {
      name: 'Atom highlight color',
      control: 'color',
    },
    atomHighlightOpacity: {
      name: 'Atom highlight opacity',
      control: 'number',
    },
    bondHighlightColor: {
      name: 'Bond highlight color',
      control: 'color',
    },
    bondHighlightOpacity: {
      name: 'Bond highlight opacity',
      control: 'number',
    },
  },
} satisfies Meta<typeof SvgRenderer>;

type Story = StoryObj<typeof SvgRenderer>;

export const Fixed: Story = {
  name: 'Fixed highlight',
  args: {
    atomHighlight: [1, 5],
    bondHighlight: [6],
  },
  argTypes: {
    atomHighlight: {
      name: 'Atom highlight ids',
      control: 'object',
    },
    bondHighlight: {
      name: 'Bond highlight ids',
      control: 'object',
    },
  },
};

export const Hover: Story = {
  name: 'Highlight hovered element',
  render(args) {
    const [currentAtom, setCurrentAtom] = useState<number>();
    const [currentBond, setCurrentBond] = useState<number>();
    return (
      <SvgRenderer
        {...args}
        molecule={molecule}
        atomHighlight={currentAtom ? [currentAtom] : undefined}
        onAtomEnter={setCurrentAtom}
        onAtomLeave={() => setCurrentAtom(undefined)}
        bondHighlight={currentBond ? [currentBond] : undefined}
        onBondEnter={setCurrentBond}
        onBondLeave={() => setCurrentBond(undefined)}
      />
    );
  },
};
