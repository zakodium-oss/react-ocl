import { SmilesSvgRenderer } from '../../src/index.js';

import { commonArgs, commonArgTypes } from './common-args.js';

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

export function Smiles(args: any) {
  return <SmilesSvgRenderer {...args} />;
}
Smiles.storyName = 'SMILES';

function ErrorComponent(props: any) {
  return (
    <div style={{ color: 'red' }}>
      <div>{props.value}</div>
      <div>{props.error.message}</div>
    </div>
  );
}

export function CustomError() {
  return <SmilesSvgRenderer smiles="COVVVCC" ErrorComponent={ErrorComponent} />;
}
CustomError.storyName = 'With custom error rendering';

export function DefaultError() {
  return <SmilesSvgRenderer smiles="COVVVCC" />;
}
DefaultError.storyName = 'With default error rendering';
