import { IdcodeSvgRenderer } from '../../src/index';
import { idcode } from '../data';

import { commonArgs, commonArgTypes } from './common-args';

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

export function Idcode(args) {
  return <IdcodeSvgRenderer {...args} />;
}
Idcode.storyName = 'ID code';
Idcode.args = {
  idcode: idcode.idCode,
};

export function WithCoordinates(args) {
  return <IdcodeSvgRenderer {...args} />;
}
WithCoordinates.storyName = 'ID code (with coordinates)';
WithCoordinates.args = {
  idcode: idcode.idCode,
  coordinates: idcode.coordinates,
};
