import React from 'react';

const defaultRendererOptions = {
  width: 300,
  height: 150
};

export default function SvgRenderer(props) {
  const options = Object.assign({}, defaultRendererOptions, props);
  const html = { __html: props.mol.toSVG(options.width, options.height) };

  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={html} />;
}
