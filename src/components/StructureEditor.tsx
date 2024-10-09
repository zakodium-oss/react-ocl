import OCL from 'openchemlib/full';
import { type ReactElement, useEffect, useRef } from 'react';

export interface StructureEditorProps {
  width?: number;
  height?: number;
  initialMolfile?: string;
  initialIDCode?: string;
  fragment?: boolean;
  svgMenu?: boolean;
  onChange?: (molfile: string, molecule: OCL.Molecule, idCode: string) => void;
  onAtomEnter?: (atomId: number) => void;
  onAtomLeave?: (atomId: number) => void;
  onBondEnter?: (bondId: number) => void;
  onBondLeave?: (bondId: number) => void;
}

interface CallbacksRef {
  onChange?: OCL.ChangeListenerCallback;
  onAtomHighlight?: OCL.AtomHighlightCallback;
  onBondHighlight?: OCL.BondHighlightCallback;
}

export default function StructureEditor(
  props: StructureEditorProps,
): ReactElement {
  const {
    width = 675,
    height = 450,
    initialMolfile = '',
    initialIDCode = '',
    fragment = false,
    svgMenu = true,
    onChange,
    onAtomEnter,
    onAtomLeave,
    onBondEnter,
    onBondLeave,
  } = props;

  const domRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<{
    editor: OCL.StructureEditor | null;
    hadFirstChange: boolean;
  }>({ editor: null, hadFirstChange: false });
  const callbacksRef = useRef<CallbacksRef>({});

  useEffect(() => {
    if (!domRef.current) return;

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
      editor = new OCL.StructureEditor(domRef.current, svgMenu, 1);
    } finally {
      if (originalGetElementById) {
        document.getElementById = originalGetElementById;
      }
    }

    editorRef.current.editor = editor;
    if (initialMolfile && initialIDCode) {
      throw new Error('Cannot specify both initialMolfile and initialIDCode');
    }
    if (initialMolfile) editor.setMolFile(initialMolfile);
    if (initialIDCode) editor.setIDCode(initialIDCode);
    editor.setFragment(fragment);
    editor.setChangeListenerCallback((...args) => {
      if (callbacksRef.current.onChange) {
        callbacksRef.current.onChange(...args);
      }
    });
    editor.setAtomHightlightCallback((...args) => {
      if (callbacksRef.current.onAtomHighlight) {
        callbacksRef.current.onAtomHighlight(...args);
      }
    });
    editor.setBondHightlightCallback((...args) => {
      if (callbacksRef.current.onBondHighlight) {
        callbacksRef.current.onBondHighlight(...args);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height, svgMenu]);

  useEffect(() => {
    callbacksRef.current.onChange = () => {
      if (!editorRef.current.hadFirstChange) {
        editorRef.current.hadFirstChange = true;
      } else if (onChange && editorRef.current.editor) {
        const molfile = editorRef.current.editor.getMolFileV3();
        const molecule = editorRef.current.editor.getMolecule();
        const idCode = editorRef.current.editor.getIDCode();
        onChange(molfile, molecule, idCode);
      }
    };
    callbacksRef.current.onAtomHighlight = (atomId, enter) => {
      if (enter && onAtomEnter) {
        onAtomEnter(atomId);
      } else if (!enter && onAtomLeave) {
        onAtomLeave(atomId);
      }
    };
    callbacksRef.current.onBondHighlight = (bondId, enter) => {
      if (enter && onBondEnter) {
        onBondEnter(bondId);
      } else if (!enter && onBondLeave) {
        onBondLeave(bondId);
      }
    };
  }, [onChange, onAtomEnter, onAtomLeave, onBondEnter, onBondLeave]);

  useEffect(() => {
    if (editorRef.current.editor) {
      editorRef.current.editor.setFragment(fragment);
    }
  }, [fragment]);

  return <div ref={domRef} style={{ width, height }} />;
}
