import React from 'react';

export function ErrorRenderer(props) {
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

export function DefaultErrorRenderer(props) {
  return (
    <div
      style={{
        lineHeight: `${props.height}px`,
        textAlign: 'center',
        verticalAlign: 'middle',
      }}
    >
      {props.message}
    </div>
  );
}
