import { defineConfig, globalIgnores } from 'eslint/config';
import react from 'eslint-config-cheminfo-react/base';
import ts from 'eslint-config-cheminfo-typescript';
import storybook from 'eslint-plugin-storybook';

export default defineConfig(
  globalIgnores(['lib', 'lib-cjs']),
  ts,
  react,
  storybook.configs['flat/recommended'],
);
