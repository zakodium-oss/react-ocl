import type { Molecule } from 'openchemlib';
import type { ReactElement } from 'react';
import { memo } from 'react';

import type { BaseEditorProps } from '../../types.js';
import { SvgEditor } from '../svg_editor.js';

import type { MolfileSvgRendererProps } from './molfile_svg_renderer.js';
import { useMolfile } from './use_molfile.js';

export interface MolfileSvgEditorProps
  extends MolfileSvgRendererProps,
    BaseEditorProps<string> {
  /**
   * Used to determine which molfile version to output on change.
   * @default 'V3000'
   */
  mdlFormat?: 'V2000' | 'V3000';
}

export const MolfileSvgEditor = memo(function MolfileSvgEditor(
  props: MolfileSvgEditorProps,
): ReactElement {
  const {
    mdlFormat = 'V3000',
    onChange: onChangeProp,
    atomHighlightStrategy,
    ...molfileSvgRenderProps
  } = props;

  const result = useMolfile(molfileSvgRenderProps);
  if (result.type === 'error') return result.jsx;

  function onChange(molecule: Molecule) {
    onChangeProp(toMolfile(molecule, mdlFormat));
  }

  return (
    <SvgEditor
      {...result.props}
      atomHighlightStrategy={atomHighlightStrategy}
      onChange={onChange}
    />
  );
});

function toMolfile(molecule: Molecule, mdlFormat: 'V2000' | 'V3000'): string {
  switch (mdlFormat) {
    case 'V2000':
      return molecule.toMolfile();
    case 'V3000':
      return molecule.toMolfileV3();
    default:
      throw new Error(`Unsupported format "${mdlFormat as string}"`);
  }
}
