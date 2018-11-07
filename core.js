import React from 'react';
import OCL from 'openchemlib/core';

import SvgRenderer from './src/components/SvgRenderer';

function CoreSvgRenderer(props) {
  return <SvgRenderer OCL={OCL} {...props} />;
}

export { CoreSvgRenderer as SvgRenderer };
