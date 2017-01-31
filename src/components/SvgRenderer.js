import React from 'react';
import {Molecule} from 'openchemlib/minimal';

import {
    applyDefaultRendererOptions,
    getMoleculeFromProps
} from '../util';

export default function SvgRenderer(props) {
    const options = applyDefaultRendererOptions(props);
    const mol = getMoleculeFromProps(options, Molecule);
    if (!mol) {
        throw new Error('Missing molecule');
    }

    const html = {__html: mol.toSVG(options.width, options.height)};

    return <div dangerouslySetInnerHTML={html}></div>;
}
