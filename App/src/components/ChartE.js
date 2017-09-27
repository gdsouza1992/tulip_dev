import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Brush, BarChart, Bar, linearGradient, defs } from 'recharts';
import SelectDropDown from './SelectDropDown';
import { fetchChartEData } from '../actions/chartActions';
import LoadingChart from './LoadingChart';

const _ = require('lodash');

class ChartE extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedPage: "page_/analytics"
        }
    }

    removeTick = (time) => {
        return "";
    }

    dateFormat = (time) => {
        var HHmmss = time.split(' ')[4].split(':')
        return (HHmmss[0]+":"+HHmmss[1]);
    }

    componentDidMount() {
        this.props.fetchChartEData();
    }

    onPageChange = (value) => {
        this.setState({selectedPage: value});
    }

    render() {
        if(_.isEmpty(this.props.chartEProps)){
            return(
                <LoadingChart title={this.props.chartTitle}/>
            );
        } else {
            const data = this.props.chartEProps.data;
            return (
                <div className="chartContainer">
                    <p>{this.props.chartTitle}<SelectDropDown onPageChange={this.onPageChange}/></p>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <defs>
                                <linearGradient id="colorPv2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="50%" stopColor="#2196F3" stopOpacity={0.8}/>
                                    <stop offset="100%" stopColor="#03A9F4" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis stroke="#AAAAAA" dataKey="time_bin" tickFormatter={this.dateFormat}/>
                            <YAxis stroke="#AAAAAA" />
                            <CartesianGrid stroke="#999999" strokeDasharray="1 1"/>
                            <Tooltip itemStyle={{color: '#000'}} labelStyle={{display: 'none'}}/>
                            <Bar dataKey={this.state.selectedPage} fill="#2196F3" fillOpacity={1} stroke="#000000"/>
                            <Brush dataKey='time_bin' fill="#FFFFFF" tickFormatter={this.removeTick} height={30} strokeWidth="3" stroke="#000000" >
                                <BarChart>
                                    <Bar fill="#2196F3" dataKey={this.state.selectedPage} />
                                </BarChart>
                            </Brush>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        chartEProps: state.charts.chartE
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchChartEData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartE);
