import React from 'react';

import SvgRenderer from './SvgRenderer';

export default function SmilesSvgRenderer(props) {
  const { OCL, smiles, ...otherProps } = props;
  const mol = OCL.Molecule.fromSmiles(smiles);
  return <SvgRenderer mol={mol} {...otherProps} />;
}
