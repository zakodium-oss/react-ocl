import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import { SvgRenderer } from '../minimal';

storiesOf('SvgRenderer', module).add('From SMILES', () => (
  <SvgRenderer smiles={text('SMILES', 'COCCOc1ccccc1')} />
));
