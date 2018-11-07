import React from 'react';

import { applyDefaultRendererOptions, getMoleculeFromProps } from '../util';

export default function SvgRenderer(props) {
  const options = applyDefaultRendererOptions(props);
  const mol = getMoleculeFromProps(options);
  if (!mol) {
    throw new Error('Missing molecule');
  }

  const html = { __html: mol.toSVG(options.width, options.height) };

  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={html} />;
}
