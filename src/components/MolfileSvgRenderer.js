import React from 'react';

import SvgRenderer from './SvgRenderer';

export default function MolfileSvgRenderer(props) {
  const { OCL, molfile, ...otherProps } = props;
  const mol = OCL.Molecule.fromMolfile(molfile);
  return <SvgRenderer mol={mol} {...otherProps} />;
}
