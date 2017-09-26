import axios from 'axios';
const ROOT_URL = 'http://localhost:3001/api';


export const FETCH_CHART_B_COMPLETE = 'FETCH_CHART_B_COMPLETE';
export const FETCH_CHART_C_COMPLETE = 'FETCH_CHART_C_COMPLETE';
export const FETCH_CHART_D_COMPLETE = 'FETCH_CHART_D_COMPLETE';
export const FETCH_CHART_E_COMPLETE = 'FETCH_CHART_E_COMPLETE';

export function fetchChartBData() {
    const url = `${ROOT_URL}/bytesToFailure`;
    const request = axios.get(url);

    return {
        type: FETCH_CHART_B_COMPLETE,
        payload: request
    };
}

export function fetchChartCData() {
    const url = `${ROOT_URL}/getReportByTimeBin`;
    const request = axios.get(url);

    return {
        type: FETCH_CHART_C_COMPLETE,
        payload: request
    };
}

export function fetchChartDData() {
    const url = `${ROOT_URL}/getMetricsByPage`;
    const request = axios.get(url);

    return {
        type: FETCH_CHART_D_COMPLETE,
        payload: request
    };
}

export function fetchChartEData() {
    const url = `${ROOT_URL}/getBytesByTimeBin`;
    const request = axios.get(url);

    return {
        type: FETCH_CHART_E_COMPLETE,
        payload: request
    };
}
