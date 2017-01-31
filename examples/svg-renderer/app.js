import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {SvgRenderer} from '../../src';

const App = class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            smiles: 'CCO'
        };
    }

    onChange(event) {
        this.setState({smiles: event.target.value});
    }

    render() {
        return (
            <div>
                <input size="100" value={this.state.smiles} type="text" onChange={this.onChange.bind(this)} /><br />
                <SvgRenderer smiles={this.state.smiles} width={1200} height={800}/>
            </div>
        );
    }
};

ReactDOM.render(
    <App />,
    document.getElementById('example')
);
