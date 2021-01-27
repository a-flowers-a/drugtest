import axios from 'axios';

export const postRequest = async (url, data) => {
    const response = await axios.post(url, data, {
        headers: {"Content-Type": "application/json"},
    })
    .then((result) => {
        console.log("data que se recibe en http", result.data);
        return result.data;
    }).catch(error => {
        console.log(error);
        return error;
    });
    return response;
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