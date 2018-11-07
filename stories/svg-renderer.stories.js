import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import OCL from 'openchemlib/full';

import { SvgRenderer } from '../src';

storiesOf('SvgRenderer', module).add('From SMILES', () => (
  <SvgRenderer OCL={OCL} smiles={text('SMILES', 'COCCOc1ccccc1')} />
));
