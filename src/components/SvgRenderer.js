import propTypes from 'prop-types';
import React, { useRef, useEffect, useState, useMemo } from 'react';

const idPrefix = 'react-ocl-';
let currentId = 0;

export default function SvgRenderer(props) {
  const {
    width,
    height,
    id: idFromProps,

    atomHighlight,
    atomHighlightOpacity,
    atomHighlightColor,
    onAtomEnter,
    onAtomLeave,
    onAtomClick,

    bondHighlight,
    bondHighlightOpacity,
    bondHighlightColor,
    onBondEnter,
    onBondLeave,
    onBondClick,

    mol,
    ...otherProps
  } = props;

  const [internalId] = useState(() => idPrefix + currentId++);
  const ref = useRef(null);

  const id = idFromProps || internalId;

  const serializedOptions = JSON.stringify(otherProps);
  const svgString = useMemo(() => {
    return mol.toSVG(width, height, id, JSON.parse(serializedOptions));
  }, [mol, width, height, id, serializedOptions]);

  const atomStart = `${id}:Atom:`;
  const bondStart = `${id}:Bond:`;

  useEvents(ref, atomStart, onAtomEnter, onAtomLeave, onAtomClick);
  useEvents(ref, bondStart, onBondEnter, onBondLeave, onBondClick);

  useHighlight(
    ref,
    atomStart,
    atomHighlight,
    atomHighlightColor,
    atomHighlightOpacity,
    'fill',
  );

  useHighlight(
    ref,
    bondStart,
    bondHighlight,
    bondHighlightColor,
    bondHighlightOpacity,
    'stroke',
  );

  return (
    <div
      style={{ userSelect: 'none' }}
      ref={ref}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: svgString,
      }}
    />
  );
}

function useEvents(ref, start, onEnter, onLeave, onClick) {
  useEffect(() => {
    const div = ref.current;
    if (!div) return;
    const svg = div.firstChild;
    const handleEnter = (event) => {
      if (!onEnter) return;
      const { target } = event;
      if (target.className.baseVal === 'event' && target.id.startsWith(start)) {
        onEnter(Number(target.id.replace(start, '')), event);
      }
    };
    const handleLeave = (event) => {
      if (!onLeave) return;
      const { target } = event;
      if (target.className.baseVal === 'event' && target.id.startsWith(start)) {
        onLeave(Number(target.id.replace(start, '')), event);
      }
    };
    const handleClick = (event) => {
      if (!onClick) return;
      const { target } = event;
      if (target.className.baseVal === 'event' && target.id.startsWith(start)) {
        onClick(Number(target.id.replace(start, '')), event);
      }
    };
    svg.addEventListener('mouseover', handleEnter);
    svg.addEventListener('mouseout', handleLeave);
    svg.addEventListener('click', handleClick);
    return () => {
      svg.removeEventListener('mouseover', handleEnter);
      svg.removeEventListener('mouseout', handleLeave);
      svg.removeEventListener('click', handleClick);
    };
  }, [ref, start, onEnter, onLeave, onClick]);
}

function useHighlight(
  ref,
  start,
  highlight,
  highlightColor,
  highlightOpacity,
  attribute,
) {
  useEffect(() => {
    const div = ref.current;
    if (!div) return;
    const svg = div.firstChild;
    const elements = svg.querySelectorAll(`[id^="${start}"]`);
    for (const element of elements) {
      const elementId = Number(element.id.replace(start, ''));
      if (highlight && highlight.includes(elementId)) {
        element.setAttribute('opacity', highlightOpacity);
        element.setAttribute(attribute, highlightColor);
      } else {
        element.setAttribute('opacity', 0);
      }
    }
  });
}

SvgRenderer.propTypes = {
  width: propTypes.number,
  height: propTypes.number,
  id: propTypes.string,
  atomHighlight: propTypes.arrayOf(propTypes.number),
  atomHighlightColor: propTypes.string,
  atomHighlightOpacity: propTypes.number,
  bondHighlight: propTypes.arrayOf(propTypes.number),
  bondHighlightColor: propTypes.string,
  bondHighlightOpacity: propTypes.number,
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
  noStereoProblem: propTypes.bool,
};

SvgRenderer.defaultProps = {
  width: 300,
  height: 150,
  atomHighlightColor: 'yellow',
  atomHighlightOpacity: 0.5,
  bondHighlightColor: 'yellow',
  bondHighlightOpacity: 0.5,
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
  noImplicitAtomLabelColors: false,
};
