import { IMoleculeToSVGOptions, Molecule } from 'openchemlib';

// Minimal and core APIs

export interface IBaseSvgRendererProps extends IMoleculeToSVGOptions {
  width?: number;
  height?: number;
  id?: string;

  atomHighlight?: number[];
  atomHighlightOpacity?: number;
  atomHighlightColor?: string;
  onAtomEnter?: (atomId: number) => void;
  onAtomLeave?: (atomId: number) => void;
  onAtomClick?: (atomId: number) => void;

  bondHighlight?: number[];
  bondHighlightOpacity?: number;
  bondHighlightColor?: string;
  onBondEnter?: (bondId: number) => void;
  onBondLeave?: (bondId: number) => void;
  onBondClick?: (bondId: number) => void;
}

export interface ISmilesSvgRendererProps extends IBaseSvgRendererProps {
  smiles: string;
}
export function SmilesSvgRenderer(props: ISmilesSvgRendererProps): JSX.Element;

export interface IMolfileSvgRendererProps extends IBaseSvgRendererProps {
  molfile: string;
}
export function MolfileSvgRenderer(
  props: IMolfileSvgRendererProps
): JSX.Element;

export interface IIdcodeSvgRendererSvgRendererProps
  extends IBaseSvgRendererProps {
  idcode: string;
  coordinates?: string;
}
export function IdcodeSvgRenderer(props: IMolfileSvgRendererProps): JSX.Element;

// Full API

export interface IStructureEditorProps {
  width?: number;
  height?: number;
  initialMolfile?: string;
  fragment?: boolean;
  svgMenu?: boolean;
  onChange?: (molfile: string, molecule: Molecule) => void;
  onAtomEnter?: (atomId: number) => void;
  onAtomLeave?: (atomId: number) => void;
  onBondEnter?: (bondId: number) => void;
  onBondLeave?: (bondId: number) => void;
}
export function StructureEditor(props: IStructureEditorProps): JSX.Element;
