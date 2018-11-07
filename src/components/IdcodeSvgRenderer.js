import React from 'react';

import SvgRenderer from './SvgRenderer';

export default function SmilesSvgRenderer(props) {
  let { OCL, idcode, coordinates, ...otherProps } = props;
  if (typeof idcode === 'object') {
    coordinates = idcode.coordinates;
    idcode = idcode.id;
  }
  const mol = OCL.Molecule.fromIDCode(idcode, coordinates);
  return <SvgRenderer mol={mol} {...otherProps} />;
}
