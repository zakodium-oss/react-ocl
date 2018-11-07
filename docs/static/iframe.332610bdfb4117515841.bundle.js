(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/extends.js
var helpers_extends = __webpack_require__(26);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/openchemlib/minimal.js
var minimal = __webpack_require__(142);
var minimal_default = /*#__PURE__*/__webpack_require__.n(minimal);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(60);
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties);

// CONCATENATED MODULE: ./src/components/SvgRenderer.js
var defaultRendererOptions={width:300,height:150};function SvgRenderer(props){var options=Object.assign({},defaultRendererOptions,props),html={__html:props.mol.toSVG(options.width,options.height)};// eslint-disable-next-line react/no-danger
return react_default.a.createElement("div",{dangerouslySetInnerHTML:html})}SvgRenderer.__docgenInfo={description:"",methods:[],displayName:"SvgRenderer"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\components\\SvgRenderer.js"]={name:"SvgRenderer",docgenInfo:SvgRenderer.__docgenInfo,path:"src\\components\\SvgRenderer.js"});
// CONCATENATED MODULE: ./src/components/SmilesSvgRenderer.js
function SmilesSvgRenderer(props){var OCL=props.OCL,smiles=props.smiles,otherProps=objectWithoutProperties_default()(props,["OCL","smiles"]),mol=OCL.Molecule.fromSmiles(smiles);return react_default.a.createElement(SvgRenderer,extends_default()({mol:mol},otherProps))}SmilesSvgRenderer.__docgenInfo={description:"",methods:[],displayName:"SmilesSvgRenderer"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\components\\SmilesSvgRenderer.js"]={name:"SmilesSvgRenderer",docgenInfo:SmilesSvgRenderer.__docgenInfo,path:"src\\components\\SmilesSvgRenderer.js"});
// CONCATENATED MODULE: ./src/components/MolfileSvgRenderer.js
function MolfileSvgRenderer(props){var OCL=props.OCL,molfile=props.molfile,otherProps=objectWithoutProperties_default()(props,["OCL","molfile"]),mol=OCL.Molecule.fromMolfile(molfile);return react_default.a.createElement(SvgRenderer,extends_default()({mol:mol},otherProps))}MolfileSvgRenderer.__docgenInfo={description:"",methods:[],displayName:"MolfileSvgRenderer"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\components\\MolfileSvgRenderer.js"]={name:"MolfileSvgRenderer",docgenInfo:MolfileSvgRenderer.__docgenInfo,path:"src\\components\\MolfileSvgRenderer.js"});
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(94);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// CONCATENATED MODULE: ./src/components/IdcodeSvgRenderer.js
function IdcodeSvgRenderer_SmilesSvgRenderer(props){var OCL=props.OCL,idcode=props.idcode,coordinates=props.coordinates,otherProps=objectWithoutProperties_default()(props,["OCL","idcode","coordinates"]);"object"===typeof_default()(idcode)&&(coordinates=idcode.coordinates,idcode=idcode.id);var mol=OCL.Molecule.fromIDCode(idcode,coordinates);return react_default.a.createElement(SvgRenderer,extends_default()({mol:mol},otherProps))}IdcodeSvgRenderer_SmilesSvgRenderer.__docgenInfo={description:"",methods:[],displayName:"SmilesSvgRenderer"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\components\\IdcodeSvgRenderer.js"]={name:"SmilesSvgRenderer",docgenInfo:IdcodeSvgRenderer_SmilesSvgRenderer.__docgenInfo,path:"src\\components\\IdcodeSvgRenderer.js"});
// CONCATENATED MODULE: ./src/index.js
/* eslint-disable react/no-multi-comp */function src_SmilesSvgRenderer(props){return react_default.a.createElement(SmilesSvgRenderer,extends_default()({OCL:minimal_default.a},props))}function src_MolfileSvgRenderer(props){return react_default.a.createElement(MolfileSvgRenderer,extends_default()({OCL:minimal_default.a},props))}function IdcodeSvgRenderer(props){return react_default.a.createElement(IdcodeSvgRenderer_SmilesSvgRenderer,extends_default()({OCL:minimal_default.a},props))}src_SmilesSvgRenderer.__docgenInfo={description:"",methods:[],displayName:"SmilesSvgRenderer"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\index.js"]={name:"SmilesSvgRenderer",docgenInfo:src_SmilesSvgRenderer.__docgenInfo,path:"src\\index.js"}),src_MolfileSvgRenderer.__docgenInfo={description:"",methods:[],displayName:"MolfileSvgRenderer"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\index.js"]={name:"MolfileSvgRenderer",docgenInfo:src_MolfileSvgRenderer.__docgenInfo,path:"src\\index.js"}),IdcodeSvgRenderer.__docgenInfo={description:"",methods:[],displayName:"IdcodeSvgRenderer"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src\\index.js"]={name:"IdcodeSvgRenderer",docgenInfo:IdcodeSvgRenderer.__docgenInfo,path:"src\\index.js"});
// CONCATENATED MODULE: ./minimal.js
/* concated harmony reexport SmilesSvgRenderer */__webpack_require__.d(__webpack_exports__, "c", function() { return src_SmilesSvgRenderer; });
/* concated harmony reexport MolfileSvgRenderer */__webpack_require__.d(__webpack_exports__, "b", function() { return src_MolfileSvgRenderer; });
/* concated harmony reexport IdcodeSvgRenderer */__webpack_require__.d(__webpack_exports__, "a", function() { return IdcodeSvgRenderer; });


/***/ }),

/***/ 564:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(223);
__webpack_require__(565);
module.exports = __webpack_require__(566);


/***/ }),

