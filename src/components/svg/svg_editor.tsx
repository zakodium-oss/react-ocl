import type { Molecule } from 'openchemlib';
import type {
  FormEvent,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent,
} from 'react';
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';

import { useRefUpToDate } from '../../hooks/use_ref_up_to_date.js';
import type { BaseEditorProps } from '../types.js';

import {
  isCleanEvent,
  isQuickNumberingEvent,
} from './editor/events_predicate.js';
import { getPreviousCustomLabel } from './editor/quick_numbering.js';
import type { State } from './editor/reducer.js';
import { stateReducer } from './editor/reducer.js';
import { useHighlight } from './editor/use_highlight.js';
import type { SvgRendererProps } from './svg_renderer.js';
import { SvgRenderer } from './svg_renderer.js';

export interface SvgEditorProps
  extends SvgRendererProps,
    BaseEditorProps<Molecule> {}

const initialState: State = { mode: 'view' };

/**
 * A component that renders an SVG editor for a given molecule.
 * Under the hood it uses the SvgRenderer component to display the molecule and catch interactions.
 * @param props - The props for the SvgEditor component.
 * @returns JSX.Element
 */
export function SvgEditor(props: SvgEditorProps) {
  const {
    molecule,
    onChange,
    atomHighlightStrategy = 'editor-state',
    atomHighlight: atomHighlightProp,
    ...svgProps
  } = props;
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const { atomHighlight, setAtomHighlight, atomsHighlight } = useHighlight({
    atomHighlight: atomHighlightProp,
    atomHighlightStrategy,
  });
  const [lastInputLabel, setLastInputLabel] = useState('');

  const atomRef = useRefUpToDate(atomHighlight);
  const onChangeRef = useRefUpToDate(onChange);
  const lastInputLabelRef = useRefUpToDate(lastInputLabel);
  useEffect(() => {
    if (state.mode !== 'view') return;

    function onClean(event: KeyboardEvent) {
      if (!isCleanEvent(event)) return;
      if (atomRef.current === -1) return;
      event.preventDefault();

      const atomId = atomRef.current;
      const newMolecule = molecule.getCompactCopy();

      const rawLabel = molecule.getAtomCustomLabel(atomId);
      if (rawLabel) {
        const label = rawLabel.replaceAll(']', '');
        const previousLabel = getPreviousCustomLabel(label);
        if (previousLabel) {
          setLastInputLabel(previousLabel);
        }
      }

      newMolecule.setAtomCustomLabel(atomId, null);
      onChangeRef.current(newMolecule);
    }

    function onQuickNumbering(event: KeyboardEvent) {
      if (!isQuickNumberingEvent(event)) return;
      if (atomRef.current === -1) return;
      event.preventDefault(); // numbering shortcut may be used in browser shortcuts

      const atomId = atomRef.current;
      const lastInputLabel = lastInputLabelRef.current;
      const newMolecule = molecule.getCompactCopy();

      let nextLabel = newMolecule.getNextCustomAtomLabel(
        lastInputLabel ? `]${lastInputLabel}` : ']1',
      );
      if (!nextLabel.startsWith(']')) nextLabel = `]${nextLabel}`;

      newMolecule.setAtomCustomLabel(atomId, nextLabel);
      setLastInputLabel(nextLabel.replaceAll(']', ''));
      onChangeRef.current(newMolecule);
    }

    document.addEventListener('keydown', onClean);
    document.addEventListener('keydown', onQuickNumbering);

    return () => {
      document.removeEventListener('keydown', onClean);
      document.removeEventListener('keydown', onQuickNumbering);
    };
  }, [state, molecule, atomRef, onChangeRef, lastInputLabelRef]);

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
    if (newLabel) {
      newMolecule.setAtomCustomLabel(state.atomId, `]${newLabel}`);
      setLastInputLabel(newLabel);
    } else {
      newMolecule.setAtomCustomLabel(state.atomId, null);
    }

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

const greekLetters = {
  alpha: 'α',
  beta: 'β',
  gamma: 'γ',
  delta: 'δ',
  epsilon: 'ε',
  zeta: 'ζ',
  eta: 'η',
  theta: 'θ',
} as const;
const greekLetterNames = Object.keys(greekLetters);
const greeksFirstLine = greekLetterNames.slice(0, 6);
const greeksLastLine = greekLetterNames.slice(6);
const primes = {
  prime1: '′',
  prime2: '″',
  prime3: '‴',
};
const primeNames = Object.keys(primes);

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

  function onShortcut(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (!formRef.current) return;
    const form = formRef.current;
    const input = form.querySelector('input[type="text"]') as HTMLInputElement;
    if (!input) return;

    const value = event.currentTarget.textContent.trim();
    input.setRangeText(
      value,
      input.selectionStart ?? 0,
      input.selectionEnd ?? input.value.length,
      'end',
    );
    input.focus();
  }

  return (
    <form
      ref={formRef}
      onSubmit={onFormSubmit}
      onKeyDown={onKeyDown}
      style={{
        position: 'absolute',
        top: formCoords.y,
        left: formCoords.x,
        display: 'grid',
        gridTemplateAreas: `
          "input input input input submit cancel"
          "${greeksFirstLine.join(' ')}"
          "${greeksLastLine.join(' ')} . ${primeNames.join(' ')}"
        `,
        gridTemplateColumns: 'repeat(4, 1.5em)',
        alignItems: 'stretch',
        gap: '0.25em',
        border: '1px solid lightgray',
        backgroundColor: 'white',
        padding: '0.25em',
      }}
    >
      <input
        style={{ gridArea: 'input' }}
        type="text"
        name="label"
        defaultValue={defaultValue}
        size={5}
        autoFocus
        ref={autoSelectText}
      />
      <input
        style={{ gridArea: 'submit' }}
        type="submit"
        value="✔️"
        aria-label="Submit"
      />
      <button
        style={{ gridArea: 'cancel' }}
        type="button"
        aria-label="Cancel"
        onClick={onCancelClick}
      >
        ❌
      </button>

      {Object.entries(greekLetters).map(([charName, greekChar]) => (
        <button
          key={charName}
          type="submit"
          style={{ gridArea: charName }}
          onClick={onShortcut}
        >
          {greekChar}
        </button>
      ))}

      {Object.entries(primes).map(([primeName, primeChar]) => (
        <button
          key={primeName}
          type="submit"
          style={{ gridArea: primeName }}
          onClick={onShortcut}
        >
          {primeChar}
        </button>
      ))}
    </form>
  );
}

function autoSelectText(node: HTMLInputElement | null) {
  node?.select();
}
