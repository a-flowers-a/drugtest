import axios from 'axios';

export const postRequest = async (url, data) => {
    const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
    })
        .then((result) => {
            console.log("data que se recibe en http", result.data);
            return result.data;
        }).catch(error => {
            console.error(error);
            throw Error(error);
        });
    return response;
}//postRequest

export const getRequest = async (url) => {
    const response = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
    })
        .then((result) => {
            return result.data;
        }).catch(error => {
            console.error("in getRequest", error);
            throw Error(error);
        });
    return response;
}//getRequest