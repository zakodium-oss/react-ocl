import React from 'react';

import SvgRenderer from './SvgRenderer';

export default function SmilesSvgRenderer(props) {
  let { OCL, idcode, coordinates, ...otherProps } = props;
  if (typeof idcode === 'object') {
    idcode = idcode.id;
    coordinates = idcode.coordinates;
  }
  const mol = OCL.Molecule.fromIDCode(idcode, coordinates);
  return <SvgRenderer mol={mol} {...otherProps} />;
}
