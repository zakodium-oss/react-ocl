import React from 'react';
import propTypes from 'prop-types';

export default function SvgRenderer(props) {
  const html = {
    __html: props.mol.toSVG(props.width, props.height, props.id, props)
  };

  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={html} />;
}

SvgRenderer.propTypes = {
  width: propTypes.number,
  height: propTypes.number,
  id: propTypes.string,
  factorTextSize: propTypes.number,
  fontWeight: propTypes.string,
  strokeWidth: propTypes.string,
  inflateToMaxAVBL: propTypes.bool,
  inflateToHighResAVBL: propTypes.bool,
  chiralTextBelowMolecule: propTypes.bool,
  chiralTextAboveMolecule: propTypes.bool,
  chiralTextOnFrameTop: propTypes.bool,
  chiralTextOnFrameBottom: propTypes.bool,
  noTabus: propTypes.bool,
  showAtomNumber: propTypes.bool,
  showBondNumber: propTypes.bool,
  highlightQueryFeatures: propTypes.bool,
  showMapping: propTypes.bool,
  suppressChiralText: propTypes.bool,
  suppressCIPParity: propTypes.bool,
  suppressESR: propTypes.bool,
  showSymmetrySimple: propTypes.bool,
  showSymmetryDiastereotopic: propTypes.bool,
  showSymmetryEnantiotopic: propTypes.bool,
  noImplicitAtomLabelColors: propTypes.bool,
  noStereoProblem: propTypes.bool
};

SvgRenderer.defaultProps = {
  width: 300,
  height: 150,
  suppressChiralText: true,
  suppressESR: true,
  suppressCIPParity: true,
  noStereoProblem: true,
  factorTextSize: false,
  fontWeight: false,
  strokeWidth: false,
  inflateToMaxAVBL: false,
  inflateToHighResAVBL: false,
  chiralTextBelowMolecule: false,
  chiralTextAboveMolecule: false,
  chiralTextOnFrameTop: false,
  chiralTextOnFrameBottom: false,
  noTabus: false,
  showAtomNumber: false,
  showBondNumber: false,
  highlightQueryFeatures: false,
  showMapping: false,
  showSymmetrySimple: false,
  showSymmetryDiastereotopic: false,
  showSymmetryEnantiotopic: false,
  noImplicitAtomLabelColors: false
};
