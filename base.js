const BaseIdcodeSvgRenderer = require('./lib-cjs/components/IdcodeSvgRenderer')
  .default;
const BaseMolfileSvgRenderer = require('./lib-cjs/components/MolfileSvgRenderer')
  .default;
const BaseSmilesSvgRenderer = require('./lib-cjs/components/SmilesSvgRenderer')
  .default;

module.exports = {
  SmilesSvgRenderer: BaseSmilesSvgRenderer,
  MolfileSvgRenderer: BaseMolfileSvgRenderer,
  IdcodeSvgRenderer: BaseIdcodeSvgRenderer,
};
