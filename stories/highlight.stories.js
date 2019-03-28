import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { array, color, number } from '@storybook/addon-knobs';

import { MolfileSvgRenderer } from '../src/index';

import { molfileV2000 } from './data';

storiesOf('Highlighting', module)
  .add('Fixed highlight', () => (
    <MolfileSvgRenderer
      molfile={molfileV2000}
      atomHighlight={array('Atom highlight ids', ['1', '5'])}
      atomHighlightColor={color('Atom highlight color', 'yellow')}
      atomHighlightOpacity={number('Atom highlight opacity', 0.5)}
      bondHighlight={array('Bond highlight ids', ['14-19'])}
      bondHighlightColor={color('Bond highlight color', 'red')}
      bondHighlightOpacity={number('Bond highlight opacity', 0.5)}
    />
  ))
  .add('Highlight hovered element', () => <HighlightHover />);

function HighlightHover() {
  const [currentAtom, setCurrentAtom] = useState(null);
  const [currentBond, setCurrentBond] = useState(null);
  return (
    <MolfileSvgRenderer
      molfile={molfileV2000}
      atomHighlight={currentAtom && [currentAtom]}
      atomHighlightColor={color('Highlight color', 'red')}
      atomHighlightOpacity={number('Highlight opacity', 0.5)}
      onAtomEnter={setCurrentAtom}
      onAtomLeave={() => setCurrentAtom(null)}
      bondHighlight={currentBond && [currentBond]}
      bondHighlightColor={color('Highlight color', 'blue')}
      bondHighlightOpacity={number('Highlight opacity', 0.5)}
      onBondEnter={setCurrentBond}
      onBondLeave={() => setCurrentBond(null)}
    />
  );
}
