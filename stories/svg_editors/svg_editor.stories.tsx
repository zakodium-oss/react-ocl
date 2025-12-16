import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { SvgEditor } from '../../src/index.js';
import { molecule as defaultBaseMolecule } from '../data.js';
import { OclReset } from '../reset/ocl_reset.tsx';

const defaultMolecule = defaultBaseMolecule.getCompactCopy();
defaultMolecule.setAtomCustomLabel(0, "]5'");

export default {
  title: 'SvgEditor',
  component: SvgEditor,
  // We cannot pass a Molecule as arg because it is not serializable.
  render: (args) => {
    const [molecule, setMolecule] = useState(defaultMolecule);

    return <SvgEditor {...args} molecule={molecule} onChange={setMolecule} />;
  },
} satisfies Meta<typeof SvgEditor>;

type Story = StoryObj<typeof SvgEditor>;

export const Control: Story = {};
export const WithCssReset: Story = {
  decorators: (Story) => {
    return (
      <>
        <OclReset />
        <Story />
      </>
    );
  },
};
