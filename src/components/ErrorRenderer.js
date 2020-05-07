import React from 'react';

export function ErrorRenderer(props) {
  const { width, height, value, error, ErrorComponent } = props;
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

ErrorRenderer.defaultProps = {
  width: 300,
  height: 150,
};

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
