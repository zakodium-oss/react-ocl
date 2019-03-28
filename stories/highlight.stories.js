import React from 'react';
import { storiesOf } from '@storybook/react';
import { array, color, number } from '@storybook/addon-knobs';

import { MolfileSvgRenderer } from '../src/index';
import BaseMolfileSvgRenderer from '../src/components/MolfileSvgRenderer';
import SvgRenderer from '../src/components/SvgRenderer';

import { molfileV2000 } from './data';

storiesOf('Atom highlighting', module).add(
  'Highlight',
  () => (
    <MolfileSvgRenderer
      molfile={molfileV2000}
      highlight={array('Highlight ids', ['1', '5'])}
      highlightColor={color('Highlight color', 'yellow')}
      highlightOpacity={number('Highlight opacity', 0.5)}
    />
  ),
  {
    info: {
      source: false,
      propTables: [BaseMolfileSvgRenderer, SvgRenderer],
      propTablesExclude: [MolfileSvgRenderer]
    }
  }
);
