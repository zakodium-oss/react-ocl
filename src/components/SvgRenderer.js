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

  const reactId = useId().replace(/:/g, '-');
  const internalId = `react-ocl${reactId}`;
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
    return getSVG(mol, width, height, id, serializedOptions);
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

  const svgContent = svgString.substring(
    svgString.indexOf('>') + 1,
    svgString.lastIndexOf('<'),
  );
  const svgHeader = svgString.substring(5, svgString.indexOf('>'));
  const headerProps = Object.fromEntries(
    [...svgHeader.matchAll(/([^=]+)="([^"]*)" ?/g)].map((s) => s.slice(1, 3)),
  );

  return (
    <svg
      style={{ userSelect: 'none' }}
      ref={ref}
      {...headerProps}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: svgContent,
      }}
    />
  );
}

function useEvents(ref, start, onEnter, onLeave, onClick) {
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
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
    const svg = ref.current;
    if (!svg) return;
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

function getSVG(mol, width, height, id, serializedOptions) {
  const options = JSON.parse(serializedOptions);

  const {
    labelFontFamily = 'Arial, Helvetica, sans-serif',
    labelFontSize = 14,
    label,
    ...svgOptions
  } = options;

  let svg = mol.toSVG(width, height, id, svgOptions);

  if (label) {
    const [minX, minY, realWidth, realHeight] = svg
      .match(/viewBox="([^"]*)"/)[1]
      .split(' ')
      .map(Number);
    svg = svg.replace(
      /<\/svg>/,
      `<text font-family="${labelFontFamily}" text-anchor="middle" x="${
        realWidth / 2 + minX
      } " y="${
        realHeight + minY - labelFontSize / 3 // could be improved
      } " font-size="${labelFontSize} ">${label}</text></svg>`,
    );
  }
  return svg;
}
