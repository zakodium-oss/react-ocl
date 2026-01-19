import type { MouseEvent } from 'react';

export type State =
  | { mode: 'view' }
  | {
      mode: 'atom-label-edit';
      atomId: number;
      atomCoords: { x: number; y: number };
    };

export type Action =
  | {
      type: 'startEdit';
      atomId: number;
      event: MouseEvent;
    }
  | { type: 'stopEdit' };

/**
 * Reducer for the editor state.
 * @param state - The current state.
 * @param action - The action to perform.
 * @returns The new state.
 */
export function stateReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'startEdit': {
      // Ignore if we are already in edit mode
      if (state.mode !== 'view') return state;

      const { clientX, clientY } = action.event;
      const target = action.event.target as SVGCircleElement;
      const svg = target.closest('svg') as SVGElement;
      const rect = svg.getBoundingClientRect();
      const atomCoords = {
        x: clientX - rect.x,
        y: clientY - rect.y,
      };
      return { mode: 'atom-label-edit', atomId: action.atomId, atomCoords };
    }
    case 'stopEdit':
      return { mode: 'view' };
    default:
      // @ts-expect-error action type narrowing
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
