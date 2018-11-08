import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import SvgRenderer from './SvgRenderer';

export default class SmilesSvgRenderer extends PureComponent {
  render() {
    const { OCL, smiles, ...otherProps } = this.props;
    const mol = OCL.Molecule.fromSmiles(smiles);
    return <SvgRenderer mol={mol} {...otherProps} />;
  }
}

SmilesSvgRenderer.propTypes = {
  smiles: PropTypes.string.isRequired
};
