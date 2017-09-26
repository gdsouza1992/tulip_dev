import { FETCH_CHART_B_COMPLETE, FETCH_CHART_C_COMPLETE, FETCH_CHART_D_COMPLETE, FETCH_CHART_E_COMPLETE } from '../actions/chartActions';

export default function(state = {}, action){
    let chartB = {};
    let chartC = {};
    let chartD = {};
    let chartE = {};
    let data = {};
    let status = {};


    switch (action.type) {
        case FETCH_CHART_B_COMPLETE:

            status = action.payload.status;
            data = action.payload.data;
            chartB.isLoading = false;
            if(status !== 200){
                chartB.error = true;
                chartB.data = [];
            } else {
                chartB.error = false;
                chartB.data = data;
            }

            return Object.assign({}, state, {chartB});

        case FETCH_CHART_C_COMPLETE:
            status = action.payload.status;
            data = action.payload.data;
            chartC.isLoading = false;
            if(status !== 200){
                chartC.error = true;
                chartC.data = [];
            } else {
                chartC.error = false;
                chartC.data = data;
            }

            return Object.assign({}, state, {chartC});

        case FETCH_CHART_D_COMPLETE:
            status = action.payload.status;
            data = action.payload.data;
            chartD.isLoading = false;
            if(status !== 200){
                chartD.error = true;
                chartD.data = [];
            } else {
                chartD.error = false;
                chartD.data = data;
            }

            return Object.assign({}, state, {chartD});

        case FETCH_CHART_E_COMPLETE:
            status = action.payload.status;
            data = action.payload.data;
            chartE.isLoading = false;
            if(status !== 200){
                chartE.error = true;
                chartE.data = [];
            } else {
                chartE.error = false;
                chartE.data = data;
            }

            return Object.assign({}, state, {chartE});

        default:
            return state;
    }
}
