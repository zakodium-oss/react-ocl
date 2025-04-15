import type { CanvasEditorMode } from 'openchemlib/full';
import {
  CanvasEditor,
  Molecule,
  Reaction,
  ReactionEncoder,
  SmilesParser,
} from 'openchemlib/full';
import type { MutableRefObject, RefObject } from 'react';
import { useEffect, useLayoutEffect, useRef } from 'react';

export interface CanvasEditorOnChangeMolecule {
  /**
   * Returns the molecule encoded as an idcode (with coordinates).
   */
  getIdcode: () => string;
  /**
   * Returns the molecule encoded as a molfile V2000.
   */
  getMolfile: () => string;
  /**
   * Returns the molecule encoded as a molfile V3000.
   */
  getMolfileV3: () => string;
  /**
   * Returns the molecule encoded as a SMILES.
   */
  getSmiles: () => string;
}

export interface CanvasEditorOnChangeReaction {
  /**
   * Returns the reaction encoded as an idcode (with coordinates).
   */
  getIdcode: () => string;
  /**
   * Returns the reaction encoded as a RXNFile V2000.
   */
  getRxn: () => string;
  /**
   * Returns the reaction encoded as a RXNFile V3000.
   */
  getRxnV3: () => string;
  /**
   * Returns the reaction encoded as a SMILES.
   */
  getSmiles: () => string;
}

export type CanvasEditorInputFormat = 'idcode' | 'molfile' | 'smiles';

export interface UseCanvasEditorBaseOptions {
  /**
   * Mode used to initialise the editor.
   *
   * Changing this will force the editor to be reinitialised and lose its
   * internal state.
   */
  initialMode?: CanvasEditorMode;

  /**
   * A read-only editor can be used to render structures or reactions.
   *
   * Changing this will force the editor to be reinitialised and lose its
   * internal state.
   * @default false
   */
  readOnly?: boolean;

  /**
   * Format of the input value.
   * 'molfile' supports both V2000 and V3000.
   * For reactions encoded as RXN, use 'molfile'.
   * @default 'idcode'
   */
  inputFormat?: CanvasEditorInputFormat;

  /**
   * Input value to initialise the structure.
   *
   * Changing this value will have the effect of replacing the structure being edited,
   * but this should not be done continuously in reaction to the `onChange` event
   * like you would with a controlled component.
   * The editor manages its state internally, and replacing the structure will
   * reset the coordinates and likely move the structure everytime it is changed.
   * @default ''
   */
  inputValue?: string;

  /**
   * Whether the edited structure is a fragment or regular structure.
   * @default false
   */
  fragment?: boolean;
}

export type OnChangeMoleculeCallback = (
  event: CanvasEditorOnChangeMolecule,
) => void;

export interface UseCanvasEditorMoleculeOptions
  extends UseCanvasEditorBaseOptions {
  initialMode?: 'molecule';

  /**
   * Callback which is called whenever the molecule is changed by a user action
   * in the editor.
   *
   * The event methods available in the callback should be called synchronously,
   * otherwise they might reflect a future state of the editor.
   */
  onChange?: OnChangeMoleculeCallback;
}

export type OnChangeReactionCallback = (
  event: CanvasEditorOnChangeReaction,
) => void;

export interface UseCanvasEditorReactionOptions
  extends UseCanvasEditorBaseOptions {
  initialMode: 'reaction';

  /**
   * Callback which is called whenever the reaction is changed by a user action
   * in the editor.
   *
   * The event methods available in the callback should be called synchronously,
   * otherwise they might reflect a future state of the editor.
   */
  onChange?: OnChangeReactionCallback;
}

type OnChangeCallback = OnChangeMoleculeCallback | OnChangeReactionCallback;

/**
 * Initialize a CanvasEditor and return a ref to the DOM element on which it
 * will be attached.
 * @param options - Editor options
 * @returns The element ref.
 */
export function useCanvasEditor(
  options: UseCanvasEditorMoleculeOptions | UseCanvasEditorReactionOptions = {},
) {
  const {
    initialMode = 'molecule',
    readOnly = false,
    inputFormat = 'idcode',
    inputValue = '',
    fragment = false,
    onChange,
  } = options;

  const elementRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<CanvasEditor | null>(null);

  useInitialiseEditor(elementRef, editorRef, readOnly, initialMode);
  useOnChangeListeners(editorRef, onChange);
  useUpdateStructure(editorRef, inputFormat, inputValue);
  useUpdateFragment(editorRef, fragment);

  return { elementRef };
}

