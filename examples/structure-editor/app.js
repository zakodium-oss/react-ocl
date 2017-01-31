import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {Molecule} from 'openchemlib/full';
import {StructureEditor} from '../../src';
import {idAndCoordinatesToString} from '../../src/util';

function cb(...args) {
    console.log('cb', ...args);
}

const App = class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oclid: ''
        };
    }

    onChange(event) {
        const mol = Molecule.fromSmiles(event.target.value);
        this.setState({oclid: idAndCoordinatesToString(mol.getIDCodeAndCoordinates())});
    }

    handleStructureChange(newStructure) {
        this.setState({oclid: newStructure.oclid + ' ' + newStructure.coordinates});
    }

    render() {
        const oclid = this.state.oclid;
        const mol = Molecule.fromIDCode(oclid);
        return (
            <div>
                <input size="100" value={mol.toSmiles()} type="text" onChange={this.onChange.bind(this)} /><br />
                <StructureEditor
                    oclid={this.state.oclid}
                    // coordinates="aaaa"
                    // width={1200}
                    // height={800}
                    // fragment={true}
                    onChange={this.handleStructureChange.bind(this)}
                    // onAtomHighlight={cb}
                    // onBondHighlight={cb}
                />
            </div>
        );
    }
};

ReactDOM.render(
    <App />,
    document.getElementById('example')
);
