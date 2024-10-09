import type { ComponentType } from 'react';

import type { ErrorComponentProps } from './types.js';

interface ErrorRendererProps {
  width?: number;
  height?: number;
  value: string;
  error: Error;
  ErrorComponent: ComponentType<ErrorComponentProps>;
}

export function ErrorRenderer(props: ErrorRendererProps) {
  const { width = 300, height = 150, value, error, ErrorComponent } = props;
  return (
    <div style={{ width, height }}>
      <ErrorComponent
        width={width}
        height={height}
        value={value}
        error={error}
      />
    </div>
  );
}

export function DefaultErrorRenderer(props: {
  width: number;
  height: number;
  message: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width={props.width}
      height={props.height}
      viewBox="0 0 300 150"
    >
      <text x="0" y="2" fontSize="15" fill="rgb(255,0,0)">
        {props.message.split(/\r?\n/).map((line, i) => (
          <tspan key={i} x="0" dy={(i + 1) * 10}>
            {line}
          </tspan>
        ))}
      </text>
    </svg>
  );
}
