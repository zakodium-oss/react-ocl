import type { Molecule } from 'openchemlib';
import type { MouseEvent as ReactMouseEvent, RefObject } from 'react';
import { useEffect, useId, useMemo, useRef } from 'react';

import type { BaseSvgRendererProps } from '../types.js';

export interface SvgRendererProps extends BaseSvgRendererProps {
  molecule: Molecule;
}

export function SvgRenderer(props: SvgRendererProps) {
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

    molecule,

    factorTextSize = 1,
    suppressChiralText = true,
    suppressESR = true,
    suppressCIPParity = true,
    noStereoProblem = true,

    ...otherProps
  } = props;

  // TODO: remove the replacement when React 18 is no longer supported.
  const reactId = useId().replaceAll(':', '-');
  const internalId = `react-ocl${reactId}`;
  const ref = useRef<SVGSVGElement>(null);

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
    return getSVG(molecule, width, height, id, serializedOptions);
  }, [molecule, width, height, id, serializedOptions]);

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

  const svgContent = svgString.slice(
    svgString.indexOf('>') + 1,
    svgString.lastIndexOf('<'),
  );
  const svgHeader = svgString.slice(5, svgString.indexOf('>'));
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

function useEvents(
  ref: RefObject<SVGSVGElement | null>,
  start: string,
  onEnter: BaseSvgRendererProps['onAtomEnter'],
  onLeave: BaseSvgRendererProps['onAtomLeave'],
  onClick: BaseSvgRendererProps['onAtomClick'],
) {
  const handlersRef = useRef({ onEnter, onLeave, onClick });
  useEffect(() => {
    handlersRef.current = { onEnter, onLeave, onClick };
  });

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;

    const handleEnter = (event: MouseEvent) => {
      const { onEnter } = handlersRef.current;
      if (!onEnter) return;
      const target = event.target as SVGElement;
      if (target.classList.contains('event') && target.id.startsWith(start)) {
        // TODO: This is wrong and should be fixed.
        onEnter(
          Number(target.id.replace(start, '')),
          event as unknown as ReactMouseEvent<SVGElement>,
        );
      }
    };
    const handleLeave = (event: MouseEvent) => {
      const { onLeave } = handlersRef.current;
      if (!onLeave) return;
      const target = event.target as SVGElement;
      if (target.classList.contains('event') && target.id.startsWith(start)) {
        // TODO: This is wrong and should be fixed.
        onLeave(
          Number(target.id.replace(start, '')),
          event as unknown as ReactMouseEvent<SVGElement>,
        );
      }
    };
    const handleClick = (event: MouseEvent) => {
      const { onClick } = handlersRef.current;
      if (!onClick) return;
      const target = event.target as SVGElement;
      if (target.classList.contains('event') && target.id.startsWith(start)) {
        // TODO: This is wrong and should be fixed.
        onClick(
          Number(target.id.replace(start, '')),
          event as unknown as ReactMouseEvent<SVGElement>,
        );
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
  }, [ref, start]);
}

function useHighlight(
  ref: RefObject<SVGSVGElement | null>,
  start: string,
  highlight: number[] | undefined,
  highlightColor: string,
  highlightOpacity: number,
  attribute: string,
) {
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const elements = svg.querySelectorAll(`[id^="${start}"]`);
    for (const element of elements) {
      const elementId = Number(element.id.replace(start, ''));
      if (highlight?.includes(elementId)) {
        element.setAttribute('opacity', String(highlightOpacity));
        element.setAttribute(attribute, highlightColor);
      } else {
        element.setAttribute('opacity', '0');
      }
    }
  });
}

function getSVG(
  mol: Molecule,
  width: number,
  height: number,
  id: string,
  serializedOptions: string,
) {
  const options = JSON.parse(serializedOptions);

  const {
    labelFontFamily = 'Arial, Helvetica, sans-serif',
    labelFontSize = 14,
    labelColor = 'rgb(0,0,0)',
    label,
    ...svgOptions
  } = options;

  let svg = mol.toSVG(width, height, id, svgOptions);

  if (label) {
    // @ts-expect-error We know it will match.
    const [minX, minY, realWidth, realHeight] = svg
      .match(/viewBox="([^"]*)"/)[1]
      .split(' ')
      .map(Number);
    svg = svg.replace(
      /<\/svg>/,
      `<text fill="${labelColor}" font-family="${labelFontFamily}" text-anchor="middle" x="${
        realWidth / 2 + minX
      } " y="${
        realHeight + minY - labelFontSize / 3 // could be improved
      } " font-size="${labelFontSize} ">${label}</text></svg>`,
    );
  }
  return svg;
}
