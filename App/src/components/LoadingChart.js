import React from 'react';
import '../css/style.css';
const LoadingChart = (props) => {
    return (
        <div className="chartContainer isLoading">
            <p>{props.title || "Loading Chart..."}</p>
            <div className="spinner"></div>
        </div>
    )
}

export default LoadingChart;
