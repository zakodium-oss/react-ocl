import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OCL from 'openchemlib/full';

class StructureEditor extends Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.editor = null;
  }

  componentDidMount() {
    const editor = new OCL.StructureEditor(
      this.editorRef.current,
      this.props.svgMenu,
      1
    );
    this.editor = editor;
    editor.setChangeListenerCallback((idCode) => {
      const molfile = editor.getMolFileV3();
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
    this.setValue({});
  }

  componentDidUpdate(prevProps) {
    this.setValue(prevProps);
  }

  setValue(prevProps) {
    if (prevProps.fragment !== this.props.fragment) {
      const isFragment = Boolean(this.props.fragment);
      this.editor.setFragment(isFragment);
    }

    if (prevProps.molfile !== this.props.molfile) {
      const molfile = this.props.molfile;
      this.editor.setMolFile(molfile);
    }
  }

  render() {
    return (
      <div
        ref={this.editorRef}
        style={{ width: this.props.width, height: this.props.height }}
      />
    );
  }
}

StructureEditor.propTypes = {
  molfile: PropTypes.string.isRequired,
  fragment: PropTypes.bool,
  svgMenu: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  onChange: PropTypes.func,
  onAtomEnter: PropTypes.func,
  onAtomLeave: PropTypes.func,
  onBondEnter: PropTypes.func,
  onBondLeave: PropTypes.func
};

StructureEditor.defaultProps = {
  fragment: false,
  width: 675,
  height: 450,
  svgMenu: true
};

export default StructureEditor;
