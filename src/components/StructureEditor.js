import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import OCL from 'openchemlib/full';

function StructureEditor(props) {
  const {
    width,
    height,
    initialMolfile,
    fragment,
    svgMenu,
    onChange,
    onAtomEnter,
    onAtomLeave,
    onBondEnter,
    onBondLeave,
  } = props;

  const domRef = useRef();
  const editorRef = useRef({ editor: null, hadFirstChange: false });
  const callbacksRef = useRef({});

  useEffect(() => {
    domRef.current.innerHTML = '';
    const editor = new OCL.StructureEditor(domRef.current, svgMenu, 1);
    editorRef.current = { editor, hadFirstChange: false };
    editor.setMolFile(initialMolfile);
    editor.setChangeListenerCallback((...args) => {
      if (callbacksRef.current.onChange) {
        callbacksRef.current.onChange(...args);
      }
    });
    editor.setAtomHightlightCallback((...args) => {
      if (callbacksRef.current.onAtomHighlight) {
        callbacksRef.current.onAtomHighlight(...args);
      }
    });
    editor.setBondHightlightCallback((...args) => {
      if (callbacksRef.current.onBondHighlight) {
        callbacksRef.current.onBondHighlight(...args);
      }
    });
  }, [width, height, svgMenu]);

  useEffect(() => {
    callbacksRef.current.onChange = () => {
      if (!editorRef.current.hadFirstChange) {
        editorRef.current.hadFirstChange = true;
      } else {
        if (onChange) {
          const molfile = editorRef.current.editor.getMolFileV3();
          const molecule = editorRef.current.editor.getMolecule();
          onChange(molfile, molecule);
        }
      }
    };
    callbacksRef.current.onAtomHighlight = (atomId, enter) => {
      if (enter && onAtomEnter) {
        onAtomEnter(atomId);
      } else if (!enter && onAtomLeave) {
        onAtomLeave(atomId);
      }
    };
    callbacksRef.current.onBondHighlight = (bondId, enter) => {
      if (enter && onBondEnter) {
        onBondEnter(bondId);
      } else if (!enter && onBondLeave) {
        onBondLeave(bondId);
      }
    };
  }, [onChange, onAtomEnter, onAtomLeave, onBondEnter, onBondLeave]);

  useEffect(() => {
    editorRef.current.editor.setFragment(fragment);
  }, [fragment]);

  return <div ref={domRef} style={{ width, height }} />;
}

StructureEditor.propTypes = {
  initialMolfile: PropTypes.string,
  fragment: PropTypes.bool,
  svgMenu: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  onChange: PropTypes.func,
  onAtomEnter: PropTypes.func,
  onAtomLeave: PropTypes.func,
  onBondEnter: PropTypes.func,
  onBondLeave: PropTypes.func,
};

StructureEditor.defaultProps = {
  initialMolfile: '',
  fragment: false,
  svgMenu: true,
  width: 675,
  height: 450,
};

export default StructureEditor;
