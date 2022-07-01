import OCL from 'openchemlib/full';
import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';

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

    // GWT doesn't play well with the shadow DOM. This hack allows to load an
    // OCL editor inside a shadow root.
    const root = domRef.current.getRootNode();
    let originalGetElementById;
    if (root instanceof ShadowRoot) {
      originalGetElementById = document.getElementById;
      document.getElementById = root.getElementById.bind(root);
    }
    let editor;
    try {
      editor = new OCL.StructureEditor(domRef.current, svgMenu, 1);
    } finally {
      if (root instanceof ShadowRoot) {
        document.getElementById = originalGetElementById;
      }
    }

    editorRef.current = { editor, hadFirstChange: false };
    editor.setMolFile(initialMolfile);
    editor.setFragment(fragment);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height, svgMenu]);

  useEffect(() => {
    callbacksRef.current.onChange = () => {
      if (!editorRef.current.hadFirstChange) {
        editorRef.current.hadFirstChange = true;
      } else if (onChange) {
          const molfile = editorRef.current.editor.getMolFileV3();
          const molecule = editorRef.current.editor.getMolecule();
          onChange(molfile, molecule);
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
    if (editorRef.current.editor) {
      editorRef.current.editor.setFragment(fragment);
    }
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
