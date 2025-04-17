# react-ocl

React components integrating OpenChemLib.

These react component allows to display and edit molfile and smiles.

<h3 align="center">

  <a href="https://www.zakodium.com">
    <img src="https://www.zakodium.com/brand/zakodium-logo-white.svg" width="50" alt="Zakodium logo" />
  </a>

  <p>
    Maintained by <a href="https://www.zakodium.com">Zakodium</a>
  </p>
  
  [![NPM version][npm-image]][npm-url]
  [![build status][ci-image]][ci-url]
  [![npm download][download-image]][download-url]

</h3>

## Installation

```console
npm install openchemlib react-ocl
```

## Usage

```jsx
import { SmilesSvgRenderer } from 'react-ocl';

function MyComponent() {
  return <SmilesSvgRenderer smiles="COCCOOOCO" />;
}
```

## Documentation

See https://react-ocl.pages.dev for detailed usage examples.

[npm-image]: https://img.shields.io/npm/v/react-ocl.svg
[npm-url]: https://npmjs.org/package/react-ocl
[ci-image]: https://github.com/zakodium-oss/react-ocl/workflows/Node.js%20CI/badge.svg?branch=main
[ci-url]: https://github.com/zakodium-oss/react-ocl/actions?query=workflow%3A%22Node.js+CI%22
[download-image]: https://img.shields.io/npm/dm/react-ocl.svg
[download-url]: https://npmjs.org/package/react-ocl
