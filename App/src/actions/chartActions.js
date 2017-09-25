export const FETCH_CHARTB = 'FETCH_CHARTB';
export const FETCH_CHARTB_SUCCESS = 'FETCH_CHARTB_SUCCESS';
export const FETCH_CHARTB_FAILURE = 'FETCH_CHARTB_FAILURE';


// const ROOT_URL = 'http://localhost:3001/api/';
export function onLoadChartBDataAction(data) {
    return (dispatch) => {
        dispatch(onLoadChartBData(data));
    }
}

function onLoadChartBData(data){
    return {
        type: FETCH_CHARTB_SUCCESS,
        payload: data
    };
}

// export function LoadChartBDataAction() {
//     const request = axios({
//       method: 'get',
//       url: `${ROOT_URL}/bytesToFailure`,
//       headers: []
//     });
//     return {
//         type: FETCH_CHARTB,
//         payload: request
//     };
// }

// export

// const request = axios({
//   method: 'get',
//   url: `${ROOT_URL}/bytesToFailure`,
//   headers: []
// });
