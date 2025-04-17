import { Molecule } from 'openchemlib';
import type { ReactElement } from 'react';
import { memo } from 'react';

import { useHandleMemoError } from '../hooks/use_handle_memo_error.js';

import { DefaultErrorRenderer, ErrorRenderer } from './error_renderer.js';
import SvgRenderer from './svg_renderer.js';
import type { BaseSvgRendererProps } from './types.js';

export interface IdcodeSvgRendererProps extends BaseSvgRendererProps {
  idcode: string;
  coordinates?: string;
}

export const IdcodeSvgRenderer = memo(function IdcodeSvgRenderer(
  props: IdcodeSvgRendererProps,
): ReactElement {
  const {
    idcode,
    coordinates,
    ErrorComponent = DefaultIdcodeErrorComponent,
    ...otherProps
  } = props;
  const [error, mol] = useHandleMemoError(
    () => Molecule.fromIDCode(idcode, coordinates),
    [idcode, coordinates],
  );
  if (error) {
    return (
      <ErrorRenderer
        width={props.width}
        height={props.height}
        ErrorComponent={ErrorComponent}
        value={idcode}
        error={error}
      />
    );
  }
  return <SvgRenderer mol={mol} {...otherProps} />;
});

function DefaultIdcodeErrorComponent(props: { width: number; height: number }) {
  return (
    <DefaultErrorRenderer
      width={props.width}
      height={props.height}
      message="Invalid ID code"
    />
  );
}
