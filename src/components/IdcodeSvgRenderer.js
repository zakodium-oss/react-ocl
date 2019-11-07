import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

import SvgRenderer from './SvgRenderer';

function IdcodeSvgRenderer(props) {
  let { OCL, idcode, coordinates, ...otherProps } = props;
  const mol = useMemo(() => OCL.Molecule.fromIDCode(idcode, coordinates), [
    OCL,
    idcode,
    coordinates,
  ]);
  return <SvgRenderer mol={mol} {...otherProps} />;
}

IdcodeSvgRenderer.propTypes = {
  idcode: PropTypes.string.isRequired,
  coordinates: PropTypes.string,
};

export default memo(IdcodeSvgRenderer);
