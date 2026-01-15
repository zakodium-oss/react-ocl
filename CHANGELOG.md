# Changelog

## [8.5.0](https://github.com/zakodium-oss/react-ocl/compare/v8.4.0...v8.5.0) (2025-12-19)


### Features

* add shortcuts for greek letters and primes ([#71](https://github.com/zakodium-oss/react-ocl/issues/71)) ([f00df01](https://github.com/zakodium-oss/react-ocl/commit/f00df012a074e8fa799ed72f07a656eb4e77e051))
* stable style for `AtomLabelEditForm` ([#75](https://github.com/zakodium-oss/react-ocl/issues/75)) ([4b4645c](https://github.com/zakodium-oss/react-ocl/commit/4b4645c6edfcc2933382bf620937b631659ad857))

## [8.4.0](https://github.com/zakodium-oss/react-ocl/compare/v8.3.0...v8.4.0) (2025-11-02)


### Features

* **canvas_editor:** add `getMolecule` method ([a2a989e](https://github.com/zakodium-oss/react-ocl/commit/a2a989ebeee434c2d9c737d16a330ebc656f37d3))
* **canvas_editor:** allow to customize ID code in molecule changed event handler ([d2e3217](https://github.com/zakodium-oss/react-ocl/commit/d2e32177d258f62a4b8d636b93b6844a22adc68e))


### Bug Fixes

* **canvas_editor:** use non-deprecated `toIsomericSmiles` ([7807c93](https://github.com/zakodium-oss/react-ocl/commit/7807c93b4266b79ea6d031e7f9810d81dfaefe68))
* update OpenChemLib ([#68](https://github.com/zakodium-oss/react-ocl/issues/68)) ([4e8881d](https://github.com/zakodium-oss/react-ocl/commit/4e8881d538829f7bd55a4ef5f60de8011cc4ec5e))

## [8.3.0](https://github.com/zakodium-oss/react-ocl/compare/v8.2.0...v8.3.0) (2025-10-14)


### Features

* **SvgEditor:** support quick numbering of atoms with space key ([#60](https://github.com/zakodium-oss/react-ocl/issues/60)) ([cf21d75](https://github.com/zakodium-oss/react-ocl/commit/cf21d759ee6d02202b6d05e368d41def2e1f99bf))

## [8.2.0](https://github.com/zakodium-oss/react-ocl/compare/v8.1.0...v8.2.0) (2025-08-29)


### Features

* **MolfileSvgEditor:** add `MolfileSvgEditor` ([0d714d9](https://github.com/zakodium-oss/react-ocl/commit/0d714d9732d38120d02b8e505f6ef0bb46319ab9))
* **SvgEditor:** support `atomHighlight` props with `atomHighlightStrategy` ([c9e79e6](https://github.com/zakodium-oss/react-ocl/commit/c9e79e6cbcae53bde042372cd28f4e7b6d94fb36))

## [8.1.0](https://github.com/zakodium-oss/react-ocl/compare/v8.0.1...v8.1.0) (2025-08-28)


### Features

* add svg editor ([#56](https://github.com/zakodium-oss/react-ocl/issues/56)) ([929b621](https://github.com/zakodium-oss/react-ocl/commit/929b6215e419053d0af84e4120af64039e239714))
* expose generic SvgRenderer ([#54](https://github.com/zakodium-oss/react-ocl/issues/54)) ([fee8464](https://github.com/zakodium-oss/react-ocl/commit/fee8464e97c15809fea9cc2b2cdc533a3e0f9612))

## [8.0.1](https://github.com/zakodium-oss/react-ocl/compare/v8.0.0...v8.0.1) (2025-08-14)


### Bug Fixes

* exports ([#51](https://github.com/zakodium-oss/react-ocl/issues/51)) ([c7e3dfd](https://github.com/zakodium-oss/react-ocl/commit/c7e3dfde5112a09c59e59918a0b3a2e3070bf2dc))

## [8.0.0](https://github.com/zakodium-oss/react-ocl/compare/v7.1.1...v8.0.0) (2025-04-17)


### ⚠ BREAKING CHANGES

* The `openchemlib` library has been updated. `react-ocl` is now ESM-only and exposes only one build. See https://github.com/cheminfo/openchemlib-js/releases/tag/v9.0.0

### Features

* update `openchemlib` ([#48](https://github.com/zakodium-oss/react-ocl/issues/48)) ([a51cd5e](https://github.com/zakodium-oss/react-ocl/commit/a51cd5e126b2ce3e80f0832a8ca0ef831cb701c3))

## [7.1.1](https://github.com/zakodium-oss/react-ocl/compare/v7.1.0...v7.1.1) (2025-04-15)


### Bug Fixes

* types of React DOM ref ([#46](https://github.com/zakodium-oss/react-ocl/issues/46)) ([eff6536](https://github.com/zakodium-oss/react-ocl/commit/eff6536acc88f1c623f11c2f64510439605a96ab))

## [7.1.0](https://github.com/zakodium-oss/react-ocl/compare/v7.0.2...v7.1.0) (2025-04-14)


### Features

* add CanvasEditor ([#43](https://github.com/zakodium-oss/react-ocl/issues/43)) ([3c5d15e](https://github.com/zakodium-oss/react-ocl/commit/3c5d15ec180717bb194134e70d6674aebadd6dea))
* export separate CanvasMoleculeEditor and CanvasReactionEditor ([#45](https://github.com/zakodium-oss/react-ocl/issues/45)) ([831f664](https://github.com/zakodium-oss/react-ocl/commit/831f664b9c87887e713b815437cebef74bf2f5b0))

## [7.0.2](https://github.com/zakodium-oss/react-ocl/compare/v7.0.1...v7.0.2) (2024-10-15)


### Bug Fixes

* base exports ([#38](https://github.com/zakodium-oss/react-ocl/issues/38)) ([19b24f6](https://github.com/zakodium-oss/react-ocl/commit/19b24f6aa66d1c6b5eec384928ba50268c7b510b))

## [7.0.1](https://github.com/zakodium-oss/react-ocl/compare/v7.0.0...v7.0.1) (2024-10-14)


### Bug Fixes

* **typings:** export types correctly ([#36](https://github.com/zakodium-oss/react-ocl/issues/36)) ([e21c64e](https://github.com/zakodium-oss/react-ocl/commit/e21c64eaf3553b39b3cdc0b2c5927bf6bbba2c1a))

## [7.0.0](https://github.com/zakodium-oss/react-ocl/compare/v6.1.0...v7.0.0) (2024-10-09)


### ⚠ BREAKING CHANGES

* migrate to TypeScript

### Bug Fixes

* improve native Node.js ESM support ([95a6284](https://github.com/zakodium-oss/react-ocl/commit/95a62842135f3bafb9e919f33df133a34f50614c))


### Code Refactoring

* migrate to TypeScript ([18d0105](https://github.com/zakodium-oss/react-ocl/commit/18d01058aad619bdb9508c6425f33e762a883b68))

## [6.1.0](https://github.com/zakodium-oss/react-ocl/compare/v6.0.2...v6.1.0) (2023-08-04)


### Features

* add labelColor ([7857cdd](https://github.com/zakodium-oss/react-ocl/commit/7857cdd74df840947d57001fb1ed7216a4678051))

## [6.0.2](https://github.com/zakodium-oss/react-ocl/compare/v6.0.1...v6.0.2) (2023-08-04)


### Bug Fixes

* enforce labelFontSize as a number ([93f35ff](https://github.com/zakodium-oss/react-ocl/commit/93f35ffe64bb6c8c783d55f08d8a77686867709e))

## [6.0.1](https://github.com/zakodium-oss/react-ocl/compare/v6.0.0...v6.0.1) (2023-08-04)


### Bug Fixes

* label was cut ([b50fa1c](https://github.com/zakodium-oss/react-ocl/commit/b50fa1cb503bf89d1a481ef16ad1584b8e77efcb))

## [6.0.0](https://github.com/zakodium-oss/react-ocl/compare/v5.0.1...v6.0.0) (2023-08-03)


### ⚠ BREAKING CHANGES

* remove the <div> level when redering a molecule

### Features

* allow the renderer to have a label object property ([e27edd9](https://github.com/zakodium-oss/react-ocl/commit/e27edd91d6469a6c11918ae33a3578de1eec302f))
* allow the renderer to have a label object property ([#24](https://github.com/zakodium-oss/react-ocl/issues/24)) ([e27edd9](https://github.com/zakodium-oss/react-ocl/commit/e27edd91d6469a6c11918ae33a3578de1eec302f))
* remove the &lt;div&gt; level when redering a molecule ([e27edd9](https://github.com/zakodium-oss/react-ocl/commit/e27edd91d6469a6c11918ae33a3578de1eec302f))
* Use a SVG as default error renderer ([e27edd9](https://github.com/zakodium-oss/react-ocl/commit/e27edd91d6469a6c11918ae33a3578de1eec302f))

## [5.0.1](https://github.com/zakodium-oss/react-ocl/compare/v5.0.0...v5.0.1) (2023-06-13)


### Bug Fixes

* do not prevent triggering onChange when props are changed ([#23](https://github.com/zakodium-oss/react-ocl/issues/23)) ([738e2fe](https://github.com/zakodium-oss/react-ocl/commit/738e2fe6aa09345430c1381657fa747e86c724bc))


### Documentation

* correct example in the readme ([d3746f2](https://github.com/zakodium-oss/react-ocl/commit/d3746f24eac62d22f081fc9608920e9702531598))

## [5.0.0](https://github.com/zakodium-oss/react-ocl/compare/v4.4.0...v5.0.0) (2022-08-15)


### ⚠ BREAKING CHANGES

* remove propTypes and defaultProps
* update OpenChemLib to v8.0.0
* React >=18 is now mandatory.
* The automated ids generated by the SvgRenderer now have a different format.

### Features

* update OpenChemLib to v8.0.0 ([cc0ea01](https://github.com/zakodium-oss/react-ocl/commit/cc0ea01082f16793e8d4bb87269e062a9b579b76))
* update React to v18 ([749ca7f](https://github.com/zakodium-oss/react-ocl/commit/749ca7f38d2f34e6c767f410927c9b2e171a442c))


### Code Refactoring

* remove propTypes and defaultProps ([7b15f4d](https://github.com/zakodium-oss/react-ocl/commit/7b15f4d7d899e6c9b9b03751f74aa02b560c699f))

## [4.4.0](https://www.github.com/zakodium-oss/react-ocl/compare/v4.3.5...v4.4.0) (2022-07-01)


### Features

* add initialIDCode props and give idCode in onChange callback ([2dba9b4](https://www.github.com/zakodium-oss/react-ocl/commit/2dba9b4374a089ee1872584d2bf38189582f9b0a))

### [4.3.5](https://www.github.com/zakodium/react-ocl/compare/v4.3.4...v4.3.5) (2022-03-11)


### Bug Fixes

* make StructureEditor work inside a shadow root ([2a12c53](https://www.github.com/zakodium/react-ocl/commit/2a12c53b966289870154065fb5cac1b4ae2dc10b))

### [4.3.4](https://www.github.com/zakodium/react-ocl/compare/v4.3.3...v4.3.4) (2022-02-19)


### Bug Fixes

* do not try to setFragment if editor is not instanciated ([a686836](https://www.github.com/zakodium/react-ocl/commit/a6868363443eb7b95ca5f72aca4cc1013ff71197))

### [4.3.3](https://www.github.com/zakodium/react-ocl/compare/v4.3.2...v4.3.3) (2021-03-23)


### Bug Fixes

* use JS extension ([9771140](https://www.github.com/zakodium/react-ocl/commit/977114035d99c956ce3d2f3da0bd7bc6cb057485))

### [4.3.2](https://www.github.com/zakodium/react-ocl/compare/v4.3.1...v4.3.2) (2021-03-23)


### Bug Fixes

* add commonjs build for SSR ([955d249](https://www.github.com/zakodium/react-ocl/commit/955d24937813fdae047e1eb5f9e9a09ef92b352d))

### [4.3.1](https://github.com/zakodium/react-ocl/compare/v4.3.0...v4.3.1) (2021-02-26)


### Bug Fixes

* prevent SVG recalculation if not needed ([#6](https://github.com/zakodium/react-ocl/issues/6)) ([004d729](https://github.com/zakodium/react-ocl/commit/004d729501b2193b13df507cca99c0212d20ed29))

# [4.3.0](https://github.com/zakodium/react-ocl/compare/v4.2.1...v4.3.0) (2020-09-09)


### Features

* expose base components for rendering with custom OCL ([66e6ee4](https://github.com/zakodium/react-ocl/commit/66e6ee4a9333bf50b118c8b41a74972419e2c31b))



## [4.2.1](https://github.com/zakodium/react-ocl/compare/v4.2.0...v4.2.1) (2020-06-10)


### Bug Fixes

* add missing main package field ([36bdf80](https://github.com/zakodium/react-ocl/commit/36bdf80be14fc562420ba957de733d807d9f36d8))



# [4.2.0](https://github.com/zakodium/react-ocl/compare/v4.1.0...v4.2.0) (2020-05-10)


### Features

* prevent atom selection and send event object ([#5](https://github.com/zakodium/react-ocl/issues/5)) ([07498f4](https://github.com/zakodium/react-ocl/commit/07498f48ff99d1c0c0c8b837cf4296c4d60ffc67))



# [4.1.0](https://github.com/zakodium/react-ocl/compare/v4.0.4...v4.1.0) (2020-05-07)


### Features

* **SVG:** catch syntax errors and add support for custom error component ([4c13201](https://github.com/zakodium/react-ocl/commit/4c1320109378ec7406552f91b0b9393c8836b705))



## [4.0.4](https://github.com/zakodium/react-ocl/compare/v4.0.3...v4.0.4) (2020-05-07)


### Bug Fixes

*  click event  listener ([88fde99](https://github.com/zakodium/react-ocl/commit/88fde997136cf2cae6f83dba9e955f82f6240e69))



## [4.0.3](https://github.com/zakodium/react-ocl/compare/v4.0.2...v4.0.3) (2019-11-28)


### Bug Fixes

* correct atom and bond highlighting ([caf1278](https://github.com/zakodium/react-ocl/commit/caf127866ed6e0c9e91a5e09cf001484393ebe41))



## [4.0.2](https://github.com/zakodium/react-ocl/compare/v4.0.1...v4.0.2) (2019-05-05)


### Bug Fixes

* **types:** correct type of IdcodeSvgRenderer props ([218b3b8](https://github.com/zakodium/react-ocl/commit/218b3b8))



## [4.0.1](https://github.com/zakodium/react-ocl/compare/v4.0.0...v4.0.1) (2019-05-05)


### Bug Fixes

* **types:** export types for default import ([6a2bebe](https://github.com/zakodium/react-ocl/commit/6a2bebe))



# [4.0.0](https://github.com/zakodium/react-ocl/compare/v3.1.1...v4.0.0) (2019-05-05)


### chore

* update OCL to 7.0.0 ([d990ebe](https://github.com/zakodium/react-ocl/commit/d990ebe))


### Code Refactoring

* **StructureEditor:** change arguments passed to onChange ([42e2a76](https://github.com/zakodium/react-ocl/commit/42e2a76))


### BREAKING CHANGES

* **StructureEditor:** Arguments passed to the `onChange` callback of `StructureEditor` were change. It will now receive two arguments: a molfile V3 and a Molecule instance.
* Highlight ids are now numbers instead of strings.



## [3.1.1](https://github.com/zakodium/react-ocl/compare/v3.1.0...v3.1.1) (2019-03-28)


### Bug Fixes

* better structure editor with hooks ([c1278e4](https://github.com/zakodium/react-ocl/commit/c1278e4))



# [3.1.0](https://github.com/zakodium/react-ocl/compare/v3.0.2...v3.1.0) (2019-03-28)


### Features

* add support for bond highlighting ([a48732e](https://github.com/zakodium/react-ocl/commit/a48732e))
* **highlight:** add onAtomEnter and onAtomLeave ([e31d70d](https://github.com/zakodium/react-ocl/commit/e31d70d))
* add support for controlled highlight ([77a0c57](https://github.com/zakodium/react-ocl/commit/77a0c57))



## [3.0.2](https://github.com/zakodium/react-ocl/compare/v3.0.1...v3.0.2) (2019-03-22)



## [3.0.1](https://github.com/zakodium/react-ocl/compare/v3.0.0...v3.0.1) (2019-01-27)

### Bug Fixes

- molfile prop doesn't have to be required ([538e51f](https://github.com/zakodium/react-ocl/commit/538e51f))

# [3.0.0](https://github.com/zakodium/react-ocl/compare/v2.0.1...v3.0.0) (2019-01-27)

### Bug Fixes

- update OCL to v6 ([5a0cdd5](https://github.com/zakodium/react-ocl/commit/5a0cdd5))

### BREAKING CHANGES

- The openchemlib peer dependency is now 6.0.0.

## [2.0.1](https://github.com/zakodium/react-ocl/compare/v2.0.0...v2.0.1) (2019-01-27)

### Bug Fixes

- use .mjs to tell entrypoints are modules ([a468b8b](https://github.com/zakodium/react-ocl/commit/a468b8b))

# [2.0.0](https://github.com/zakodium/react-ocl/compare/v1.0.1...v2.0.0) (2019-01-25)

### Bug Fixes

- **editor:** allow to pass a custom id ([e9f6639](https://github.com/zakodium/react-ocl/commit/e9f6639))

### Features

- export three versions of the library and make OCL prop obsolete ([0cd6a68](https://github.com/zakodium/react-ocl/commit/0cd6a68))

<a name="1.0.1"></a>

## [1.0.1](https://github.com/zakodium/react-ocl/compare/v1.0.0...v1.0.1) (2018-09-01)

<a name="1.0.0"></a>

# [1.0.0](https://github.com/zakodium/react-ocl/compare/v0.1.1...v1.0.0) (2018-01-09)

<a name="0.1.1"></a>

## [0.1.1](https://github.com/neptunjs/react-ocl/compare/v0.1.0...v0.1.1) (2017-11-01)

<a name="0.1.0"></a>

# [0.1.0](https://github.com/neptunjs/react-ocl/compare/v0.0.5...v0.1.0) (2017-02-08)

### Bug Fixes

- don't fallback to empty coordinates ([695936f](https://github.com/neptunjs/react-ocl/commit/695936f))

### Features

- require OCL in the props ([8c671da](https://github.com/neptunjs/react-ocl/commit/8c671da))

<a name="0.0.5"></a>

## [0.0.5](https://github.com/neptunjs/react-ocl/compare/v0.0.4...v0.0.5) (2017-02-07)

<a name="0.0.4"></a>

## [0.0.4](https://github.com/neptunjs/react-ocl/compare/v0.0.3...v0.0.4) (2017-02-07)

<a name="0.0.3"></a>

## [0.0.3](https://github.com/neptunjs/react-ocl/compare/v0.0.2...v0.0.3) (2017-01-26)

<a name="0.0.2"></a>

## [0.0.2](https://github.com/neptunjs/react-ocl/compare/v0.0.1...v0.0.2) (2017-01-26)

<a name="0.0.1"></a>

## 0.0.1 (2017-01-26)
