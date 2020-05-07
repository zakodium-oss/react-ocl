import PropTypes from 'prop-types';
import React, { memo } from 'react';

import { useHandleMemoError } from '../hooks/useHandleMemoError';

import { ErrorRenderer, DefaultErrorRenderer } from './ErrorRenderer';
import SvgRenderer from './SvgRenderer';

function SmilesSvgRenderer(props) {
  const { OCL, smiles, ...otherProps } = props;
  const [error, mol] = useHandleMemoError(
    () => OCL.Molecule.fromSmiles(smiles),
    [OCL, smiles],
  );
  if (error) {
    return (
      <ErrorRenderer
        width={props.width}
        height={props.height}
        ErrorComponent={props.ErrorComponent}
        value={smiles}
        error={error}
      />
    );
  }
  return <SvgRenderer mol={mol} {...otherProps} />;
}

SmilesSvgRenderer.propTypes = {
  smiles: PropTypes.string.isRequired,
  ErrorComponent: PropTypes.elementType,
};

SmilesSvgRenderer.defaultProps = {
  ErrorComponent: DefaultSmilesErrorComponent,
};

export default memo(SmilesSvgRenderer);

function DefaultSmilesErrorComponent(props) {
  return (
    <DefaultErrorRenderer height={props.height} message="Invalid SMILES" />
  );
}
