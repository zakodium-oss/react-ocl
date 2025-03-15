import OCL, {
  Molecule,
  Reaction,
  ReactionEncoder,
} from 'openchemlib/full.pretty';
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
    idCode: string | null,
  ) => void;
}

interface CallbacksRef {
  onChange?: OCL.OnChangeListenerCallback;
}

const decodeReaction = (idCode: string): Reaction => {
  let ret = Reaction.create();
  if (idCode?.trim().length > 0) {
    const frags: string[] = idCode.split(' ');
    if (frags.length > 0) {
      const rxn = ReactionEncoder.decode(idCode);
      if (rxn != null) {
        ret = rxn;
      }
    }
  }
  return ret;
};

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
  //const reactionMode: boolean = mode === 'reaction';

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

    // GWT doesn't play well with the shadow DOM. This hack allows to load an
    // OCL editor inside a shadow root.
    const root = domRef.current.getRootNode();
    let originalGetElementById: typeof document.getElementById | undefined;
    if (root instanceof ShadowRoot) {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      originalGetElementById = document.getElementById;
      document.getElementById = root.getElementById.bind(root);
    }
    let editor;
    try {
      editor = new OCL.CanvasEditor(domRef.current, { initialMode: mode });
    } finally {
      if (originalGetElementById) {
        document.getElementById = originalGetElementById;
      }
    }

    editorRef.current.editor = editor;

    if (initialMolfile && initialIDCode) {
      throw new Error('Cannot specify both initialMolfile and initialIDCode');
    }
    if (initialMolfile) {
      if (mode === 'reaction') {
        editor.setReaction(Reaction.fromRxn(initialMolfile));
      } else {
        editor.setMolecule(Molecule.fromMolfile(initialMolfile));
      }
    }
    if (initialIDCode) {
      if (mode === 'reaction') {
        editor.setReaction(decodeReaction(initialMolfile));
      } else {
        editor.setMolecule(Molecule.fromIDCode(initialIDCode));
      }
    }
    editor.getMolecule().setFragment(fragment);
    editor.setOnChangeListener((event) => {
      if (callbacksRef.current.onChange) {
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
            const molfile = editor.getMolecule().toMolfile();
            const molecule = editor.getMolecule();
            const idCode = editor.getMolecule().getIDCode();
            onChange(molfile, molecule, idCode);
          } else {
            const reaction = editor.getReaction();
            const idCode = ReactionEncoder.encode(reaction, {});
            onChange(null, null, idCode);
          }
        }
      }
    };
  }, [onChange, mode]);

  useEffect(() => {
    if (editorRef.current.editor) {
      if (mode === 'reaction') {
        editorRef.current.editor.setReaction(decodeReaction(initialIDCode));
      } else {
        editorRef.current.editor.setMolecule(
          Molecule.fromIDCode(initialIDCode),
        );
      }
    }
  }, [initialIDCode, mode]);

  return (
    <>
      <div>Structure Editor</div>
      <div ref={domRef} style={{ width, height }} />;
    </>
  );
}
