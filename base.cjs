'use strict';

const BaseIdcodeSvgRenderer =
  require('./lib-cjs/components/IdcodeSvgRenderer.js').default;
const BaseMolfileSvgRenderer =
  require('./lib-cjs/components/MolfileSvgRenderer.js').default;
const BaseSmilesSvgRenderer =
  require('./lib-cjs/components/SmilesSvgRenderer.js').default;

module.exports = {
  BaseSmilesSvgRenderer,
  BaseMolfileSvgRenderer,
  BaseIdcodeSvgRenderer,
};
