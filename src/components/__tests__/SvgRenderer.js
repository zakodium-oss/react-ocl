import React from 'react';
import renderer from 'react-test-renderer';
import * as OCL from 'openchemlib/minimal';

import SvgRenderer from '../SvgRenderer';

test('Molecule renders', () => {
  const component = renderer.create(
    <SvgRenderer OCL={OCL} smiles="CCOC" width={1200} height={800} />
  );
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
