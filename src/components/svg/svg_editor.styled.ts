import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';

export const greekLetters = {
  alpha: 'α',
  beta: 'β',
  gamma: 'γ',
  delta: 'δ',
  epsilon: 'ε',
  zeta: 'ζ',
  eta: 'η',
  theta: 'θ',
} as const;
const greekLetterNames = Object.keys(greekLetters);
const greeksFirstLine = greekLetterNames.slice(0, 6);
const greeksLastLine = greekLetterNames.slice(6);

export const primes = {
  prime1: '′',
  prime2: '″',
  prime3: '‴',
};
const primeNames = Object.keys(primes);

export const AtomLabelEditFormStyled = styled.form`
  --box-size: 24px;

  position: absolute;
  z-index: 1;
  line-height: 1;
  font-size: 16px;
  display: grid;
  grid-template-columns: repeat(4, var(--box-size));
  grid-template-rows: repeat(3, var(--box-size));
  grid-template-areas:
    'input input input input submit cancel'
    '${greeksFirstLine.join(' ')}'
    '${greeksLastLine.join(' ')} . ${primeNames.join(' ')}';
  place-items: stretch;
  gap: 0.25em;
  border: 1px solid lightgray;
  background-color: white;
  padding: 0.25em;
  box-sizing: border-box;
`;

export const AtomLabelEditInputStyled = styled.input`
  grid-area: input;

  padding: 0.25em;
  border: solid 1px lightgrey;
  border-radius: 3px;
  font-family: sans-serif;
  font-size: 13.3333px;

  &:focus {
    outline: auto;
  }
`;

export const AtomLabelEditButtonStyled = styled('button', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'area',
})<{ area: string }>`
  grid-area: ${(props) => props.area};

  padding: 0.25em;
  background-color: #efefef;
  border: none;
  border-radius: 5px;
  font-family: sans-serif;
  width: var(--box-size);
  font-size: 13.3333px;
`;
