import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import SvgRenderer from './SvgRenderer';

export default class IdcodeSvgRenderer extends PureComponent {
  render() {
    let { OCL, idcode, coordinates, ...otherProps } = this.props;
    const mol = OCL.Molecule.fromIDCode(idcode, coordinates);
    return <SvgRenderer mol={mol} {...otherProps} />;
  }
}

IdcodeSvgRenderer.propTypes = {
  idcode: PropTypes.string.isRequired,
  coordinates: PropTypes.string
};
