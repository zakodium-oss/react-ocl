import React, { useRef, useEffect, useState } from 'react';
import propTypes from 'prop-types';

const idPrefix = 'react-ocl:';
let currentId = 0;

export default function SvgRenderer(props) {
  const [internalId] = useState(() => idPrefix + currentId++);
  const ref = useRef(null);
  const id = props.id || internalId;
  const svgString = props.mol.toSVG(props.width, props.height, id, props);

  const { highlight, highlightOpacity, highlightColor } = props;

  useEffect(() => {
    const div = ref.current;
    const svg = div.firstChild;
    const start = `${id}:Atom:`;
    const atoms = svg.querySelectorAll(`[id^="${start}"]`);
    for (const atom of atoms) {
      const atomNumber = atom.id.replace(start, '');
      if (highlight && highlight.includes(atomNumber)) {
        atom.setAttribute('fill-opacity', highlightOpacity);
        atom.setAttribute('fill', highlightColor);
      } else {
        atom.setAttribute('fill-opacity', 0);
      }
    }
  });

  return (
    <div
      ref={ref}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: svgString
      }}
    />
  );
}

SvgRenderer.propTypes = {
  width: propTypes.number,
  height: propTypes.number,
  id: propTypes.string,
  highlight: propTypes.arrayOf(propTypes.string),
  highlightColor: propTypes.string,
  highlightOpacity: propTypes.number,
  factorTextSize: propTypes.number,
  fontWeight: propTypes.string,
  strokeWidth: propTypes.oneOf([propTypes.string, propTypes.number]),
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
  highlightColor: 'yellow',
  highlightOpacity: 0.5,
  suppressChiralText: true,
  suppressESR: true,
  suppressCIPParity: true,
  noStereoProblem: true,
  factorTextSize: 1,
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
