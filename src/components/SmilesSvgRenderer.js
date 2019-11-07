import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

import SvgRenderer from './SvgRenderer';

function SmilesSvgRenderer(props) {
  const { OCL, smiles, ...otherProps } = props;
  const mol = useMemo(() => OCL.Molecule.fromSmiles(smiles), [OCL, smiles]);
  return <SvgRenderer mol={mol} {...otherProps} />;
}

SmilesSvgRenderer.propTypes = {
  smiles: PropTypes.string.isRequired,
};

export default memo(SmilesSvgRenderer);
