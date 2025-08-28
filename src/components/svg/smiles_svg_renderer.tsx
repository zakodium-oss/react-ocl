import { Molecule } from 'openchemlib';
import type { ReactElement } from 'react';
import { memo } from 'react';

import { useHandleMemoError } from '../../hooks/use_handle_memo_error.js';
import type { BaseSvgRendererProps } from '../types.js';

import { DefaultErrorRenderer, ErrorRenderer } from './error_renderer.js';
import { SvgRenderer } from './svg_renderer.js';

export interface SmilesSvgRendererProps extends BaseSvgRendererProps {
  smiles: string;
}

export const SmilesSvgRenderer = memo(function SmilesSvgRenderer(
  props: SmilesSvgRendererProps,
): ReactElement {
  const {
    smiles,
    ErrorComponent = DefaultSmilesErrorComponent,
    ...otherProps
  } = props;
  const [error, mol] = useHandleMemoError(
    () => Molecule.fromSmiles(smiles),
    [smiles],
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
  return <SvgRenderer molecule={mol} {...otherProps} />;
});

function DefaultSmilesErrorComponent(props: { width: number; height: number }) {
  return (
    <DefaultErrorRenderer
      width={props.width}
      height={props.height}
      message="Invalid SMILES"
    />
  );
}
