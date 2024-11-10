import OCL from 'openchemlib/minimal';

import BaseIdcodeSvgRenderer, {
  type IdcodeSvgRendererProps,
} from './components/IdcodeSvgRenderer.js';
import BaseMolfileSvgRenderer, {
  type MolfileSvgRendererProps,
} from './components/MolfileSvgRenderer.js';
import BaseSmilesSvgRenderer, {
  type SmilesSvgRendererProps,
} from './components/SmilesSvgRenderer.js';

export type { BaseSvgRendererProps } from './components/types.js';
export type { IdcodeSvgRendererProps } from './components/IdcodeSvgRenderer.js';
export type { MolfileSvgRendererProps } from './components/MolfileSvgRenderer.js';
export type { SmilesSvgRendererProps } from './components/SmilesSvgRenderer.js';

export function SmilesSvgRenderer(props: SmilesSvgRendererProps) {
  return <BaseSmilesSvgRenderer OCL={OCL} {...props} />;
}

export function MolfileSvgRenderer(props: MolfileSvgRendererProps) {
  return <BaseMolfileSvgRenderer OCL={OCL} {...props} />;
}

export function IdcodeSvgRenderer(props: IdcodeSvgRendererProps) {
  return <BaseIdcodeSvgRenderer OCL={OCL} {...props} />;
}
