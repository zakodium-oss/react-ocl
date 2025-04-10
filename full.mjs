import OCL from 'openchemlib/full';
import React from 'react';

import BaseIdcodeSvgRenderer from './lib/components/IdcodeSvgRenderer.js';
import BaseMolfileSvgRenderer from './lib/components/MolfileSvgRenderer.js';
import BaseSmilesSvgRenderer from './lib/components/SmilesSvgRenderer.js';

export { default as CanvasEditor } from './lib/components/CanvasEditor.js';
export { default as StructureEditor } from './lib/components/StructureEditor.js';

export function SmilesSvgRenderer(props) {
  return React.createElement(BaseSmilesSvgRenderer, { OCL, ...props });
}

export function MolfileSvgRenderer(props) {
  return React.createElement(BaseMolfileSvgRenderer, { OCL, ...props });
}

export function IdcodeSvgRenderer(props) {
  return React.createElement(BaseIdcodeSvgRenderer, { OCL, ...props });
}
