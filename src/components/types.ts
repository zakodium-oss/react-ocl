import type { MoleculeToSVGOptions } from 'openchemlib';
import type { ComponentType, MouseEvent } from 'react';

export interface ErrorComponentProps {
  width: number;
  height: number;
  value: string;
  error: Error;
}

export interface BaseSvgRendererProps extends MoleculeToSVGOptions {
  width?: number;
  height?: number;
  id?: string;

  ErrorComponent?: ComponentType<ErrorComponentProps>;

  atomHighlight?: number[];
  atomHighlightOpacity?: number;
  atomHighlightColor?: string;
  onAtomEnter?: (atomId: number, event: MouseEvent<SVGElement>) => void;
  onAtomLeave?: (atomId: number, event: MouseEvent<SVGElement>) => void;
  onAtomClick?: (atomId: number, event: MouseEvent<SVGElement>) => void;

  bondHighlight?: number[];
  bondHighlightOpacity?: number;
  bondHighlightColor?: string;
  onBondEnter?: (bondId: number, event: MouseEvent<SVGElement>) => void;
  onBondLeave?: (bondId: number, event: MouseEvent<SVGElement>) => void;
  onBondClick?: (bondId: number, event: MouseEvent<SVGElement>) => void;

  autoCrop?: boolean;
  autoCropMargin?: number;

  labelFontFamily?: string;
  labelFontSize?: number;
  labelColor?: string;
  label?: string;
}

export interface BaseEditorProps<Value> {
  /**
   * @param newValue - Editor must clone the value before modifying it and call fire this event.
   */
  onChange: (newValue: Value) => void;

  /**
   * Strategy to determine which atoms to highlight when hovering and clicking on atoms.
   * - `prefer-editor-state`: the atoms currently hovered in the editor are highlighted,
   *   if none the atoms passed in the `atomHighlight` prop are highlighted
   * - `prefer-editor-props`: the atoms passed in the `atomHighlight` prop,
   *   if none the atom currently hovered in the editor is highlighted
   * - `editor-state`: only the atom currently hovered in the editor is highlighted
   * - `editor-props`: only the atoms passed in the `atomHighlight` prop are highlighted
   * - `merge`: the union of the atoms passed in the `atomHighlight` prop
   * @default prefer-editor-state
   */
  atomHighlightStrategy?:
    | 'prefer-editor-state'
    | 'prefer-editor-props'
    | 'editor-state'
    | 'editor-props'
    | 'merge';
}
