const defaultRendererOptions = {
  width: 300,
  height: 150
};

export function applyDefaultRendererOptions(options) {
  return Object.assign({}, defaultRendererOptions, options);
}

export function getMoleculeFromProps(props) {
  const { Molecule } = props.OCL;
  let mol = null;
  if (props.smiles) {
    mol = Molecule.fromSmiles(props.smiles);
  } else if (props.molfile) {
    mol = Molecule.fromMolfile(props.molfile);
  } else if (typeof props.oclid === 'string') {
    mol = Molecule.fromIDCode(props.oclid, props.coordinates);
  } else if (typeof props.oclid === 'object') {
    mol = Molecule.fromIDCode(props.oclid.id, props.oclid.coordinates);
  }
  return mol;
}

export function idAndCoordinatesToString(idAndCoordinates) {
  if (idAndCoordinates.coordinates) {
    return `${idAndCoordinates.idCode} ${idAndCoordinates.coordinates}`;
  } else {
    return idAndCoordinates.idCode;
  }
}

export function stringToIdAndCoordinates(string) {
  if (!string) return string;
  const split = string.split(' ');
  return {
    oclid: split[0],
    coordinates: split[1]
  };
}
