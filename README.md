# react-mf

[![NPM version][npm-image]][npm-url]

React components integrating OpenChemLib.

## Installation

```console
npm install --save openchemlib react-ocl
```

## Usage

```jsx
import { SmilesSvgRenderer } from 'react-ocl';

function MyComponent() {
  return <SvgRenderer smiles="COCCOOOCO" />;
}
```

## Which version of the library should I use?

This library is available in three versions, like openchemlib: `react-ocl/minimal`
(also available as `react-ocl`), `react-ocl/core` and `react-ocl/full`.

- If you only use the SvgRenderer component, you can choose any version, minimal
  being the smallest one.
- If you want to use the StructureEditor component, you must import `react-ocl/full`.

## Documentation

See https://neptunejs.github.io/react-ocl/ for detailed usage examples.

[npm-image]: https://img.shields.io/npm/v/react-ocl.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-ocl
