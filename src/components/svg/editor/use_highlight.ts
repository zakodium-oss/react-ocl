import { useMemo, useState } from 'react';

import type { BaseEditorProps } from '../../types.js';

export interface UseHighlightOptions {
  atomHighlightStrategy: Exclude<
    BaseEditorProps<unknown>['atomHighlightStrategy'],
    undefined
  >;
  atomHighlight?: number[];
}

/**
 * Hook to manage the highlight of atoms.
 * Get an internal state with `atomHighlight` and `setAtomHighlight`.
 * And a memoized value with `atomsHighlight` following `atomHighlightStrategy` that can be used to pass to the renderer.
 * @param options - Options for the hook.
 * @returns An object with the properties described above.
 */
export function useHighlight(options: UseHighlightOptions) {
  const { atomHighlightStrategy, atomHighlight: atomHighlightProp } = options;

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

  return {
    atomHighlight,
    setAtomHighlight,
    atomsHighlight,
  };
}
