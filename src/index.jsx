import OCL from 'openchemlib/minimal';

import BaseIdcodeSvgRenderer from './components/IdcodeSvgRenderer.js';
import BaseMolfileSvgRenderer from './components/MolfileSvgRenderer.js';
import BaseSmilesSvgRenderer from './components/SmilesSvgRenderer.js';

export function SmilesSvgRenderer(props) {
  return <BaseSmilesSvgRenderer OCL={OCL} {...props} />;
}

export function MolfileSvgRenderer(props) {
  return <BaseMolfileSvgRenderer OCL={OCL} {...props} />;
}

export function IdcodeSvgRenderer(props) {
  return <BaseIdcodeSvgRenderer OCL={OCL} {...props} />;
}
