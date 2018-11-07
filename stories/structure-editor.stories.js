import React from 'react';
import { storiesOf } from '@storybook/react';
import OCL from 'openchemlib/full';

import { StructureEditor } from '../src';

storiesOf('StructureEditor', module).add('From SMILES', () => (
  <StructureEditor OCL={OCL} oclid="gGQ`ABeKuT@@" />
));
