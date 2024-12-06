import react from 'eslint-config-cheminfo-react';
import ts from 'eslint-config-cheminfo-typescript/base';
import unicorn from 'eslint-config-cheminfo-typescript/unicorn';
import storybook from 'eslint-plugin-storybook';

export default [
  ...ts,
  ...unicorn,
  ...react,
  ...storybook.configs['flat/recommended'],
];
