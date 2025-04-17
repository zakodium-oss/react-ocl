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
