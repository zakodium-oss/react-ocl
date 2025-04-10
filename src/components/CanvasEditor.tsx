import OCL from 'openchemlib/full';
import type { ReactElement } from 'react';
import { useEffect, useRef } from 'react';

export interface CanvasEditorProps {
  width?: number;
  height?: number;
  initialMolfile?: string;
  initialIDCode?: string;
  fragment?: boolean;
  mode?: OCL.CanvasEditorMode;
  onChange?: (
    molFile: string | null,
    molecule: OCL.Molecule | null,
    idCode: string,
  ) => void;
}

interface CallbacksRef {
  onChange?: OCL.OnChangeListenerCallback;
}

function decodeReaction(idCode: string): OCL.Reaction {
  let ret = OCL.Reaction.create();
  if (idCode?.trim().length > 0) {
    const frags: string[] = idCode.split(' ');
    if (frags.length > 0) {
      const rxn = OCL.ReactionEncoder.decode(idCode);
      if (rxn != null) {
        ret = rxn;
      }
    }
  }
  return ret;
}

export default function CanvasEditor(props: CanvasEditorProps): ReactElement {
  const {
    width = 675,
    height = 450,
    initialMolfile = '',
    initialIDCode = '',
    fragment = false,
    mode = 'molecule',
    onChange,
  } = props;

  const domRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<{
    editor: OCL.CanvasEditor | null;
    hadFirstChange: boolean;
  }>({ editor: null, hadFirstChange: false });
  const callbacksRef = useRef<CallbacksRef>({});

  useEffect(() => {
    if (!domRef.current) {
      return;
    }

    domRef.current.innerHTML = '';

    const editor = new OCL.CanvasEditor(domRef.current, { initialMode: mode });
    editorRef.current.editor = editor;

    if (initialMolfile && initialIDCode) {
      throw new Error('Cannot specify both initialMolfile and initialIDCode');
    }
    if (initialMolfile) {
      if (mode === 'reaction') {
        editor.setReaction(OCL.Reaction.fromRxn(initialMolfile));
      } else {
        editor.setMolecule(OCL.Molecule.fromMolfile(initialMolfile));
      }
    }
    if (initialIDCode) {
      if (mode === 'reaction') {
        editor.setReaction(decodeReaction(initialMolfile));
      } else {
        editor.setMolecule(OCL.Molecule.fromIDCode(initialIDCode));
      }
    }
    editor.getMolecule().setFragment(fragment);
    editor.setOnChangeListener((event) => {
      if (
        event.isUserEvent &&
        event.type === 'molecule' &&
        callbacksRef.current.onChange
      ) {
        callbacksRef.current.onChange(event);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  useEffect(() => {
    callbacksRef.current.onChange = () => {
      if (!editorRef.current.hadFirstChange) {
        editorRef.current.hadFirstChange = true;
      } else {
        const editor = editorRef.current.editor;
        if (onChange && editor) {
          if (mode === 'molecule') {
            const molfile = editor.getMolecule().toMolfileV3();
            const molecule = editor.getMolecule();
            const idCode = editor.getMolecule().getIDCode();
            onChange(molfile, molecule, idCode);
          } else {
            const reaction = editor.getReaction();
            const idCode = OCL.ReactionEncoder.encode(reaction, {}) ?? '';
            onChange(null, null, idCode);
          }
        }
      }
    };
  }, [onChange, mode]);

  return <div ref={domRef} style={{ width, height }} />;
}
