import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';

import { SmilesSvgRenderer } from '../src/index.ts';

export default {
  title: 'Bug/SmilesSvgRenderer',
  component: SmilesSvgRenderer,
} satisfies Meta<typeof SmilesSvgRenderer>;

type Story = StoryObj<typeof SmilesSvgRenderer>;

const possibleSmiles = ['COCO', 'COCOC', 'COCOCO'];

export const SmilesBug: Story = {
  name: 'SMILES bug',
  render: () => {
    const currentSmilesIndex = useRef(0);
    const [smiles, setSmiles] = useState<null | string>(possibleSmiles[0]);
    useEffect(() => {
      let nextChange = 0;
      function handleNextChange() {
        nextChange = setTimeout(() => {
          setSmiles((current) => {
            if (current === null) {
              const index = currentSmilesIndex.current;
              const newIndex = (index + 1) % possibleSmiles.length;
              return possibleSmiles[newIndex];
            } else {
              return null;
            }
          });
          handleNextChange();
        }, 1000);
      }
      handleNextChange();
      return () => clearTimeout(nextChange);
    }, []);
    return (
      <div style={{ height: '100vh' }}>
        <OtherSvg />
        {smiles ? (
          <SmilesSvgRenderer smiles={smiles} width={600} height={400} />
        ) : null}
      </div>
    );
  },
};

function OtherSvg() {
  return (
    <svg
      className="absolute top-0 left-0 overflow-visible"
      style={{ overflow: 'visible' }}
      width="703.5"
      height="481.5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(40, 60)">
        <g>
          <text
            fontSize="12"
            textAnchor="middle"
            x="-25"
            y="180.75"
            transform="rotate(-90 -25 180.75)"
          >
            <tspan>Intensity (-) x10</tspan>
            <tspan fontSize="10" baselineShift="super">
              9
            </tspan>
          </text>
          <line y2="361.5" stroke="black" />
        </g>
      </g>
    </svg>
  );
}
