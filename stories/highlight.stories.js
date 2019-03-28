import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { array, color, number } from '@storybook/addon-knobs';

import { MolfileSvgRenderer } from '../src/index';

import { molfileV2000 } from './data';

storiesOf('Atom highlighting', module)
  .add('Fixed highlight', () => (
    <MolfileSvgRenderer
      molfile={molfileV2000}
      highlight={array('Highlight ids', ['1', '5'])}
      highlightColor={color('Highlight color', 'yellow')}
      highlightOpacity={number('Highlight opacity', 0.5)}
    />
  ))
  .add('Highlight hovered atom', () => <HighlightHover />);

function HighlightHover() {
  const [current, setCurrent] = useState(null);
  return (
    <MolfileSvgRenderer
      molfile={molfileV2000}
      highlight={current && [current]}
      highlightColor={color('Highlight color', 'red')}
      highlightOpacity={number('Highlight opacity', 0.5)}
      onAtomEnter={setCurrent}
      onAtomLeave={() => setCurrent(null)}
    />
  );
}
