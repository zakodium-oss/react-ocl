import React from 'react';
import {Molecule} from 'openchemlib/minimal';

import {applyDefaultRendererOptions} from '../util/defaultRenderer';

export default function SvgRenderer(props) {
    const options = applyDefaultRendererOptions(props);
    let mol;
    if (options.smiles) {
        mol = Molecule.fromSmiles(options.smiles);
    } else if (options.molfile) {
        mol = Molecule.fromMolfile(options.molfile);
    } else if (typeof options.oclid === 'string') {
        const coordinates = options.coordinates || '';
        mol = Molecule.fromIDCode(options.oclid, options.coordinates);
    } else if (typeof options.oclid === 'object') {
        mol = Molecule.fromIDCode(options.oclid.id, options.oclid.coordinates);
    } else {
        throw new Error('Missing molecule');
    }

    const html = {__html: mol.toSVG(options.width, options.height)};

    return <div dangerouslySetInnerHTML={html}></div>;
}
