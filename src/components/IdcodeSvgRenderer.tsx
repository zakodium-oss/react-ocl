import type OCL from 'openchemlib/minimal';
import { memo, type ReactElement } from 'react';

import { useHandleMemoError } from '../hooks/useHandleMemoError.js';

import { DefaultErrorRenderer, ErrorRenderer } from './ErrorRenderer.js';
import SvgRenderer from './SvgRenderer.js';
import type { BaseSvgRendererProps } from './types.js';

export interface IdcodeSvgRendererProps extends BaseSvgRendererProps {
  idcode: string;
  coordinates?: string;
}

export interface BaseIdcodeSvgRendererProps extends IdcodeSvgRendererProps {
  OCL: typeof OCL;
}

function IdcodeSvgRenderer(props: BaseIdcodeSvgRendererProps): ReactElement {
  let {
    OCL,
    idcode,
    coordinates,
    ErrorComponent = DefaultIdcodeErrorComponent,
    ...otherProps
  } = props;
  const [error, mol] = useHandleMemoError(
    () => OCL.Molecule.fromIDCode(idcode, coordinates),
    [OCL, idcode, coordinates],
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
}

export default memo(IdcodeSvgRenderer);

function DefaultIdcodeErrorComponent(props: { width: number; height: number }) {
  return (
    <DefaultErrorRenderer
      width={props.width}
      height={props.height}
      message="Invalid ID code"
    />
  );
}
