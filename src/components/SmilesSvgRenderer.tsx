import type OCL from 'openchemlib/minimal';
import { memo, type ReactElement } from 'react';

import { useHandleMemoError } from '../hooks/useHandleMemoError.js';

import { DefaultErrorRenderer, ErrorRenderer } from './ErrorRenderer.js';
import SvgRenderer from './SvgRenderer.js';
import type { BaseSvgRendererProps } from './types.js';

export interface SmilesSvgRendererProps extends BaseSvgRendererProps {
  smiles: string;
}

export interface BaseSmilesSvgRendererProps extends SmilesSvgRendererProps {
  OCL: typeof OCL;
}

function BaseSmilesSvgRenderer(
  props: BaseSmilesSvgRendererProps,
): ReactElement {
  const {
    OCL,
    smiles,
    ErrorComponent = DefaultSmilesErrorComponent,
    ...otherProps
  } = props;
  const [error, mol] = useHandleMemoError(
    () => OCL.Molecule.fromSmiles(smiles),
    [OCL, smiles],
  );
  if (error) {
    return (
      <ErrorRenderer
        width={props.width}
        height={props.height}
        ErrorComponent={ErrorComponent}
        value={smiles}
        error={error}
      />
    );
  }
  return <SvgRenderer mol={mol} {...otherProps} />;
}

export default memo(BaseSmilesSvgRenderer);

function DefaultSmilesErrorComponent(props: { width: number; height: number }) {
  return (
    <DefaultErrorRenderer
      width={props.width}
      height={props.height}
      message="Invalid SMILES"
    />
  );
}
