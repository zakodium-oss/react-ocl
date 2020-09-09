import {
  IIdcodeSvgRendererProps as IdcodeProps,
  IMolfileSvgRendererProps as MolfileProps,
  ISmilesSvgRendererProps as SmilesProps,
} from './types';

export interface IIdcodeSvgRendererProps extends IdcodeProps {
  OCL: any;
}
export function IdcodeSvgRenderer(
  props: IIdcodeSvgRendererProps,
): JSX.Element;

export interface IMolfileSvgRendererProps extends MolfileProps {
  OCL: any;
}
export function MolfileSvgRenderer(
  props: IMolfileSvgRendererProps,
): JSX.Element;

export interface ISmilesSvgRendererProps extends SmilesProps {
  OCL: any;
}
export function SmilesSvgRenderer(props: ISmilesSvgRendererProps): JSX.Element;
