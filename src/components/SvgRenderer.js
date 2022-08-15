import React, { useRef, useEffect, useMemo, useId } from 'react';

export default function SvgRenderer(props) {
  const {
    width = 300,
    height = 150,
    id: idFromProps,

    atomHighlight,
    atomHighlightOpacity = 0.5,
    atomHighlightColor = 'yellow',
    onAtomEnter,
    onAtomLeave,
    onAtomClick,

    bondHighlight,
    bondHighlightOpacity = 0.5,
    bondHighlightColor = 'yellow',
    onBondEnter,
    onBondLeave,
    onBondClick,

    mol,

    factorTextSize = 1,
    suppressChiralText = true,
    suppressESR = true,
    suppressCIPParity = true,
    noStereoProblem = true,

    ...otherProps
  } = props;

  const internalId = `react-ocl:${useId()}`;
  const ref = useRef(null);

  const id = idFromProps || internalId;

  const toSVGOptions = {
    factorTextSize,
    suppressChiralText,
    suppressESR,
    suppressCIPParity,
    noStereoProblem,
    ...otherProps,
  };
  const serializedOptions = JSON.stringify(toSVGOptions);
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
