import OCL from 'openchemlib/minimal';
import React from 'react';
import renderer from 'react-test-renderer';

import MolfileSvgRenderer from '../MolfileSvgRenderer';
import SmilesSvgRenderer from '../SmilesSvgRenderer';

test('Molecule renders smiles with custom id', () => {
  const component = renderer.create(
    <SmilesSvgRenderer
      id="mol1"
      OCL={OCL}
      smiles="CCOC"
      width={1200}
      height={800}
    />,
  );
  expect(component.toJSON()).toMatchSnapshot();
});

const molfileV2000 = `
  Marvin  07260611242D          

 24 26  0  0  0  0            999 V2000
   -0.6312    0.1434    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    0.1937    0.1434    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    0.5245    1.5927    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   -0.2250    0.5897    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
   -0.2250    1.4147    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   -0.2187    1.9507    0.0000 C   0  0  1  0  0  0  0  0  0  0  0  0
   -0.9620    1.5927    0.0000 C   0  0  2  0  0  0  0  0  0  0  0  0
   -1.6765    2.8302    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
   -1.6765    2.0052    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   -2.3910    1.5927    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
   -3.1055    2.0052    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   -0.2187    2.7757    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
    0.4957    4.0132    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
    0.4957    3.1882    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    1.2102    2.7757    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    1.9247    1.5382    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    2.6391    1.9507    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    2.6391    2.7757    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    1.9247    3.1882    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    1.2102    1.9507    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   -1.1456    0.7885    0.0000 C   0  0  1  0  0  0  0  0  0  0  0  0
   -1.9425    0.5750    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    0.7081    0.7885    0.0000 C   0  0  1  0  0  0  0  0  0  0  0  0
    1.5050    0.5750    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
  6  7  1  0  0  0  0
  3  6  1  0  0  0  0
  7 21  1  0  0  0  0
 21  1  1  0  0  0  0
  1  2  1  0  0  0  0
  2 23  1  0  0  0  0
 23  3  1  0  0  0  0
 21  4  1  1  0  0  0
 23  4  1  1  0  0  0
  4  5  1  0  0  0  0
  6 12  1  1  0  0  0
  7  9  1  1  0  0  0
  9  8  2  0  0  0  0
  9 10  1  0  0  0  0
 10 11  1  0  0  0  0
 12 14  1  0  0  0  0
 14 13  2  0  0  0  0
 14 15  1  0  0  0  0
 19 15  2  0  0  0  0
 15 20  1  0  0  0  0
 16 17  1  0  0  0  0
 20 16  2  0  0  0  0
 17 18  2  0  0  0  0
 18 19  1  0  0  0  0
 21 22  1  1  0  0  0
 23 24  1  1  0  0  0
M  END
`;

test('Molecule renders molfile with default id', () => {
  const component = renderer.create(
    <MolfileSvgRenderer
      id="mol1"
      OCL={OCL}
      molfile={molfileV2000}
      width={1200}
      height={800}
    />,
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('Syntax error in SMILES - default renderer', () => {
  const component = renderer.create(
    <SmilesSvgRenderer id="mol1" smiles="BAD" OCL={OCL} />,
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('Syntax error in SMILES - custom renderer', () => {
  const component = renderer.create(
    <SmilesSvgRenderer
      id="mol1"
      smiles="BAD"
      ErrorComponent={(props) => (
        <div>
          <span>{props.value}</span>
          <span>{props.error.message}</span>
        </div>
      )}
      OCL={OCL}
    />,
  );
  expect(component.toJSON()).toMatchSnapshot();
});
