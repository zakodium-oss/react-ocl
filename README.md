# react-mf

[![NPM version][npm-image]][npm-url]

React components integrating OpenChemLib.

## Installation

```console
npm install --save openchemlib react-ocl
```

## Usage

```jsx
import OCL from 'openchemlib';
import { SvgRenderer } from 'react-mf';

function MyComponent() {
  return <SvgRenderer OCL={OCL} smiles="COCCOOOCO" />;
}
```

## Documentation

See https://neptunejs.github.io/react-ocl/ for detailed usage examples.

[npm-image]: https://img.shields.io/npm/v/react-ocl.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-ocl