/***/ 566:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _storybook_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(141);
/* harmony import */ var _storybook_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_storybook_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(73);
/* harmony import */ var _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _storybook_addon_info__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(563);
/* harmony import */ var _storybook_addon_info__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_storybook_addon_info__WEBPACK_IMPORTED_MODULE_2__);
var req=__webpack_require__(613);function loadStories(){req.keys().forEach(function(filename){return req(filename)})}Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__["addDecorator"])(Object(_storybook_addon_info__WEBPACK_IMPORTED_MODULE_2__["withInfo"])({header:!1,inline:!0,source:!0,styles:{infoStory:{border:"1px solid rgb(238, 238, 238)",padding:30}}})),Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__["addDecorator"])(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__["withKnobs"]),Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__["configure"])(loadStories,module);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(320)(module)))

/***/ }),

/***/ 585:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./nestedObjectAssign": 499,
	"./nestedObjectAssign.js": 499
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 585;

/***/ }),

/***/ 613:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./structure-editor.stories.js": 614,
	"./svg-renderer.stories.js": 615
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 613;

/***/ }),

/***/ 614:
/***/ (function(module, exports) {

// import React, { useState } from 'react';
// import { storiesOf } from '@storybook/react';
// import { StructureEditor } from '../full';
// const initialMolfile = `
// Actelion Java MolfileCreator 1.0
//   6  5  0  0  0  0  0  0  0  0999 V2000
//     3.4641   -0.5000   -0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
//     2.5981   -0.0000   -0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
//     1.7321   -0.5000   -0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
//     1.7321   -1.5000   -0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
//     0.8660   -0.0000   -0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
//     0.0000   -0.5000   -0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
//   2  1  1  0  0  0  0
//   3  2  1  0  0  0  0
//   4  3  2  0  0  0  0
//   5  3  1  0  0  0  0
//   6  5  1  0  0  0  0
// M  END
// `;
// function MolfileDemo() {
//   const [molfile] = useState(initialMolfile);
//   return <StructureEditor molfile={molfile} />;
// }
// storiesOf('StructureEditor', module).add('From ID Code', () => <MolfileDemo />);

/***/ }),

