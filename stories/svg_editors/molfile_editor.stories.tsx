import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { MolfileSvgEditor } from '../../src/index.ts';
import { molfileV2000, molfileV3000 } from '../data.ts';
import { commonArgTypes, commonArgs } from '../svg_renderers/common-args.ts';

export default {
  title: 'SVG editors/MolfileSvgEditor',
  component: MolfileSvgEditor,
  args: {
    ...commonArgs,
    molfile: molfileV3000,
    mdlFormat: 'V3000',
  },
  argTypes: {
    ...commonArgTypes,
  },
  render(props) {
    const [molfile, setMolfile] = useState(props.molfile);

    return (
      <MolfileSvgEditor {...props} molfile={molfile} onChange={setMolfile} />
    );
  },
  decorators(Story, ctx) {
    return <Story key={ctx.args.molfile} />; // reset render molfile state when control molfile change
  },
} satisfies Meta<typeof MolfileSvgEditor>;

type Story = StoryObj<typeof MolfileSvgEditor>;

export const Control: Story = {};

export const WithPreviewV2000: Story = {
  name: 'With preview (to V2000)',
  args: {
    mdlFormat: 'V2000',
  },
  render(props) {
    const [molfile, setMolfile] = useState(props.molfile);

    return (
      <div style={{ display: 'flex', gap: '1rem' }}>
        <MolfileSvgEditor {...props} molfile={molfile} onChange={setMolfile} />
        <pre style={{ fontSize: '0.5em' }}>
          <code>{molfile}</code>
        </pre>
      </div>
    );
  },
  decorators(Story, ctx) {
    return <Story key={ctx.args.molfile} />; // reset render molfile state when control molfile change
  },
};

export const V2000: Story = {
  name: 'Molfile (V2000)',
  args: {
    molfile: molfileV2000,
    mdlFormat: 'V2000',
  },
};

export const V3000: Story = {
  name: 'Molfile (V3000)',
  args: {
    mdlFormat: 'V3000',
  },
};

export const AtomHighlightStrategyDefault: Story = {
  args: {
    atomHighlight: [0, 1, 2],
    atomHighlightStrategy: 'prefer-editor-state',
  },
};
export const AtomHighlightStrategyPreferPropsWithHighlight: Story = {
  args: {
    atomHighlight: [0, 1, 2],
    atomHighlightStrategy: 'prefer-editor-props',
  },
};
export const AtomHighlightStrategyPreferPropsWithoutHighlight: Story = {
  args: {
    atomHighlight: undefined,
    atomHighlightStrategy: 'prefer-editor-props',
  },
};
export const AtomHighlightStrategyProps: Story = {
  args: {
    atomHighlight: [0, 1, 2],
    atomHighlightStrategy: 'editor-props',
  },
};
export const AtomHighlightStrategyState: Story = {
  args: {
    atomHighlight: [0, 1, 2],
    atomHighlightStrategy: 'editor-state',
  },
};
export const AtomHighlightStrategyMerge: Story = {
  args: {
    atomHighlight: [0, 1, 2],
    atomHighlightStrategy: 'merge',
  },
};
