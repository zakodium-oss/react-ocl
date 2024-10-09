import React, { memo } from 'react';

import { useHandleMemoError } from '../hooks/useHandleMemoError';

import { ErrorRenderer, DefaultErrorRenderer } from './ErrorRenderer';
import SvgRenderer from './SvgRenderer';

function IdcodeSvgRenderer(props) {
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

function DefaultIdcodeErrorComponent(props) {
  return (
    <DefaultErrorRenderer height={props.height} message="Invalid ID code" />
  );
}
