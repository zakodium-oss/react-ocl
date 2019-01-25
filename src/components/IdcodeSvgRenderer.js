import React, { memo } from 'react';
import PropTypes from 'prop-types';

import SvgRenderer from './SvgRenderer';

function IdcodeSvgRenderer(props) {
  let { OCL, idcode, coordinates, ...otherProps } = props;
  const mol = OCL.Molecule.fromIDCode(idcode, coordinates);
  return <SvgRenderer mol={mol} {...otherProps} />;
}

IdcodeSvgRenderer.propTypes = {
  idcode: PropTypes.string.isRequired,
  coordinates: PropTypes.string
};

export default memo(IdcodeSvgRenderer);
