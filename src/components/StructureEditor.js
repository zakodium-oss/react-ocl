import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqId from 'lodash.uniqueid';

import {
  getMoleculeFromProps,
  idAndCoordinatesToString,
  stringToIdAndCoordinates
} from '../util';

class StructureEditor extends Component {
  constructor(props) {
    super(props);
    this.id = uniqId('ocl_editor_');
    this.editor = null;
    this.hasReceivedFirstChange = false;
  }

  componentDidMount() {
    this.editor = new this.props.OCL.StructureEditor(
      this.id,
      this.props.svgMenu,
      1
    );
    this.editor.setChangeListenerCallback((idcode) => {
      if (!this.hasReceivedFirstChange) {
        this.hasReceivedFirstChange = true;
        return;
      }
      if (this.props.onChange) {
        this.props.onChange(stringToIdAndCoordinates(idcode));
      }
    });
    this.editor.setAtomHightlightCallback((...args) => {
      if (this.props.onAtomHighlight) {
        this.props.onAtomHighlight(...args);
      }
    });
    this.editor.setBondHightlightCallback((...args) => {
      if (this.props.onBondHighlight) {
        this.props.onBondHighlight(...args);
      }
    });
    this.setIDCode();
    this.setFragment();
  }

  shouldComponentUpdate(nextProps) {
    const { Molecule } = this.props.OCL;
    this.toUpdate = {
      fragment: false,
      mol: false
    };
    let shouldUpdate = false;
    if (nextProps.fragment !== this.props.fragment) {
      this.toUpdate.fragment = shouldUpdate = true;
    }
    const newMolecule = getMoleculeFromProps(nextProps, Molecule);
    const currentMolecule = Molecule.fromIDCode(this.editor.getIDCode());
    if (newMolecule.getIDCode() !== currentMolecule.getIDCode()) {
      this.toUpdate.mol = shouldUpdate = true;
    }
    return shouldUpdate;
  }

  componentDidUpdate() {
    if (this.toUpdate.mol) {
      this.setIDCode();
    }
    if (this.toUpdate.fragment) {
      this.setFragment();
    }
  }

  setIDCode() {
    const molecule = getMoleculeFromProps(this.props, this.props.OCL.Molecule);
    if (molecule) {
      this.editor.setIDCode(
        idAndCoordinatesToString(molecule.getIDCodeAndCoordinates())
      );
    } else {
      this.editor.setIDCode('d@');
    }
  }

  setFragment() {
    this.editor.setFragment(!!this.props.fragment);
  }

  render() {
    return (
      <div
        id={this.id}
        style={{ width: this.props.width, height: this.props.height }}
      />
    );
  }
}

StructureEditor.displayName = 'OCLStructureEditor';

StructureEditor.propTypes = {
  oclid: PropTypes.any.isRequired,
  onAtomHighlight: PropTypes.func,
  onBondHighlight: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  svgMenu: PropTypes.bool
};

StructureEditor.defaultProps = {
  width: 675,
  height: 450,
  svgMenu: true
};

export default StructureEditor;
