import PropTypes from 'prop-types';
import React, { memo } from 'react';

import { useHandleMemoError } from '../hooks/useHandleMemoError';

import { ErrorRenderer, DefaultErrorRenderer } from './ErrorRenderer';
import SvgRenderer from './SvgRenderer';

function MolfileSvgRenderer(props) {
  const { OCL, molfile, ...otherProps } = props;
  const [error, mol] = useHandleMemoError(
    () => OCL.Molecule.fromMolfile(molfile),
    [OCL, molfile],
  );
  if (error) {
    return (
      <ErrorRenderer
        width={props.width}
        height={props.height}
        ErrorComponent={props.ErrorComponent}
        value={molfile}
        error={error}
      />
    );
  }
  return <SvgRenderer mol={mol} {...otherProps} />;
}

MolfileSvgRenderer.propTypes = {
  molfile: PropTypes.string.isRequired,
  ErrorComponent: PropTypes.elementType,
};

MolfileSvgRenderer.defaultProps = {
  ErrorComponent: DefaultMolfileErrorComponent,
};

export default memo(MolfileSvgRenderer);

function DefaultMolfileErrorComponent(props) {
  return (
    <DefaultErrorRenderer height={props.height} message="Invalid Molfile" />
  );
}
