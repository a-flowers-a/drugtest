import axios from 'axios';

export const postRequest = async (url, data) => {
    await axios.post(url, data, {
        headers: {"Content-Type": "application/json"},
    })
    .then((result) => {
        return result.data;
    }).catch(error => {
        console.log(error);
        return false;
    });
}//postRequest

export const getRequest = async (url) => {
    await axios.get(url, {
        headers: {"Content-Type": "application/json"},
    })
    .then((result) => {
        return result.data;
    }).catch(error => {
        console.log(error);
        return false;
    });
}//getRequest