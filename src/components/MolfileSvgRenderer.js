import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

import SvgRenderer from './SvgRenderer';

function MolfileSvgRenderer(props) {
  const { OCL, molfile, ...otherProps } = props;
  const mol = useMemo(() => OCL.Molecule.fromMolfile(molfile), [OCL, molfile]);
  return <SvgRenderer mol={mol} {...otherProps} />;
}

MolfileSvgRenderer.propTypes = {
  molfile: PropTypes.string.isRequired
};

export default memo(MolfileSvgRenderer);
