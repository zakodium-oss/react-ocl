import OCL from 'openchemlib/minimal';

import type { IdcodeSvgRendererProps } from './components/IdcodeSvgRenderer.js';
import BaseIdcodeSvgRenderer from './components/IdcodeSvgRenderer.js';
import type { MolfileSvgRendererProps } from './components/MolfileSvgRenderer.js';
import BaseMolfileSvgRenderer from './components/MolfileSvgRenderer.js';
import type { SmilesSvgRendererProps } from './components/SmilesSvgRenderer.js';
import BaseSmilesSvgRenderer from './components/SmilesSvgRenderer.js';

export type { BaseSvgRendererProps } from './components/types.js';

export function SmilesSvgRenderer(props: SmilesSvgRendererProps) {
  return <BaseSmilesSvgRenderer OCL={OCL} {...props} />;
}

export function MolfileSvgRenderer(props: MolfileSvgRendererProps) {
  return <BaseMolfileSvgRenderer OCL={OCL} {...props} />;
}

export function IdcodeSvgRenderer(props: IdcodeSvgRendererProps) {
  return <BaseIdcodeSvgRenderer OCL={OCL} {...props} />;
}

export { type IdcodeSvgRendererProps } from './components/IdcodeSvgRenderer.js';
export { type MolfileSvgRendererProps } from './components/MolfileSvgRenderer.js';
export { type SmilesSvgRendererProps } from './components/SmilesSvgRenderer.js';
