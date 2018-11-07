import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import { SmilesSvgRenderer } from '../minimal';

storiesOf('SvgRenderer', module).add('From SMILES', () => (
  <SmilesSvgRenderer smiles={text('SMILES', 'COCCOc1ccccc1')} />
));
