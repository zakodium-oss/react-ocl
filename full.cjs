'use strict';

const OCL = require('openchemlib/full');
const React = require('react');

const BaseIdcodeSvgRenderer =
  require('./lib-cjs/components/IdcodeSvgRenderer.js').default;
const BaseMolfileSvgRenderer =
  require('./lib-cjs/components/MolfileSvgRenderer.js').default;
const BaseSmilesSvgRenderer =
  require('./lib-cjs/components/SmilesSvgRenderer.js').default;
const BaseStructureEditor =
  require('./lib-cjs/components/StructureEditor.js').default;

function SmilesSvgRenderer(props) {
  return React.createElement(BaseSmilesSvgRenderer, { OCL, ...props });
}

function MolfileSvgRenderer(props) {
  return React.createElement(BaseMolfileSvgRenderer, { OCL, ...props });
}

function IdcodeSvgRenderer(props) {
  return React.createElement(BaseIdcodeSvgRenderer, { OCL, ...props });
}

module.exports = {
  SmilesSvgRenderer,
  MolfileSvgRenderer,
  IdcodeSvgRenderer,
  StructureEditor: BaseStructureEditor,
};
