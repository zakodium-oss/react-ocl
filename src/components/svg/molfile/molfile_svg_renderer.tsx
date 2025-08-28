import type { ReactElement } from 'react';
import { memo } from 'react';

import type { BaseSvgRendererProps } from '../../types.js';
import { SvgRenderer } from '../svg_renderer.js';

import { useMolfile } from './use_molfile.js';

export interface MolfileSvgRendererProps extends BaseSvgRendererProps {
  molfile: string;
}

export const MolfileSvgRenderer = memo(function MolfileSvgRenderer(
  props: MolfileSvgRendererProps,
): ReactElement {
  const result = useMolfile(props);
  if (result.type === 'error') return result.jsx;

  return <SvgRenderer {...result.props} />;
});
