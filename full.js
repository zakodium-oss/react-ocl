/* eslint-disable react/no-multi-comp */

import React from 'react';
import OCL from 'openchemlib/full';

import BaseSmilesSvgRenderer from './src/components/SmilesSvgRenderer';
import BaseMolfileSvgRenderer from './src/components/MolfileSvgRenderer';
import BaseIdcodeSvgRenderer from './src/components/IdcodeSvgRenderer';

export {
  default as IdcodeStructureEditor
} from './src/components/IdcodeStructureEditor';

export function SmilesSvgRenderer(props) {
  return <BaseSmilesSvgRenderer OCL={OCL} {...props} />;
}

export function MolfileSvgRenderer(props) {
  return <BaseMolfileSvgRenderer OCL={OCL} {...props} />;
}

export function IdcodeSvgRenderer(props) {
  return <BaseIdcodeSvgRenderer OCL={OCL} {...props} />;
}
