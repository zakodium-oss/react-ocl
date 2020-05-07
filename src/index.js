import OCL from 'openchemlib/minimal';
import React from 'react';

import BaseIdcodeSvgRenderer from './components/IdcodeSvgRenderer';
import BaseMolfileSvgRenderer from './components/MolfileSvgRenderer';
import BaseSmilesSvgRenderer from './components/SmilesSvgRenderer';

export function SmilesSvgRenderer(props) {
  return <BaseSmilesSvgRenderer OCL={OCL} {...props} />;
}

export function MolfileSvgRenderer(props) {
  return <BaseMolfileSvgRenderer OCL={OCL} {...props} />;
}

export function IdcodeSvgRenderer(props) {
  return <BaseIdcodeSvgRenderer OCL={OCL} {...props} />;
}
