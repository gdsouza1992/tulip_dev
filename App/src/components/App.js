import React, { Component } from 'react';
import ChartB from './ChartB';
import Client from '../lib/client';

class App extends Component {

    constructor() {
        super();
        this.client = new Client();
    }

    render() {
        return (
            <div>
                <ChartB client={this.client} />
            </div>
        )
    }
}

export default App;
