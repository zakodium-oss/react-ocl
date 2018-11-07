import React from 'react';
import OCL from 'openchemlib/minimal';

import SvgRenderer from './components/SvgRenderer';

function MinimalSvgRenderer(props) {
  return <SvgRenderer OCL={OCL} {...props} />;
}

export { MinimalSvgRenderer as SvgRenderer };
