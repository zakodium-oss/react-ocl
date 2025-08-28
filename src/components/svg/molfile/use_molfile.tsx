import { Molecule } from 'openchemlib';
import type { JSX } from 'react';

import { useHandleMemoError } from '../../../hooks/use_handle_memo_error.js';
import { ErrorRenderer } from '../error_renderer.js';
import type { SvgRendererProps } from '../svg_renderer.js';

import { DefaultMolfileErrorComponent } from './molfile_default_error.js';
import type { MolfileSvgRendererProps } from './molfile_svg_renderer.js';

interface UseMolfileReturnError {
  type: 'error';
  error: Error;
  jsx: JSX.Element;
}

interface UseMolfileReturnMolecule {
  type: 'success';
  props: SvgRendererProps & { molecule: Molecule };
}

type UseMolfileReturn = UseMolfileReturnError | UseMolfileReturnMolecule;

export function useMolfile(props: MolfileSvgRendererProps): UseMolfileReturn {
  const {
    molfile,
    ErrorComponent = DefaultMolfileErrorComponent,
    ...otherProps
  } = props;
  const [error, molecule] = useHandleMemoError(
    () => Molecule.fromMolfile(molfile),
    [molfile],
  );
  if (error) {
    return {
      type: 'error',
      error,
      jsx: (
        <ErrorRenderer
          width={props.width}
          height={props.height}
          ErrorComponent={ErrorComponent}
          value={molfile}
          error={error}
        />
      ),
    };
  }

  return {
    type: 'success',
    props: { ...otherProps, molecule },
  };
}
