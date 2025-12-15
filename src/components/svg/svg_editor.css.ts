export const atomLabelEditCss = `
form.react-ocl-atom-label-edit {
  position: absolute;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, 1.5em);
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
