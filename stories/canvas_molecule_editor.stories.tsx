import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';

import type { CanvasEditorOnChangeMolecule } from '../src/index.ts';
import { CanvasMoleculeEditor } from '../src/index.ts';

export default {
  title: 'CanvasMoleculeEditor',
  component: CanvasMoleculeEditor,
  args: {
    width: 675,
    height: 450,
    inputFormat: 'smiles',
    inputValue: 'CN1C2CCC1C(C(C2)OC(=O)C3=CC=CC=C3)C(=O)OC',
  },
} satisfies Meta<typeof CanvasMoleculeEditor>;

type Story = StoryObj<typeof CanvasMoleculeEditor>;

export const Basic: Story = {};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
  },
};

export const Fragment: Story = {
  args: {
    fragment: true,
  },
};

export const Reactive: Story = {
  render(args) {
    const [data, setData] = useState({
      idcode: '',
      molfile: '',
      molfileV3: '',
      smiles: '',
    });
    const cb = useCallback((event: CanvasEditorOnChangeMolecule) => {
      setData({
        idcode: event.getIdcode(),
        molfile: event.getMolfile(),
        molfileV3: event.getMolfileV3(),
        smiles: event.getSmiles(),
      });
    }, []);
    return (
      <div>
        <h2>Reactive editor</h2>
        <p>
          The editor is not supposed to be used like this by always passing the
          state from the last event like a controlled component. This cannot
          work properly because of the way coordinates are managed internally.
          This story is here to show that it is possible to update the state by
          changing the input value, though.
        </p>
        <CanvasMoleculeEditor
          {...args}
          inputFormat="idcode"
          inputValue={data.idcode}
          onChange={cb}
        />
        <table>
          <tbody>
            <tr>
              <td valign="top">Idcode</td>
              <td>
                <code>{data.idcode}</code>
              </td>
            </tr>
            <tr>
              <td valign="top">Molfile V2000</td>
              <td>
                <code style={{ whiteSpace: 'pre' }}>{data.molfile}</code>
              </td>
            </tr>
            <tr>
              <td valign="top">Molfile V3000</td>
              <td>
                <code style={{ whiteSpace: 'pre' }}>{data.molfileV3}</code>
              </td>
            </tr>
            <tr>
              <td valign="top">SMILES</td>
              <td>
                <code>{data.smiles}</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
};
