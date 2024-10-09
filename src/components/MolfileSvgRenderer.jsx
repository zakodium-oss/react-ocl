import { memo } from 'react';

import { useHandleMemoError } from '../hooks/useHandleMemoError.js';

import { DefaultErrorRenderer, ErrorRenderer } from './ErrorRenderer.js';
import SvgRenderer from './SvgRenderer.js';

function MolfileSvgRenderer(props) {
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

function DefaultMolfileErrorComponent(props) {
  return (
    <DefaultErrorRenderer height={props.height} message="Invalid Molfile" />
  );
}
