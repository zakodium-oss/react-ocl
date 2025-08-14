import { IdcodeSvgRenderer } from '../../src/index.js';
import { idcode } from '../data.js';

import { commonArgTypes, commonArgs } from './common-args.js';

export default {
  title: 'SVG renderers/IdcodeSvgRenderer',
  component: IdcodeSvgRenderer,
  args: {
    ...commonArgs,
  },
  argTypes: {
    ...commonArgTypes,
  },
};

export function Idcode(args: any) {
  return <IdcodeSvgRenderer {...args} />;
}
Idcode.storyName = 'ID code';
Idcode.args = {
  idcode: idcode.idCode,
};

export function WithCoordinates(args: any) {
  return <IdcodeSvgRenderer {...args} />;
}
WithCoordinates.storyName = 'ID code (with coordinates)';
WithCoordinates.args = {
  idcode: idcode.idCode,
  coordinates: idcode.coordinates,
};
