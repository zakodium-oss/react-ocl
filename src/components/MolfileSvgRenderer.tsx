import type OCL from 'openchemlib/minimal';
import type { ReactElement } from 'react';
import { memo } from 'react';

import { useHandleMemoError } from '../hooks/useHandleMemoError.js';

import { DefaultErrorRenderer, ErrorRenderer } from './ErrorRenderer.js';
import SvgRenderer from './SvgRenderer.js';
import type { BaseSvgRendererProps } from './types.js';

export interface MolfileSvgRendererProps extends BaseSvgRendererProps {
  molfile: string;
}

export interface BaseMolfileSvgRendererProps extends MolfileSvgRendererProps {
  OCL: typeof OCL;
}

function MolfileSvgRenderer(props: BaseMolfileSvgRendererProps): ReactElement {
  const {
    OCL,
    molfile,
    ErrorComponent = DefaultMolfileErrorComponent,
    ...otherProps
  } = props;
  const [error, mol] = useHandleMemoError(
    () => OCL.Molecule.fromMolfile(molfile),
    [OCL, molfile],
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
}

export default memo(MolfileSvgRenderer);

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
