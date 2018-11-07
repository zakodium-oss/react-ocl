import React from 'react';
import OCL from 'openchemlib/full';

import SvgRenderer from './src/components/SvgRenderer';
import StructureEditor from './src/components/StructureEditor';

function FullSvgRenderer(props) {
  return <SvgRenderer OCL={OCL} {...props} />;
}

function FullStructureEditor(props) {
  return <StructureEditor OCL={OCL} {...props} />;
}

export { FullSvgRenderer as SvgRenderer };
export { FullStructureEditor as StructureEditor };
