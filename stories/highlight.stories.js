import { useState } from 'react';

import { MolfileSvgRenderer } from '../src/index';

import { molfileV2000 } from './data';

export default {
  title: 'Highlighting',
  args: {
    molfile: molfileV2000,
  },
  argTypes: {
    atomHighlightColor: {
      name: 'Atom highlight color',
      defaultValue: 'yellow',
      control: 'color',
    },
    atomHighlightOpacity: {
      name: 'Atom highlight opacity',
      defaultValue: 0.5,
      control: 'number',
    },
    bondHighlightColor: {
      name: 'Bond highlight color',
      defaultValue: 'red',
      control: 'color',
    },
    bondHighlightOpacity: {
      name: 'Bond highlight opacity',
      defaultValue: 0.5,
      control: 'number',
    },
  },
};

export function Fixed(args) {
  return <MolfileSvgRenderer {...args} />;
}
Fixed.storyName = 'Fixed highlight';
Fixed.argTypes = {
  atomHighlight: {
    name: 'Atom highlight ids',
    defaultValue: [1, 5],
    control: 'object',
  },
  bondHighlight: {
    name: 'Bond highlight ids',
    defaultValue: [6],
    control: 'object',
  },
};

export function Hover(args) {
  const [currentAtom, setCurrentAtom] = useState(null);
  const [currentBond, setCurrentBond] = useState(null);
  return (
    <MolfileSvgRenderer
      {...args}
      atomHighlight={currentAtom && [currentAtom]}
      onAtomEnter={setCurrentAtom}
      onAtomLeave={() => setCurrentAtom(null)}
      bondHighlight={currentBond && [currentBond]}
      onBondEnter={setCurrentBond}
      onBondLeave={() => setCurrentBond(null)}
    />
  );
}
Hover.storyName = 'Highlight hovered element';
Hover.args = {};
