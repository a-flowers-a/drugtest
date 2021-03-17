import AsyncStorage from '@react-native-async-storage/async-storage';

export const store = async (key, value) =>{
    try{
        await AsyncStorage.setItem(key, value);
        return true
    }catch(err){
        console.log("storage store err", err);
        return false;
    }
}//store

export const get = async (key) =>{
    try {
        return await AsyncStorage.getItem(key);
    } catch (err) {
        console.log("storage get err", err);
        //throw Error(err);
    }
}//get

export const multiGet = async (keys) =>{
    try {
        return await AsyncStorage.multiGet(keys);
    } catch (error) {
        console.log("storage multiGet err", err);
        //throw Error(err);
    }
}//multiGet

export const getAllKeys = async () =>{
    try {
        return await AsyncStorage.getAllKeys();
    } catch (err) {
        console.log("storage AllKeys err", err);
        //throw Error(err);
    }
}//getAllKeys

export const remove = async (key) =>{
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (err) {
        console.log("storage remove err", err);
        return false;
    }
}//remove