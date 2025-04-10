import type { Molecule } from 'openchemlib/full';
import { useCallback, useState } from 'react';

import CanvasEditor from '../src/components/CanvasEditor.js';

export default {
  title: 'CanvasEditor',
  component: CanvasEditor,
  args: {
    mode: 'molecule',
    fragment: false,
    width: 675,
    height: 450,
  },
  parameters: {
    docs: {
      description: {
        component: 'CanvasEditor is an uncontrolled component.',
      },
    },
  },
};

const initialIDCode = 'gFp@DiTvjh@ !B?g~w@k_}m?vw@`';

export function FromIDCode() {
  const [idCode, setIDCode] = useState(initialIDCode);
  const [previous, setPrevious] = useState<string | null>(null);
  const cb = useCallback(
    (molfile: string | null, molecule: Molecule | null, newIDCode: string) => {
      setIDCode(newIDCode);
      setPrevious(idCode);
    },
    [setIDCode, setPrevious, idCode],
  );
  return (
    <div>
      <h2>Editor</h2>
      <CanvasEditor initialIDCode={idCode} onChange={cb} mode="molecule" />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ textAlign: 'center' }}>Current</h2>
          <pre>{idCode}</pre>
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ textAlign: 'center' }}>Previous</h2>
          <pre>{previous}</pre>
        </div>
      </div>
    </div>
  );
}
