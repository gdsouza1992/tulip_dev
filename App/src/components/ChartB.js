import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Brush, AreaChart, Area } from 'recharts';

import { onLoadChartBDataAction } from '../actions/chartActions';

const _ = require('lodash');

class ChartB extends Component {

    constructor(props){
        super(props);
        this.props.client.on('load-chartB-data', this.onLoadChartBData);
    }

    componentDidMount() {
        this.props.client.bytesToFailure();
    }

    onLoadChartBData = (data) => {
        this.props.onLoadChartBDataAction(data);
    }

    render() {
        if(_.isEmpty(this.props.chartBProps)){
            return(
                <div>
                    <p>Loading Chart...</p>
                </div>
            );
        } else {
            const data = this.props.chartBProps.data;
            return (
                <div>
                      <p>GOT data {data.length}</p>
                      <LineChart width={500} height={300} data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                        <XAxis dataKey="current_page"/>
                        <YAxis padding={{ bottom: 10, top:10 }} domain={['dataMin - 100', 'dataMax + 100']}/>
                        <CartesianGrid stroke="#eee" strokeDasharray="1 1"/>
                        <Tooltip />
                        <Line type="monotone" dataKey="max" stroke="#82CA9D" />
                        <Line type="monotone" dataKey="average" stroke="#FF9800" />
                        <Line type="monotone" dataKey="min" stroke="#8884D8" />

                      </LineChart>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        chartBProps: state.charts.chartB
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({onLoadChartBDataAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartB);
