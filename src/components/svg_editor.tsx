import type { Molecule } from 'openchemlib';
import type { FormEvent, MouseEvent } from 'react';
import { useCallback, useMemo, useReducer, useRef } from 'react';

import type { SvgRendererProps } from './svg_renderer.js';
import { SvgRenderer } from './svg_renderer.js';

export interface SvgEditorProps extends SvgRendererProps {
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
        x: clientX - rect.x,
        y: clientY - rect.y,
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
  const propsRef = useRef(props);
  propsRef.current = props;

  const [state, dispatch] = useReducer(stateReducer, initialState);

  const onAtomClick = useCallback(
    (atomId: number, event: MouseEvent<SVGElement>) => {
      propsRef.current.onAtomClick?.(atomId, event);
      if (event.defaultPrevented) return;

      dispatch({ type: 'startEdit', atomId, event });
    },
    [],
  );

  const defaultAtomLabel = useMemo(() => {
    if (state.mode !== 'atom-label-edit') return '';

    return molecule.getAtomCustomLabel(state.atomId);
  }, [state, molecule]);

  function onAtomLabelSubmit(newLabel: string) {
    if (state.mode !== 'atom-label-edit') return;

    const newMolecule = molecule.getCompactCopy();
    newMolecule.setAtomCustomLabel(state.atomId, newLabel);

    onChange(newMolecule);
    dispatch({ type: 'stopEdit' });
  }

  return (
    <div style={{ position: 'relative' }}>
      <SvgRenderer
        {...svgProps}
        molecule={molecule}
        onAtomClick={onAtomClick}
      />
      {state.mode === 'atom-label-edit' && (
        <AtomLabelEditForm
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

  return (
    <form
      onSubmit={onFormSubmit}
      onKeyDown={(event) => {
        if (event.key !== 'Escape') return;
        event.preventDefault();
        event.stopPropagation();
        onCancel();
      }}
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
        style={{ minWidth: 0, flexShrink: 1 }}
        autoFocus
      />
      <input type="submit" value="OK" />
    </form>
  );
}
