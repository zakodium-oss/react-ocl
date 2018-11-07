import React from 'react';
import renderer from 'react-test-renderer';
import OCL from 'openchemlib/minimal';

import SmilesSvgRenderer from '../SmilesSvgRenderer';

test('Molecule renders', () => {
  const component = renderer.create(
    <SmilesSvgRenderer OCL={OCL} smiles="CCOC" width={1200} height={800} />
  );
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
