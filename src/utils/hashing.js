import { sha256 } from 'react-native-sha256';

export const hash = async (first, second) => {
    return await Promise.all([sha256(first), second && sha256(second)])
    .then(twoDigests => {
        //console.log("the digest in hashing", twoDigests);
        return twoDigests;
    })
    .catch(err => {
        console.error("err at hashing",err);
        return [];
    });
}//postRequest