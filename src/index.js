/* eslint-disable react/no-multi-comp */

import React from 'react';
import OCL from 'openchemlib/minimal';

import BaseSmilesSvgRenderer from './components/SmilesSvgRenderer';
import BaseMolfileSvgRenderer from './components/MolfileSvgRenderer';
import BaseIdcodeSvgRenderer from './components/IdcodeSvgRenderer';

export function SmilesSvgRenderer(props) {
  return <BaseSmilesSvgRenderer OCL={OCL} {...props} />;
}

export function MolfileSvgRenderer(props) {
  return <BaseMolfileSvgRenderer OCL={OCL} {...props} />;
}

export function IdcodeSvgRenderer(props) {
  return <BaseIdcodeSvgRenderer OCL={OCL} {...props} />;
}
