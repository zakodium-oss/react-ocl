import { useState } from 'react';

import { MolfileSvgRenderer } from '../src/index.js';

import { molfileV2000 } from './data.js';

export default {
  title: 'Highlighting',
  args: {
    molfile: molfileV2000,
    atomHighlightColor: 'yellow',
    atomHighlightOpacity: 0.5,
    bondHighlightColor: 'red',
    bondHighlightOpacity: 0.5,
  },
  argTypes: {
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
};

export function Fixed(args: any) {
  return <MolfileSvgRenderer {...args} />;
}
Fixed.storyName = 'Fixed highlight';
Fixed.args = {
  atomHighlight: [1, 5],
  bondHighlight: [6],
};
Fixed.argTypes = {
  atomHighlight: {
    name: 'Atom highlight ids',
    control: 'object',
  },
  bondHighlight: {
    name: 'Bond highlight ids',
    control: 'object',
  },
};

export function Hover(args: any) {
  const [currentAtom, setCurrentAtom] = useState(null);
  const [currentBond, setCurrentBond] = useState(null);
  return (
    <MolfileSvgRenderer
      {...args}
      atomHighlight={currentAtom ? [currentAtom] : null}
      onAtomEnter={setCurrentAtom}
      onAtomLeave={() => setCurrentAtom(null)}
      bondHighlight={currentBond ? [currentBond] : null}
      onBondEnter={setCurrentBond}
      onBondLeave={() => setCurrentBond(null)}
    />
  );
}
Hover.storyName = 'Highlight hovered element';
Hover.args = {};
