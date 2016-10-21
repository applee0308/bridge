import axios from 'axios';
import getSysInfo from './utils/getSysInfo.js';
console.log(getSysInfo());

axios.get('/data.json', {
        params: {
            ID: 12345
        }
    })
    .then(function(response) {
        console.log(response.data);
    })
    .catch(function(error) {
        console.log(error);
    });
