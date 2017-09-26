import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Brush, AreaChart, Area, linearGradient, defs } from 'recharts';

import { fetchChartEData } from '../actions/chartActions';

const _ = require('lodash');

class ChartE extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedPage: "page_/analytics"
        }
    }

    componentDidMount() {
        this.props.fetchChartEData();
    }

    handlePageChange = (event) => {
        this.setState({selectedPage: event.target.value});
    }

    render() {
        if(_.isEmpty(this.props.ChartEProps)){
            return(
                <div>
                    <p>Loading Chart...</p>
                </div>
            );
        } else {
            const data = this.props.ChartEProps.data;
            return (
                <div>
                      <p>GOT CHART E data {data.length}</p>




                      <AreaChart width={730} height={250} data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="time_bin" />
                        <YAxis />
                        <YAxis yAxisId="right" orientation="right"  domain={[0, 20]} stroke="#FF2FAA"/>
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area connectNulls={true} type="monotone" dataKey={this.state.selectedPage} stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                        <Brush dataKey='time_bin' height={30} stroke="#8884d8"/>
                      </AreaChart>







                      <select value={this.state.selectedPage} onChange={this.handlePageChange}>
                          <option value="page_/">"/"</option>
                          <option value="page_/analytics">"/analytics"</option>
                          <option value="page_/data">"/data"</option>
                          <option value="page_/player">"/player"</option>
                          <option value="page_/processes">"/processes"</option>
                          <option value="page_/processes/editor">"/processes/editor"</option>
                    </select>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        ChartEProps: state.charts.chartE,
        ChartCProps: state.charts.chartC
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchChartEData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartE);
