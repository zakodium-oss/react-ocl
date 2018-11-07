import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import {
  SmilesSvgRenderer,
  MolfileSvgRenderer,
  IdcodeSvgRenderer
} from '../minimal';

import { idcode, molfileV2000, molfileV3000 } from './data';

const molfileText =
  'The same MolfileSvgRenderer can be used to render both V2000 and V3000 molfile formats.';

storiesOf('SvgRenderer', module)
  .add(
    'From SMILES',
    () => <SmilesSvgRenderer smiles={text('SMILES', 'COCCOc1ccccc1')} />,
    {
      info: {
        text: 'The SMILES SVG renderer will always invent the coordinates.'
      }
    }
  )
  .add(
    'From molfile V2000',
    () => (
      <MolfileSvgRenderer
        molfile={text('molfile', molfileV2000)}
        width={300}
        height={200}
      />
    ),
    {
      info: {
        text: molfileText
      }
    }
  )
  .add(
    'From molfile V3000',
    () => (
      <MolfileSvgRenderer
        molfile={text('molfile', molfileV3000)}
        width={300}
        height={200}
      />
    ),
    {
      info: {
        text: molfileText
      }
    }
  )
  .add('From ID code', () => (
    <IdcodeSvgRenderer idcode={idcode.idCode} width={300} height={200} />
  ))
  .add('From ID code and coordinates', () => (
    <IdcodeSvgRenderer
      idcode={idcode.idCode}
      coordinates={idcode.coordinates}
      width={300}
      height={200}
    />
  ))
  .add('From ID code and coordinates as object', () => (
    <IdcodeSvgRenderer
      idcode={{ id: idcode.idCode, coordinates: idcode.coordinates }}
      width={300}
      height={200}
    />
  ));
