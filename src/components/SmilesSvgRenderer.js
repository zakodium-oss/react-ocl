import React, { memo } from 'react';

import { useHandleMemoError } from '../hooks/useHandleMemoError';

import { ErrorRenderer, DefaultErrorRenderer } from './ErrorRenderer';
import SvgRenderer from './SvgRenderer';

function SmilesSvgRenderer(props) {
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

export default memo(SmilesSvgRenderer);

function DefaultSmilesErrorComponent(props) {
  return (
    <DefaultErrorRenderer height={props.height} message="Invalid SMILES" />
  );
}
