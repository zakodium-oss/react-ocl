import React from 'react';
import {Molecule} from 'openchemlib/full';

import {applyDefaultRendererOptions} from '../util/defaultRenderer';

export default function SvgRenderer(props) {
    const options = applyDefaultRendererOptions(props);
    let mol;
    if (options.smiles) {
        mol = Molecule.fromSmiles(options.smiles);
    } else if (options.molfile) {
        mol = Molecule.fromMolfile(options.molfile);
    } else if (options.oclid) {
        const coordinates = options.coordinates || '';
        mol = Molecule.fromIDCode(options.oclid, options.coordinates);
    } else {
        throw new Error('Missing molecule');
    }

    const html = {__html: mol.toSVG(options.width, options.height)};

    return <div dangerouslySetInnerHTML={html}></div>;
}
