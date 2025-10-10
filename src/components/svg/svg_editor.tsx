import type { Molecule } from 'openchemlib';
import type {
  FormEvent,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent,
} from 'react';
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';

import type { BaseEditorProps } from '../types.js';

import type { SvgRendererProps } from './svg_renderer.js';
import { SvgRenderer } from './svg_renderer.js';

export interface SvgEditorProps
  extends SvgRendererProps,
    BaseEditorProps<Molecule> {}

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
  const {
    molecule,
    onChange,
    atomHighlightStrategy = 'editor-state',
    atomHighlight: atomHighlightProp,
    ...svgProps
  } = props;
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const [atomHighlight, setAtomHighlight] = useState<number>(-1);
  const atomsHighlight = useMemo(() => {
    switch (atomHighlightStrategy) {
      case 'prefer-editor-state':
        if (atomHighlight !== -1) return [atomHighlight];
        return atomHighlightProp;
      case 'prefer-editor-props':
        if (atomHighlightProp && atomHighlightProp.length > 0) {
          return atomHighlightProp;
        }
        if (atomHighlight === -1) return undefined;
        return [atomHighlight];
      case 'editor-props':
        return atomHighlightProp;
      case 'merge': {
        if (!atomHighlightProp) {
          if (atomHighlight === -1) return undefined;
          return [atomHighlight];
        }
        const dedupe = new Set(atomHighlightProp);
        dedupe.add(atomHighlight);
        return Array.from(dedupe);
      }
      case 'editor-state':
        if (atomHighlight === -1) return undefined;
        return [atomHighlight];
      default:
        throw new Error(
          `Unknown atomHighlightStrategy: ${atomHighlightStrategy as string}`,
        );
    }
  }, [atomHighlight, atomHighlightProp, atomHighlightStrategy]);

  const atomRef = useRef(atomHighlight);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    atomRef.current = atomHighlight;
    onChangeRef.current = onChange;
  });
  useEffect(() => {
    if (state.mode !== 'view') return;

    function onClean(event: KeyboardEvent) {
      if (event.key !== 'Backspace' && event.key !== 'Delete') return;
      if (atomRef.current === -1) return;

      const atomId = atomRef.current;
      const newMolecule = molecule.getCompactCopy();

      newMolecule.setAtomCustomLabel(atomId, null);
      onChangeRef.current(newMolecule);
    }

    function onQuickNumbering(event: KeyboardEvent) {
      if (event.code !== 'Quote') return;
      if (atomRef.current === -1) return;

      const atomId = atomRef.current;
      const newMolecule = molecule.getCompactCopy();

      const labels: string[] = [];
      for (let atomId = 0; atomId < newMolecule.getAllAtoms(); atomId++) {
        let label = newMolecule.getAtomCustomLabel(atomId) || '';
        label = label.replaceAll(']', '');
        if (!label) continue;

        labels.push(label);
      }
      labels.sort((a, b) => {
        // 1st priority: digit only
        const aDigitOnly = /\^d+$/.test(a);
        const bDigitOnly = /\^d+$/.test(b);
        if (aDigitOnly && !bDigitOnly) return -1;
        if (bDigitOnly && !aDigitOnly) return 1;

        // 2nd priority: start with a digit
        const aStartDigit = /\^\d/.test(a);
        const bStartDigit = /\^\d/.test(a);
        if (aStartDigit && !bStartDigit) return -1;
        if (bStartDigit && !aStartDigit) return 1;

        // 3rd priority: have a digit
        const aDigit = /\d/.test(a);
        const bDigit = /\d/.test(b);
        if (aDigit && !bDigit) return -1;
        if (bDigit && !aDigit) return 1;

        // 4th priority: no letter
        const aLetter = /[a-zA-Z]/.test(a);
        const bLetter = /[a-zA-Z]/.test(b);
        if (!aLetter && bLetter) return -1;
        if (!bLetter && aLetter) return 1;

        // 5th priority: shorter label
        if (a.length < b.length) return -1;
        if (a.length > b.length) return 1;

        // fallback to lexical order
        const lc = a.localeCompare(b);
        return lc / Math.abs(lc); // normalize to -1, 0, 1
      });

      const lastLabel = labels.at(-1);
      const labelMode = !lastLabel
        ? 'start'
        : /\d/.test(lastLabel)
          ? 'increment_number'
          : /^[a-zA-Z]$/.test(lastLabel)
            ? 'increment_letter'
            : 'start';

      let quickLabel: string | null = null;
      switch (labelMode) {
        case 'start': {
          quickLabel = '1';
          break;
        }
        case 'increment_number': {
          if (!lastLabel) throw new Error('lastLabel falsy, logic error');
          quickLabel = lastLabel.replace(/\d+/, (match) =>
            String(Number.parseInt(match, 10) + 1),
          );
          break;
        }
        case 'increment_letter': {
          if (!lastLabel) throw new Error('lastLabel falsy, logic error');
          let codePoint = lastLabel.codePointAt(0);
          if (!codePoint) throw new Error('codePoint falsy, logic error');
          /* eslint-disable @typescript-eslint/no-non-null-assertion */
          const Z = 'Z'.codePointAt(0)!;
          const a = 'a'.codePointAt(0)!;
          const z = 'z'.codePointAt(0)!;
          /* eslint-enable @typescript-eslint/no-non-null-assertion */
          if (codePoint === Z) codePoint = a - 1; // switch to the lowercase
          if (codePoint === z) break; // we are at the last letter, do nothing

          quickLabel = String.fromCodePoint(codePoint + 1);
          break;
        }
        default:
          break;
      }

      if (!quickLabel) return;
      quickLabel = `]${quickLabel}`;

      newMolecule.setAtomCustomLabel(atomId, quickLabel);
      onChangeRef.current(newMolecule);
    }

    document.addEventListener('keydown', onClean);
    document.addEventListener('keydown', onQuickNumbering);

    return () => {
      document.removeEventListener('keydown', onClean);
      document.removeEventListener('keydown', onQuickNumbering);
    };
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
