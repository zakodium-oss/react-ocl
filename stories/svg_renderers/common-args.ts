import type { ArgTypes } from '@storybook/react-vite';

import type { BaseSvgRendererProps } from '../../src/index.ts';

export const commonArgTypes = {
  id: {
    control: 'text',
  },
  factorTextSize: {
    control: 'number',
  },
  fontWeight: {
    control: 'text',
  },
  strokeWidth: {
    control: 'text',
  },
} satisfies ArgTypes<BaseSvgRendererProps>;

export const commonArgs = {
  width: 300,
  height: 200,
  inflateToMaxAVBL: false,
  inflateToHighResAVBL: false,
  chiralTextBelowMolecule: false,
  chiralTextAboveMolecule: false,
  chiralTextOnFrameTop: false,
  chiralTextOnFrameBottom: false,
  noTabus: false,
  autoCrop: true,
  autoCropMargin: 20,
  showAtomNumber: false,
  showBondNumber: false,
  highlightQueryFeatures: false,
  showMapping: false,
  suppressChiralText: true,
  suppressCIPParity: true,
  suppressESR: true,
  showSymmetrySimple: false,
  noImplicitAtomLabelColors: false,
  noStereoProblem: true,
  label: 'Label p1',
  labelFontFamily: 'Arial, Helvetica, sans-serif',
  labelFontSize: 14,
  labelColor: 'rgb(127,127,127)',
} satisfies BaseSvgRendererProps;
