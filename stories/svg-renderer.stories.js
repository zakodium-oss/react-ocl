import { text, number, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import BaseIdcodeSvgRenderer from '../src/components/IdcodeSvgRenderer';
import BaseMolfileSvgRenderer from '../src/components/MolfileSvgRenderer';
import BaseSmilesSvgRenderer from '../src/components/SmilesSvgRenderer';
import SvgRenderer from '../src/components/SvgRenderer';
import {
  SmilesSvgRenderer,
  MolfileSvgRenderer,
  IdcodeSvgRenderer,
} from '../src/index';

import { idcode, molfileV2000, molfileV3000 } from './data';

const molfileText =
  'The same MolfileSvgRenderer can be used to render both V2000 and V3000 molfile formats.';

const knobs = {
  width: () => number('width', 300),
  height: () => number('height', 200),
  id: () => text('id'),
  factorTextSize: () => number('factorTextSize'),
  fontWeight: () => text('fontWeight'),
  strokeWidth: () => text('strokeWidth'),
  inflateToMaxAVBL: () => boolean('inflateToMaxAVBL', false),
  inflateToHighResAVBL: () => boolean('inflateToHighResAVBL', false),
  chiralTextBelowMolecule: () => boolean('chiralTextBelowMolecule', false),
  chiralTextAboveMolecule: () => boolean('chiralTextAboveMolecule', false),
  chiralTextOnFrameTop: () => boolean('chiralTextOnFrameTop', false),
  chiralTextOnFrameBottom: () => boolean('chiralTextOnFrameBottom', false),
  noTabus: () => boolean('noTabus', false),
  showAtomNumber: () => boolean('showAtomNumber', false),
  showBondNumber: () => boolean('showBondNumber', false),
  highlightQueryFeatures: () => boolean('highlightQueryFeatures', false),
  showMapping: () => boolean('showMapping', false),
  suppressChiralText: () => boolean('suppressChiralText', true),
  suppressCIPParity: () => boolean('suppressCIPParity', true),
  suppressESR: () => boolean('suppressESR', true),
  showSymmetrySimple: () => boolean('showSymmetrySimple', false),
  showSymmetryDiastereotopic: () =>
    boolean('showSymmetryDiastereotopic', false),
  showSymmetryEnantiotopic: () => boolean('showSymmetryEnantiotopic', false),
  noImplicitAtomLabelColors: () => boolean('noImplicitAtomLabelColors', false),
  noStereoProblem: () => boolean('noStereoProblem', true),
};

function getKnobs() {
  const result = {};
  for (const knob in knobs) {
    result[knob] = knobs[knob]();
  }
  return result;
}

storiesOf('SVG renderers', module)
  .add(
    'SmilesSvgRenderer',
    () => (
      <SmilesSvgRenderer
        smiles={text('SMILES', 'COCCOc1ccccc1')}
        {...getKnobs()}
      />
    ),
    {
      info: {
        text: 'The SMILES SVG renderer will always invent the coordinates.',
        source: false,
        propTables: [BaseSmilesSvgRenderer, SvgRenderer],
        propTablesExclude: [SmilesSvgRenderer],
      },
    },
  )
  .add(
    'MolfileSvgRenderer (V2000)',
    () => (
      <MolfileSvgRenderer
        molfile={text('molfile', molfileV2000)}
        {...getKnobs()}
      />
    ),
    {
      info: {
        text: molfileText,
        source: false,
        propTables: [BaseMolfileSvgRenderer, SvgRenderer],
        propTablesExclude: [MolfileSvgRenderer],
      },
    },
  )
  .add(
    'MolfileSvgRenderer (V3000)',
    () => (
      <MolfileSvgRenderer
        molfile={text('molfile', molfileV3000)}
        {...getKnobs()}
      />
    ),
    {
      info: {
        text: molfileText,
        source: false,
        propTables: [BaseMolfileSvgRenderer, SvgRenderer],
        propTablesExclude: [MolfileSvgRenderer],
      },
    },
  )
  .add(
    'IdcodeSvgRenderer',
    () => (
      <IdcodeSvgRenderer
        idcode={text('ID code', idcode.idCode)}
        {...getKnobs()}
      />
    ),
    {
      info: {
        source: false,
        propTables: [BaseIdcodeSvgRenderer, SvgRenderer],
        propTablesExclude: [IdcodeSvgRenderer],
      },
    },
  )
  .add(
    'IdcodeSvgRenderer (with coordinates)',
    () => (
      <IdcodeSvgRenderer
        idcode={text('ID code', idcode.idCode)}
        coordinates={text('ID coordinates', idcode.coordinates)}
        {...getKnobs()}
      />
    ),
    {
      info: {
        source: false,
        propTables: [BaseIdcodeSvgRenderer, SvgRenderer],
        propTablesExclude: [IdcodeSvgRenderer],
      },
    },
  );
