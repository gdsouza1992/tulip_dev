import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Brush, AreaChart, Area, linearGradient, defs } from 'recharts';
import SelectDropDown from './SelectDropDown';
import { fetchChartCData } from '../actions/chartActions';
import LoadingChart from './LoadingChart';

const _ = require('lodash');

class ChartC extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedPage: "page_/analytics"
        }
    }

    componentDidMount() {
        this.props.fetchChartCData();
    }

    dateFormat = (time) => {
        var HHmmss = time.split(' ')[4].split(':')
        return (HHmmss[0]+":"+HHmmss[1]);
    }

    onPageChange = (value) => {
        this.setState({selectedPage: value});
    }

    removeTick = (time) => {
        return "";
    }

    render() {
        if(_.isEmpty(this.props.ChartCProps)){
            return(
                <LoadingChart title={this.props.chartTitle}/>
            );
        } else {
            const data = this.props.ChartCProps.data;
            return (
                <div className='chartContainer'>
                    <p>{this.props.chartTitle}<SelectDropDown onPageChange={this.onPageChange}/></p>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorPv1" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="50%" stopColor="#2196F3" stopOpacity={0.8}/>
                            <stop offset="100%" stopColor="#03A9F4" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis stroke="#AAAAAA" dataKey="time_bin" tickFormatter={this.dateFormat}/>
                        <YAxis stroke="#AAAAAA" />
                        <CartesianGrid strokeDasharray="1 1" />
                        <Tooltip itemStyle={{color: '#000'}} labelStyle={{display: 'none'}}/>
                        <Area connectNulls={true} dataKey={this.state.selectedPage} strokeWidth="2" stroke="#000" fillOpacity={1} fill="url(#colorPv1)" />
                        <Brush dataKey='time_bin' tickFormatter={this.removeTick} height={30} stroke="#000000">
                            <AreaChart>
                                <Area connectNulls={true} dataKey={this.state.selectedPage} />
                            </AreaChart>
                        </Brush>
                    </AreaChart>
                    </ResponsiveContainer>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        ChartCProps: state.charts.chartC
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchChartCData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartC);
