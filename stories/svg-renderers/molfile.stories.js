import { MolfileSvgRenderer } from '../../src/index';
import { molfileV2000, molfileV3000 } from '../data';

import { commonArgs, commonArgTypes } from './common-args';

export default {
  title: 'SVG renderers/MolfileSvgRenderer',
  component: MolfileSvgRenderer,
  args: {
    ...commonArgs,
  },
  argTypes: {
    ...commonArgTypes,
  },
  parameters: {
    docs: {
      description: {
        component:
          'The same MolfileSvgRenderer can be used to render both V2000 and V3000 molfile formats.',
      },
    },
  },
};

export function V2000(args) {
  return <MolfileSvgRenderer {...args} />;
}
V2000.storyName = 'Molfile (V2000)';
V2000.args = {
  molfile: molfileV2000,
};

export function V3000(args) {
  return <MolfileSvgRenderer {...args} />;
}
V3000.storyName = 'Molfile (V3000)';
V3000.args = {
  molfile: molfileV3000,
};
