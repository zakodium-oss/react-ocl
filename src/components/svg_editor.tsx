import type { Molecule } from 'openchemlib';
import type {
  FormEvent,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent,
} from 'react';
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';

import type { SvgRendererProps } from './svg_renderer.js';
import { SvgRenderer } from './svg_renderer.js';

export interface SvgEditorProps
  extends Omit<SvgRendererProps, 'atomHighlight'> {
  onChange: (newMolecule: Molecule) => void;
}

type State =
  | { mode: 'view' }
  | {
      mode: 'atom-label-edit';
      atomId: number;
      formCoords: { x: number; y: number };
    };
const initialState: State = { mode: 'view' };

type Action =
  | {
      type: 'startEdit';
      atomId: number;
      event: MouseEvent;
    }
  | { type: 'stopEdit' };

function stateReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'startEdit': {
      // Ignore if we are already in edit mode
      if (state.mode !== 'view') return state;

      const { clientX, clientY } = action.event;
      const target = action.event.target as SVGCircleElement;
      const svg = target.closest('svg') as SVGElement;
      const rect = svg.getBoundingClientRect();
      const formCoords = {
        // offset by 5px to avoid cursor onMouseLeave not triggered
        x: clientX - rect.x + 5,
        y: clientY - rect.y + 5,
      };
      return { mode: 'atom-label-edit', atomId: action.atomId, formCoords };
    }
    case 'stopEdit':
      return { mode: 'view' };
    default:
      // @ts-expect-error action type narrowing
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

/**
 * A component that renders an SVG editor for a given molecule.
 * Under the hood it uses the SvgRenderer component to display the molecule and catch interactions.
 * @param props - The props for the SvgEditor component.
 * @returns JSX.Element
 */
export function SvgEditor(props: SvgEditorProps) {
  const { molecule, onChange, ...svgProps } = props;
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const [atomHighlight, setAtomHighlight] = useState<number>(-1);
  const atomsHighlight = useMemo(() => {
    if (atomHighlight === -1) return undefined;

    return [atomHighlight];
  }, [atomHighlight]);

  const atomRef = useRef(atomHighlight);
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    atomRef.current = atomHighlight;
    onChangeRef.current = onChange;
  });
  useEffect(() => {
    if (state.mode !== 'view') return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Backspace' && event.key !== 'Delete') return;
      if (atomRef.current === -1) return;

      const atomId = atomRef.current;
      const newMolecule = molecule.getCompactCopy();
      newMolecule.setAtomCustomLabel(atomId, null as never);
      onChangeRef.current(newMolecule);
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [state, molecule]);

  function onAtomClick(atomId: number, event: MouseEvent<SVGElement>) {
    props.onAtomClick?.(atomId, event);
    if (event.defaultPrevented) return;

    dispatch({ type: 'startEdit', atomId, event });
  }

  function onAtomEnter(atomId: number, event: MouseEvent<SVGElement>) {
    props.onAtomEnter?.(atomId, event);
    if (event.defaultPrevented) return;

    setAtomHighlight(atomId);
  }

  function onAtomLeave(atomId: number, event: MouseEvent<SVGElement>) {
    props.onAtomLeave?.(atomId, event);
    if (event.defaultPrevented) return;

    setAtomHighlight(-1);
  }

  const defaultAtomLabel = useMemo(() => {
    if (state.mode !== 'atom-label-edit') return '';

    const label = molecule.getAtomCustomLabel(state.atomId) ?? '';
    return label.replaceAll(']', '');
  }, [state, molecule]);

  function onAtomLabelSubmit(newLabel: string) {
    if (state.mode !== 'atom-label-edit') return;

    newLabel = newLabel.replaceAll(']', '');
    const newMolecule = molecule.getCompactCopy();
    newMolecule.setAtomCustomLabel(
      state.atomId,
      // types are wrong, custom label can be null
      newLabel ? `]${newLabel}` : (null as never),
    );

    onChange(newMolecule);
    dispatch({ type: 'stopEdit' });
  }

  return (
    <div style={{ position: 'relative' }}>
      <SvgRenderer
        {...svgProps}
        molecule={molecule}
        atomHighlight={atomsHighlight}
        onAtomEnter={onAtomEnter}
        onAtomLeave={onAtomLeave}
        onAtomClick={onAtomClick}
      />
      {state.mode === 'atom-label-edit' && (
        <AtomLabelEditForm
          key={defaultAtomLabel}
          defaultValue={defaultAtomLabel}
          formCoords={state.formCoords}
          onSubmit={onAtomLabelSubmit}
          onCancel={() => dispatch({ type: 'stopEdit' })}
        />
      )}
    </div>
  );
}

interface AtomLabelEditFormProps {
  defaultValue: string;
  formCoords: { x: number; y: number };
  onSubmit: (value: string) => void;
  onCancel: () => void;
}

function AtomLabelEditForm(props: AtomLabelEditFormProps) {
  const { defaultValue, formCoords, onSubmit, onCancel } = props;

  function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    const formData = new FormData(event.currentTarget);
    const value = formData.get('label') as string;
    onSubmit(value);
  }

  function onKeyDown(event: ReactKeyboardEvent<HTMLFormElement>) {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    event.stopPropagation();
    onCancel();
  }

  function onCancelClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    onCancel();
  }

  const formRef = useRef<HTMLFormElement>(null);
  const onCancelRef = useRef(onCancel);
  useEffect(() => {
    onCancelRef.current = onCancel;
  });

  useEffect(() => {
    function onClickOutside(event: PointerEvent) {
      const form = formRef.current;
      if (!form) return;

      if (form === event.currentTarget) return;
      if (form.contains(event.target as HTMLElement)) return;

      onCancelRef.current();
    }

    // It seems mounting the form is fast enough to catch the click event that
    // triggered the edit mode.
    // To avoid this we delay the binding of the event
    // handler to the next event loop iteration.
    const timeoutId = setTimeout(
      () => document.addEventListener('click', onClickOutside),
      0,
    );
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', onClickOutside);
    };
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={onFormSubmit}
      onKeyDown={onKeyDown}
      style={{
        position: 'absolute',
        top: formCoords.y,
        left: formCoords.x,
        display: 'flex',
        alignItems: 'stretch',
        gap: '0.25em',
        border: '1px solid lightgray',
        backgroundColor: 'white',
        padding: '0.25em',
      }}
    >
      <input
        type="text"
        name="label"
        defaultValue={defaultValue}
        size={5}
        autoFocus
        ref={autoSelectText}
      />
      <input type="submit" value="✔️" aria-label="Submit" />
      <button type="button" aria-label="Cancel" onClick={onCancelClick}>
        ❌
      </button>
    </form>
  );
}

function autoSelectText(node: HTMLInputElement | null) {
  node?.select();
}
