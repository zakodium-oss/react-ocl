import type { Molecule } from 'openchemlib';
import type { MouseEvent } from 'react';
import { useEffect, useMemo, useReducer, useState } from 'react';

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
import { AtomLabelEditForm } from './svg_editor.edit_form.tsx';
import type { SvgRendererProps } from './svg_renderer.js';
import { SvgRenderer } from './svg_renderer.js';

export interface SvgEditorProps
  extends SvgRendererProps, BaseEditorProps<Molecule> {}

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
          atomCoords={state.atomCoords}
          onSubmit={onAtomLabelSubmit}
          onCancel={() => dispatch({ type: 'stopEdit' })}
        />
      )}
    </div>
  );
}
