import { css } from '../../styling/css.ts';

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

export const atomLabelEditCss = css`
  form.react-ocl-atom-label-edit {
    position: absolute;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(4, 1.5em);
    grid-template-areas:
      'input input input input submit cancel'
      '${greeksFirstLine.join(' ')}'
      '${greeksLastLine.join(' ')} . ${primeNames.join(' ')}';
    align-items: stretch;
    gap: 0.25em;
    border: 1px solid lightgray;
    background-color: white;
    padding: 0.25em;
  }

  form.react-ocl-atom-label-edit button.react-ocl {
    padding: 0.25em;
    background-color: #efefef;
    border: none;
    border-radius: 5px;
  }

  form.react-ocl-atom-label-edit input.react-ocl {
    padding: 0.25em;
    border: solid 1px lightgrey;
    border-radius: 3px;
  }

  form.react-ocl-atom-label-edit input.react-ocl:focus {
    outline: auto;
  }
`;
