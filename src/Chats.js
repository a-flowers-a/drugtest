//On this document we will do chat processing
/*
    -Fetching file on phone's filesystem
    -Cut chat to only messages from last month
    -Storage shorter version of the chat into a json array
    -Send the chat to the backend
 */

import RNFetchBlob from 'rn-fetch-blob';
import { PermissionsAndroid, Platform } from 'react-native';
import { OkAlert } from './components/CustomAlerts';
import { iosGet } from './utils/iosStorage';
import { get } from './utils/storage';

const localHost = Platform.OS == 'ios' ? "localhost" : "192.168.1.89";
let idResFinal = 0;

async function handleChatURI(chatURI) {
    let chatPath = chatURI.split(',')[0];
    const errMess = "No se encontró un dato en el storage de tu dispositivo necesario para realizar el envío, realiza el cuestionario nuevamente.";
    if (Platform.OS === 'ios') {
        //Remove file// prefix 
        const arr = chatURI.split('//');
        chatPath = decodeURI(arr[1]);
        idResFinal = await iosGet();
        if (idResFinal === "")
            return { success: false, message: errMess };
    }
    else {
        console.log("idResFinal got from android in chat.js", idResFinal);
        const analysisFlags = await get("analysisFlags");
        if (analysisFlags)
            idResFinal = JSON.parse(analysisFlags).idResFinal;
        else
            return { success: false, message: errMess };
    }

    if (Platform.OS === 'android' && !requestStoragePermission())
        OkAlert({ title: "Permiso necesario", message: "Sin permiso para acceder a tu almacenamiento, no se puede realizar el análisis." });
    else
        return await sendChat(chatPath);
}//handleChatURI

const sendChat = async (chatURI) => {
    const url = `http:${localHost}:3030/analysis/save-chat/${idResFinal}`;
    console.log("url to send chat in chat.js", url);
    return await RNFetchBlob.fetch('POST', url, {
        'Content-Type': 'application/octet-stream',
    }, RNFetchBlob.wrap(chatURI))
        .then((res) => {
            const parsedRes = JSON.parse(res.data);
            const succ = parsedRes.success;
            if (succ) {
                return parsedRes;
            }
            else {
                console.log("save chat returned ", parsedRes);
                let mess = "Hubo un problema en el servidor, no se pudo guardar chat.";
                if (parsedRes.complete)
                    mess = "Chats completos, espera resultado de análisis."
                return { success: false, message: mess };
            }
        })
        .catch((err) => {
            console.log("error at sendChat in Chat.js", err);
            return { success: false, message: "No se puede conectar con el servidor en este momento." };
        })
}//sendChat

const requestStoragePermission = async () => {
    try {

        //PERMISSIONS.READ_EXTERNAL_STORAGE
        const granted1 = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: "Drugtest storage Permission",
                message:
                    "Drugtest read external storage Permission",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );

        //PERMISSIONS.WRITE_EXTERNAL_STORAGE
        const granted2 = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "Drugtest storage Permission",
                message:
                    "Drugtest write external storage Permission",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );

        if (granted1 && granted2 === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can open the mobile storage');
            return true;
        } else {
            console.log('Files permission denied');
            return false;
        }
    } catch (err) {
        console.warn(err);
    }
};

export { handleChatURI };
