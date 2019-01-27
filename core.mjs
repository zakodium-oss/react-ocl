import React from 'react';
import OCL from 'openchemlib/core';

import BaseSmilesSvgRenderer from './lib/components/SmilesSvgRenderer';
import BaseMolfileSvgRenderer from './lib/components/MolfileSvgRenderer';
import BaseIdcodeSvgRenderer from './lib/components/IdcodeSvgRenderer';

export function SmilesSvgRenderer(props) {
  return React.createElement(BaseSmilesSvgRenderer, { OCL, ...props });
}

export function MolfileSvgRenderer(props) {
  return React.createElement(BaseMolfileSvgRenderer, { OCL, ...props });
}

export function IdcodeSvgRenderer(props) {
  return React.createElement(BaseIdcodeSvgRenderer, { OCL, ...props });
}
