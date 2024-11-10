import react from 'eslint-config-cheminfo-react/base';
import typescript from 'eslint-config-cheminfo-typescript';
import storybook from 'eslint-plugin-storybook';

export default [
  ...typescript,
  ...react,
  ...storybook.configs['flat/recommended'],
];