/***/ 615:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _storybook_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(141);
/* harmony import */ var _storybook_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_storybook_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73);
/* harmony import */ var _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _minimal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(134);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(97);
var molfileText="The same MolfileSvgRenderer can be used to render both V2000 and V3000 molfile formats.";Object(_storybook_react__WEBPACK_IMPORTED_MODULE_1__["storiesOf"])("SVG renderers",module).add("From SMILES",function(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_minimal__WEBPACK_IMPORTED_MODULE_3__[/* SmilesSvgRenderer */ "c"],{smiles:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__["text"])("SMILES","COCCOc1ccccc1")})},{info:{text:"The SMILES SVG renderer will always invent the coordinates."}}).add("From molfile V2000",function(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_minimal__WEBPACK_IMPORTED_MODULE_3__[/* MolfileSvgRenderer */ "b"],{molfile:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__["text"])("molfile",_data__WEBPACK_IMPORTED_MODULE_4__[/* molfileV2000 */ "b"]),width:300,height:200})},{info:{text:"The same MolfileSvgRenderer can be used to render both V2000 and V3000 molfile formats."}}).add("From molfile V3000",function(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_minimal__WEBPACK_IMPORTED_MODULE_3__[/* MolfileSvgRenderer */ "b"],{molfile:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__["text"])("molfile",_data__WEBPACK_IMPORTED_MODULE_4__[/* molfileV3000 */ "c"]),width:300,height:200})},{info:{text:"The same MolfileSvgRenderer can be used to render both V2000 and V3000 molfile formats."}}).add("From ID code",function(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_minimal__WEBPACK_IMPORTED_MODULE_3__[/* IdcodeSvgRenderer */ "a"],{idcode:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__["text"])("ID code",_data__WEBPACK_IMPORTED_MODULE_4__[/* idcode */ "a"].idCode),width:300,height:200})}).add("From ID code and coordinates",function(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_minimal__WEBPACK_IMPORTED_MODULE_3__[/* IdcodeSvgRenderer */ "a"],{idcode:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__["text"])("ID code",_data__WEBPACK_IMPORTED_MODULE_4__[/* idcode */ "a"].idCode),coordinates:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__["text"])("ID coordinates",_data__WEBPACK_IMPORTED_MODULE_4__[/* idcode */ "a"].coordinates),width:300,height:200})}).add("From ID code and coordinates as object",function(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_minimal__WEBPACK_IMPORTED_MODULE_3__[/* IdcodeSvgRenderer */ "a"],{idcode:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__["object"])("ID code object",{id:_data__WEBPACK_IMPORTED_MODULE_4__[/* idcode */ "a"].idCode,coordinates:_data__WEBPACK_IMPORTED_MODULE_4__[/* idcode */ "a"].coordinates}),width:300,height:200})});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(320)(module)))

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return molfileV2000; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return idcode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return molfileV3000; });
/* harmony import */ var openchemlib_minimal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(142);
/* harmony import */ var openchemlib_minimal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(openchemlib_minimal__WEBPACK_IMPORTED_MODULE_0__);
var molfileV2000="\n  Marvin  07260611242D          \n\n 24 26  0  0  0  0            999 V2000\n   -0.6312    0.1434    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.1937    0.1434    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5245    1.5927    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.2250    0.5897    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.2250    1.4147    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.2187    1.9507    0.0000 C   0  0  1  0  0  0  0  0  0  0  0  0\n   -0.9620    1.5927    0.0000 C   0  0  2  0  0  0  0  0  0  0  0  0\n   -1.6765    2.8302    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.6765    2.0052    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3910    1.5927    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1055    2.0052    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.2187    2.7757    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.4957    4.0132    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.4957    3.1882    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2102    2.7757    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9247    1.5382    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6391    1.9507    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6391    2.7757    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9247    3.1882    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2102    1.9507    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1456    0.7885    0.0000 C   0  0  1  0  0  0  0  0  0  0  0  0\n   -1.9425    0.5750    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7081    0.7885    0.0000 C   0  0  1  0  0  0  0  0  0  0  0  0\n    1.5050    0.5750    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  6  7  1  0  0  0  0\n  3  6  1  0  0  0  0\n  7 21  1  0  0  0  0\n 21  1  1  0  0  0  0\n  1  2  1  0  0  0  0\n  2 23  1  0  0  0  0\n 23  3  1  0  0  0  0\n 21  4  1  1  0  0  0\n 23  4  1  1  0  0  0\n  4  5  1  0  0  0  0\n  6 12  1  1  0  0  0\n  7  9  1  1  0  0  0\n  9  8  2  0  0  0  0\n  9 10  1  0  0  0  0\n 10 11  1  0  0  0  0\n 12 14  1  0  0  0  0\n 14 13  2  0  0  0  0\n 14 15  1  0  0  0  0\n 19 15  2  0  0  0  0\n 15 20  1  0  0  0  0\n 16 17  1  0  0  0  0\n 20 16  2  0  0  0  0\n 17 18  2  0  0  0  0\n 18 19  1  0  0  0  0\n 21 22  1  1  0  0  0\n 23 24  1  1  0  0  0\nM  END\n";var mol=openchemlib_minimal__WEBPACK_IMPORTED_MODULE_0___default.a.Molecule.fromMolfile("\n  Marvin  07260611242D          \n\n 24 26  0  0  0  0            999 V2000\n   -0.6312    0.1434    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.1937    0.1434    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5245    1.5927    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.2250    0.5897    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.2250    1.4147    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.2187    1.9507    0.0000 C   0  0  1  0  0  0  0  0  0  0  0  0\n   -0.9620    1.5927    0.0000 C   0  0  2  0  0  0  0  0  0  0  0  0\n   -1.6765    2.8302    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.6765    2.0052    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3910    1.5927    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1055    2.0052    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.2187    2.7757    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.4957    4.0132    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.4957    3.1882    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2102    2.7757    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9247    1.5382    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6391    1.9507    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.6391    2.7757    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9247    3.1882    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2102    1.9507    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1456    0.7885    0.0000 C   0  0  1  0  0  0  0  0  0  0  0  0\n   -1.9425    0.5750    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7081    0.7885    0.0000 C   0  0  1  0  0  0  0  0  0  0  0  0\n    1.5050    0.5750    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  6  7  1  0  0  0  0\n  3  6  1  0  0  0  0\n  7 21  1  0  0  0  0\n 21  1  1  0  0  0  0\n  1  2  1  0  0  0  0\n  2 23  1  0  0  0  0\n 23  3  1  0  0  0  0\n 21  4  1  1  0  0  0\n 23  4  1  1  0  0  0\n  4  5  1  0  0  0  0\n  6 12  1  1  0  0  0\n  7  9  1  1  0  0  0\n  9  8  2  0  0  0  0\n  9 10  1  0  0  0  0\n 10 11  1  0  0  0  0\n 12 14  1  0  0  0  0\n 14 13  2  0  0  0  0\n 14 15  1  0  0  0  0\n 19 15  2  0  0  0  0\n 15 20  1  0  0  0  0\n 16 17  1  0  0  0  0\n 20 16  2  0  0  0  0\n 17 18  2  0  0  0  0\n 18 19  1  0  0  0  0\n 21 22  1  1  0  0  0\n 23 24  1  1  0  0  0\nM  END\n");var idcode=mol.getIDCodeAndCoordinates();var molfileV3000=mol.toMolfileV3();

/***/ })

},[[564,2,4]]]);