import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqId from 'lodash.uniqueid';
import OCL from 'openchemlib/full';

const { Molecule } = OCL;

class StructureEditor extends Component {
  constructor(props) {
    super(props);
    this.id = uniqId('ocl_editor_');
    this.current = {};
    this.lastChanged = null;
    this.editor = null;
  }

  componentDidMount() {
    const editor = (this.editor = new OCL.StructureEditor(
      this.getId(),
      this.props.svgMenu,
      1
    ));
    editor.setChangeListenerCallback((idCode) => {
      const molfile = editor.getMolFileV3();
      if (molfile === this.current.molfile) {
        return;
      }
      this.current.molfile = molfile;
      if (this.props.onChange) {
        this.props.onChange({ molfile, idCode });
      }
    });
    editor.setAtomHightlightCallback((atomId, enter) => {
      if (enter && this.props.onAtomEnter) {
        this.props.onAtomEnter(atomId);
      } else if (!enter && this.props.onAtomLeave) {
        this.props.onAtomLeave(atomId);
      }
    });
    editor.setBondHightlightCallback((bondId, enter) => {
      if (enter && this.props.onBondEnter) {
        this.props.onBondEnter(bondId);
      } else if (!enter && this.props.onBondLeave) {
        this.props.onBondLeave(bondId);
      }
    });
    this.setValue();
  }

  componentDidUpdate() {
    this.setValue();
  }

  setValue() {
    const isFragment = Boolean(this.props.fragment);
    if (this.current.isFragment !== isFragment) {
      this.editor.setFragment(isFragment);
    }

    const molfile = this.props.molfile;
    const mol = Molecule.fromMolfile(molfile);
    const molfileV3 = mol.toMolfileV3();
    if (this.current.molfile !== molfileV3) {
      this.editor.setMolFile(molfileV3);
      this.current.molfile = molfileV3;
    }
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

StructureEditor.propTypes = {
  molfile: PropTypes.string.isRequired,
  fragment: PropTypes.bool,
  onAtomEnter: PropTypes.func,
  onAtomLeave: PropTypes.func,
  onBondEnter: PropTypes.func,
  onBondLeave: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  svgMenu: PropTypes.bool
};

StructureEditor.defaultProps = {
  fragment: false,
  width: 675,
  height: 450,
  svgMenu: true
};

export default StructureEditor;
