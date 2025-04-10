import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';

import { CanvasReactionEditor } from '../src/components/canvas_editor.js';
import type { CanvasEditorOnChangeReaction } from '../src/components/canvas_editor_hook.js';

export default {
  title: 'CanvasReactionEditor',
  component: CanvasReactionEditor,
  args: {
    width: 800,
    height: 450,
    inputFormat: 'smiles',
    inputValue: 'CC(=O)O.OCC>>CC(=O)OCC',
  },
} satisfies Meta<typeof CanvasReactionEditor>;

type Story = StoryObj<typeof CanvasReactionEditor>;

export const Basic: Story = {};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
  },
};

export const Reactive: Story = {
  render(args) {
    const [data, setData] = useState({
      idcode: '',
      rxn: '',
      rxnV3: '',
      smiles: '',
    });
    const cb = useCallback((event: CanvasEditorOnChangeReaction) => {
      setData({
        idcode: event.getIdcode(),
        rxn: event.getRxn(),
        rxnV3: event.getRxnV3(),
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
        <CanvasReactionEditor
          {...args}
          inputFormat="idcode"
          inputValue={data.idcode}
          onChange={cb}
        />
        <table>
          <tbody>
            <tr>
              <td valign="top">Idcode</td>
              <code>{data.idcode}</code>
            </tr>
            <tr>
              <td valign="top">RXN V2000</td>
              <code style={{ whiteSpace: 'pre' }}>{data.rxn}</code>
            </tr>
            <tr>
              <td valign="top">RXN V3000</td>
              <code style={{ whiteSpace: 'pre' }}>{data.rxnV3}</code>
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
