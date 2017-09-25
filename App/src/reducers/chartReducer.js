import { FETCH_CHARTB_SUCCESS } from '../actions/chartActions';

export default function(state = {}, action){
    let dataB;

    switch (action.type) {
        case FETCH_CHARTB_SUCCESS:
            const chartB = {}
            chartB.data = action.payload;
            chartB.isLoading = false;
            dataB = Object.assign({}, state, {'chartB': chartB});
            return dataB;

        default:
            return state;
    }
}
