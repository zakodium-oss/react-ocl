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
    const { StructureEditor } = this.props.OCL;
    this.editor = new StructureEditor(this.getId(), this.props.svgMenu, 1);
    this.editor.setChangeListenerCallback((idcode) => {
      const molecule = getMoleculeFromProps(this.props);
      let initialIdcode;
      if (molecule) {
        initialIdcode = idAndCoordinatesToString(
          molecule.getIDCodeAndCoordinates()
        );
      } else {
        initialIdcode = 'd@';
      }

      if (idcode.split(' ')[0] !== initialIdcode.split(' ')[0]) {
        this.setIDCode();
        return;
      }
      if (!this.hasReceivedFirstChange) {
        this.hasReceivedFirstChange = true;
        return;
      }
      if (this.props.onChange) {
        this.props.onChange(stringToIdAndCoordinates(idcode));
      }
    });
    this.editor.setAtomHightlightCallback((atomId, enter) => {
      if (enter && this.props.onAtomEnter) {
        this.props.onAtomEnter(atomId);
      } else if (!enter && this.props.onAtomLeave) {
        this.props.onAtomLeave(atomId);
      }
    });
    this.editor.setBondHightlightCallback((bondId, enter) => {
      if (enter && this.props.onBondEnter) {
        this.props.onBondEnter(bondId);
      } else if (!enter && this.props.onBondLeave) {
        this.props.onBondLeave(bondId);
      }
    });
    this.setIDCode();
    this.setFragment();
  }

  shouldComponentUpdate(nextProps) {
    this.toUpdate = {
      fragment: false,
      mol: false
    };
    let shouldUpdate = false;
    if (nextProps.fragment !== this.props.fragment) {
      this.toUpdate.fragment = shouldUpdate = true;
    }
    const newMolecule = getMoleculeFromProps(nextProps);
    const currentMolecule = this.props.OCL.Molecule.fromIDCode(
      this.editor.getIDCode()
    );
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
    const molecule = getMoleculeFromProps(this.props);
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

  getId() {
    return this.props.id ? `ocl_editor_${this.props.id}` : this.id;
  }

  render() {
    return (
      <div
        id={this.getId()}
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
