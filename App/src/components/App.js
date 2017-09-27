import React, { Component } from 'react';
import ChartB from './ChartB';
import ChartC from './ChartC';
import ChartD from './ChartD';
import ChartE from './ChartE';

class App extends Component {

    render() {
        return (
            <div>
                <ChartB chartTitle="LOAD BEFORE CRASH in MB"/>
                <ChartC chartTitle="HOURLY CRASHES by PAGE"/>
                <ChartE chartTitle="LOAD BEFORE CRASH in GB by PAGE"/>
                <ChartD chartTitle="CRASH DISTRIBUTION by PAGE"/>
            </div>
        )
    }
}

export default App;