function useInitialiseEditor(
  elementRef: RefObject<HTMLDivElement | null>,
  editorRef: MutableRefObject<CanvasEditor | null>,
  readOnly: boolean,
  initialMode: CanvasEditorMode,
): void {
  useLayoutEffect(() => {
    if (!elementRef.current) {
      return;
    }

    elementRef.current.innerHTML = '';

    const editor = new CanvasEditor(elementRef.current, {
      readOnly,
      initialMode,
    });
    editorRef.current = editor;

    return () => {
      editor.removeOnChangeListener();
      editor.destroy();
    };
  }, [editorRef, elementRef, readOnly, initialMode]);
}

function useOnChangeListeners(
  editorRef: RefObject<CanvasEditor | null>,
  onChange: OnChangeCallback | undefined,
) {
  const callbacksRef = useRef<{ onChange: typeof onChange }>({
    onChange,
  });

  // Register the main change handler.
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || editor.isDestroyed) return;

    const moleculeChangeApi = getMoleculeChangeApi(editor);
    const reactionChangeApi = getReactionChangeApi(editor);

    editor.setOnChangeListener((event) => {
      if (
        event.isUserEvent &&
        event.type === 'molecule' &&
        callbacksRef.current.onChange
      ) {
        const currentMode = editor.getMode();
        if (currentMode === 'molecule') {
          // @ts-expect-error Cannot be safe as onChange type depends on the mode.
          callbacksRef.current.onChange(moleculeChangeApi);
        } else {
          // @ts-expect-error Cannot be safe as onChange type depends on the mode.
          callbacksRef.current.onChange(reactionChangeApi);
        }
      }
    });

    return () => {
      if (!editor.isDestroyed) {
        editor.removeOnChangeListener();
      }
    };
  }, [editorRef]);

  // Update user callbacks.
  useEffect(() => {
    callbacksRef.current.onChange = onChange;
  }, [onChange]);
}

function getMoleculeChangeApi(
  editor: CanvasEditor,
): CanvasEditorOnChangeMolecule {
  return {
    getIdcode() {
      const { idCode, coordinates } = editor
        .getMolecule()
        .getIDCodeAndCoordinates();
      return `${idCode} ${coordinates}`;
    },
    getMolfile() {
      return editor.getMolecule().toMolfile();
    },
    getMolfileV3() {
      return editor.getMolecule().toMolfileV3();
    },
    getSmiles() {
      return editor.getMolecule().toSmiles();
    },
  };
}

function getReactionChangeApi(
  editor: CanvasEditor,
): CanvasEditorOnChangeReaction {
  return {
    getIdcode() {
      return ReactionEncoder.encode(editor.getReaction()) ?? '';
    },
    getRxn(programName?: string) {
      return editor.getReaction().toRxn(programName);
    },
    getRxnV3(programName?: string) {
      return editor.getReaction().toRxnV3(programName);
    },
    getSmiles() {
      return editor.getReaction().toSmiles();
    },
  };
}

function useUpdateStructure(
  editorRef: RefObject<CanvasEditor | null>,
  inputFormat: CanvasEditorInputFormat,
  inputValue: string,
): void {
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || editor.isDestroyed) return;

    const currentMode = editor.getMode();
    if (inputFormat === 'idcode') {
      if (currentMode === 'molecule') {
        editor.setMolecule(Molecule.fromIDCode(inputValue));
      } else {
        const reaction =
          ReactionEncoder.decode(inputValue) ?? Reaction.create();
        editor.setReaction(reaction);
      }
    } else if (inputFormat === 'molfile') {
      if (currentMode === 'molecule') {
        editor.setMolecule(Molecule.fromMolfile(inputValue));
      } else {
        editor.setReaction(Reaction.fromRxn(inputValue));
      }
    } else if (inputFormat === 'smiles') {
      if (currentMode === 'molecule') {
        editor.setMolecule(Molecule.fromSmiles(inputValue));
      } else {
        editor.setReaction(
          new SmilesParser({ singleDotSeparator: true }).parseReaction(
            inputValue,
          ),
        );
      }
    }
  }, [editorRef, inputFormat, inputValue]);
}

function useUpdateFragment(
  editorRef: RefObject<CanvasEditor | null>,
  fragment: boolean,
): void {
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || editor.isDestroyed) return;

    const currentMode = editor.getMode();
    if (currentMode === 'molecule') {
      const molecule = editor.getMolecule();
      molecule.setFragment(fragment);
      editor.setMolecule(molecule);
    } else {
      const reaction = editor.getReaction();
      reaction.setFragment(fragment);
      editor.setReaction(reaction);
    }
  }, [editorRef, fragment]);
}
