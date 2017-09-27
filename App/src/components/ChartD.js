import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PieChart, Pie, ResponsiveContainer, Cell, Legend, Tooltip } from 'recharts';
import LoadingChart from './LoadingChart';
import { fetchChartDData } from '../actions/chartActions';

const _ = require('lodash');
const RADIAN = Math.PI / 180;
const COLORS = ['#FF5722', '#FF9800', '#CDDC39', '#3F51B5', '#673AB7', '#4CAF50'];


class ChartD extends Component {

    componentDidMount() {
        this.props.fetchChartDData();
    }


    renderCustomizedLabel = () => ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x  = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy  + radius * Math.sin(-midAngle * RADIAN);
        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    render() {
        if(_.isEmpty(this.props.ChartDProps)){
            return(
                <LoadingChart title={this.props.chartTitle}/>
            );
        } else {
            const data = this.props.ChartDProps.data;
            return (
                <div className='chartContainer'>
                    <p>{this.props.chartTitle}</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart onMouseEnter={this.onPieEnter}>
                            <Legend align="right" verticalAlign="bottom" layout="vertical" iconType="circle" margin={{top:200}}/>
                          <Pie
                            data={data}
                            dataKey="value"
                            innerRadius={60}
                            outerRadius={120}
                            labelLine={false}
                            label
                            stroke="#000000"
                            strokeWidth="2"
                          >{
                              data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                            }
                          </Pie>
                          <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>

                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        ChartDProps: state.charts.chartD
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchChartDData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartD);
