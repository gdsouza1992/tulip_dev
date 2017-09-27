import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../css/style.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { fetchChartBData } from '../actions/chartActions';
import LoadingChart from './LoadingChart';



const _ = require('lodash');

class ChartB extends Component {


    componentDidMount() {
        this.props.fetchChartBData();
    }

    bytesToMB = (bytes) => {

        return bytes/1000000;

    }

    formatLabel = (label) => {
        return label+" MB";
    }

    truncateText = (value) => {
        return value.substring(0,15);
    }



    render() {
        if(_.isEmpty(this.props.chartBProps)){
            return(
                <LoadingChart title={this.props.chartTitle}/>
            );
        } else {
            const data = this.props.chartBProps.data;
            return (
                <div className='chartContainer'>
                      <p>{this.props.chartTitle}</p>
                      <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis stroke="#AAAAAA" padding={{ left: 20, right:20 }} dataKey="current_page" tickFormatter={this.truncateText}/>
                        <YAxis stroke="#AAAAAA" padding={{ bottom: 10, top:10 }} unit='MB' domain={['auto', 'auto']}/>
                        <CartesianGrid stroke="#FFFFFF" strokeDasharray="1 1"/>
                        <Legend/>
                        <Tooltip itemStyle={{color: '#000000'}} labelStyle={{display: 'none'}} formatter={this.formatLabel}/>
                        <Line connectNulls={true} type="monotone" dataKey="max" stroke="#FF5722" strokeWidth="2"/>
                        <Line connectNulls={true} type="monotone" dataKey="average" stroke="#FF9800" strokeWidth="2"/>
                        <Line connectNulls={true} type="monotone" dataKey="min" stroke="#CDDC39" strokeWidth="2"/>

                      </LineChart>
                      </ResponsiveContainer>

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
    return bindActionCreators({fetchChartBData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartB);
