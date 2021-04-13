import { SmilesSvgRenderer } from '../../src/index';

import { commonArgs, commonArgTypes } from './common-args';

export default {
  title: 'SVG renderers/SmilesSvgRenderer',
  component: SmilesSvgRenderer,
  args: {
    smiles: 'COCCOc1ccccc1',
    ...commonArgs,
  },
  argTypes: {
    ...commonArgTypes,
  },
  parameters: {
    docs: {
      description: {
        component:
          'The SMILES SVG renderer will always invent the coordinates.',
      },
    },
  },
};

export function Smiles(args) {
  return <SmilesSvgRenderer {...args} />;
}
Smiles.storyName = 'SMILES';

export function CustomError() {
  return (
    <SmilesSvgRenderer
      smiles="COVVVCC"
      ErrorComponent={(props) => (
        <div style={{ color: 'red' }}>
          <div>{props.value}</div>
          <div>{props.error.message}</div>
        </div>
      )}
    />
  );
}
CustomError.storyName = 'With custom error rendering';
