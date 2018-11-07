import React from 'react';
import OCL from 'openchemlib/minimal';

import SmilesSvgRenderer from './components/SmilesSvgRenderer';

function MinimalSmilesSvgRenderer(props) {
  return <SmilesSvgRenderer OCL={OCL} {...props} />;
}

export { MinimalSmilesSvgRenderer as SmilesSvgRenderer };
