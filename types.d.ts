import { IMoleculeToSVGOptions, Molecule } from 'openchemlib/minimal';
import { ComponentType, MouseEvent } from 'react';

// Minimal and core APIs

export interface IErrorComponentProps {
  value: string;
  error: Error;
}

export interface IBaseSvgRendererProps extends IMoleculeToSVGOptions {
  width?: number;
  height?: number;
  id?: string;

  ErrorComponent?: ComponentType<IErrorComponentProps>;

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
}

export interface ISmilesSvgRendererProps extends IBaseSvgRendererProps {
  smiles: string;
}
export function SmilesSvgRenderer(props: ISmilesSvgRendererProps): JSX.Element;

export interface IMolfileSvgRendererProps extends IBaseSvgRendererProps {
  molfile: string;
}
export function MolfileSvgRenderer(
  props: IMolfileSvgRendererProps,
): JSX.Element;

export interface IIdcodeSvgRendererProps extends IBaseSvgRendererProps {
  idcode: string;
  coordinates?: string;
}
export function IdcodeSvgRenderer(props: IIdcodeSvgRendererProps): JSX.Element;

// Full API

export interface IStructureEditorProps {
  width?: number;
  height?: number;
  initialMolfile?: string;
  initialIDCode?: string;
  fragment?: boolean;
  svgMenu?: boolean;
  onChange?: (molfile: string, molecule: Molecule, idCode: string) => void;
  onAtomEnter?: (atomId: number) => void;
  onAtomLeave?: (atomId: number) => void;
  onBondEnter?: (bondId: number) => void;
  onBondLeave?: (bondId: number) => void;
}
export function StructureEditor(props: IStructureEditorProps): JSX.Element;
