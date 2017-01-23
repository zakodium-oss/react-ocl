import React from 'react';
import renderer from 'react-test-renderer';

import SvgRenderer from '../SvgRenderer';

test('Molecule renders', () => {
    const component = renderer.create(
        <SvgRenderer smiles="CCOC" width={1200} height={800}/>
    );
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});
