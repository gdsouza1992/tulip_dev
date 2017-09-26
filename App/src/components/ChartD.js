import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PieChart, Pie, Sector, Cell, Tooltip } from 'recharts';


import { fetchChartDData } from '../actions/chartActions';

const _ = require('lodash');
const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#28DF42', '#FF2242'];


class ChartD extends Component {

    constructor(props){
        super(props);
    }

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
                <div>
                    <p>Loading Chart...</p>
                </div>
            );
        } else {
            const data = this.props.ChartDProps.data;
            console.log(data);
            return (
                <div>
                    <p>GOT data {data.length}</p>
                    <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
                      <Pie
                        data={data}
                        dataKey="value"
                        cx={300}
                        cy={200}
                        innerRadius={30}
                        outerRadius={80}
                        labelLine={false}
                        label
                        outerRadius={80}
                        fill="#8884d8"
                      >{
                          data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                        }
                      </Pie>
                      <Tooltip/>
                    </PieChart>
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
