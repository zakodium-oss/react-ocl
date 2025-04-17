import { Molecule } from 'openchemlib';
import type { ReactElement } from 'react';
import { memo } from 'react';

import { useHandleMemoError } from '../hooks/use_handle_memo_error.js';

import { DefaultErrorRenderer, ErrorRenderer } from './error_renderer.js';
import SvgRenderer from './svg_renderer.js';
import type { BaseSvgRendererProps } from './types.js';

export interface MolfileSvgRendererProps extends BaseSvgRendererProps {
  molfile: string;
}

export const MolfileSvgRenderer = memo(function MolfileSvgRenderer(
  props: MolfileSvgRendererProps,
): ReactElement {
  const {
    molfile,
    ErrorComponent = DefaultMolfileErrorComponent,
    ...otherProps
  } = props;
  const [error, mol] = useHandleMemoError(
    () => Molecule.fromMolfile(molfile),
    [molfile],
  );
  if (error) {
    return (
      <ErrorRenderer
        width={props.width}
        height={props.height}
        ErrorComponent={ErrorComponent}
        value={molfile}
        error={error}
      />
    );
  }
  return <SvgRenderer mol={mol} {...otherProps} />;
});

function DefaultMolfileErrorComponent(props: {
  width: number;
  height: number;
}) {
  return (
    <DefaultErrorRenderer
      width={props.width}
      height={props.height}
      message="Invalid Molfile"
    />
  );
}
