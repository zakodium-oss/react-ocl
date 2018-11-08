import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import SvgRenderer from './SvgRenderer';

export default class MolfileSvgRenderer extends PureComponent {
  render() {
    const { OCL, molfile, ...otherProps } = this.props;
    const mol = OCL.Molecule.fromMolfile(molfile);
    return <SvgRenderer mol={mol} {...otherProps} />;
  }
}

MolfileSvgRenderer.propTypes = {
  molfile: PropTypes.string.isRequired
};
