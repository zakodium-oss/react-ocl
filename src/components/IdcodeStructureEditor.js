import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqId from 'lodash.uniqueid';
import OCL from 'openchemlib/full';

const { Molecule, StructureEditor } = OCL;

class IdcodeStructureEditor extends Component {
  constructor(props) {
    super(props);
    this.id = uniqId('ocl_editor_');
    this.inputIdcode = null;
    this.lastChanged = null;
    this.editor = null;
  }

  componentDidMount() {
    this.editor = new StructureEditor(this.getId(), this.props.svgMenu, 1);
    this.editor.setChangeListenerCallback((idcodeAndCoordinates) => {
      const [idcode, coordinates] = idcodeAndCoordinates.split(' ');
      if (idcode === this.lastChanged) return;
      this.lastChanged = idcode;
      this.setIDCode();
      if (this.props.onChange && idcode !== this.inputIdcode) {
        this.props.onChange({ idcode, coordinates });
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
  }

  componentDidUpdate() {
    this.setIDCode();
  }

  setIDCode() {
    const molecule = getMoleculeFromProps(this.props);
    if (molecule) {
      const str = idAndCoordinatesToString(molecule.getIDCodeAndCoordinates());
      this.inputIdcode = molecule.getIDCode();
      this.editor.setIDCode(str);
    } else {
      this.inputIdcode = 'd@';
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

IdcodeStructureEditor.propTypes = {
  idcode: PropTypes.string.isRequired,
  onAtomEnter: PropTypes.func,
  onAtomLeave: PropTypes.func,
  onBondEnter: PropTypes.func,
  onBondLeave: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  svgMenu: PropTypes.bool
};

IdcodeStructureEditor.defaultProps = {
  width: 675,
  height: 450,
  svgMenu: true
};

export default IdcodeStructureEditor;

function getMoleculeFromProps(props) {
  let mol = null;
  if (props.idcode && props.coordinates) {
    mol = Molecule.fromIDCode(props.idcode, props.coordinates);
  } else if (props.idcode) {
    mol = Molecule.fromIDCode(props.idcode);
  }
  return mol;
}

function idAndCoordinatesToString(idAndCoordinates) {
  if (idAndCoordinates.coordinates) {
    return `${idAndCoordinates.idCode} ${idAndCoordinates.coordinates}`;
  } else {
    return idAndCoordinates.idCode;
  }
}

function stringToIdAndCoordinates(string) {
  if (!string) return string;
  const split = string.split(' ');
  return {
    idcode: split[0],
    coordinates: split[1]
  };
}
