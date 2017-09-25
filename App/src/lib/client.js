import { EventEmitter } from 'events';
import axios from 'axios';
const ROOT_URL = 'http://localhost:3001/api';
class Client extends EventEmitter {

    // getDataByDate(startDate, endDate){
    //
    // }
    //
    // getReportData(){
    //
    // }
    //
    // getReportByTimeBin(timeInSecs){
    //
    // }

    bytesToFailure = () => {
        axios({
            method: 'get',
            url: `${ROOT_URL}/bytesToFailure`,
            headers: []
        })
        .then((response) => {
            this.emit('load-chartB-data', response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }


}


export default Client;
