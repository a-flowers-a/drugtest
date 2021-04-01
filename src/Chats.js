//On this document we will do chat processing
/*
    -Fetching file on phone's filesystem
    -Cut chat to only messages from last month
    -Storage shorter version of the chat into a json array
    -Send the chat to the backend
 */

import RNFetchBlob from 'rn-fetch-blob';
import { PermissionsAndroid } from 'react-native';
import { Platform } from 'react-native';
import { postRequest } from './utils/HttpRequest'

function saveChatReceived(chatURI) {
    if (Platform.OS === 'ios') {
        console.log(chatURI);
        fetchChatIOS(chatURI);
    } else if (Platform.OS === 'android') {
        //for Android up to 6.0 version ask the user for permission to access the local storage
        if (requestStoragePermission()) {
            //Fetch chat by using its URI
            fetchChatAndroid(chatURI);
        }
    }
}

//Looks for the chat inside the mobile storage, reads the chat and splits it into an array of messages
const fetchChatAndroid = (chatURI) => {
    RNFetchBlob.fs
        .readStream(chatURI, 'utf8')
        .then((stream) => {

            let data = '';
            stream.open();
            console.log('Chat found!!...');
            stream.onData((chunk) => {
                data += chunk;
            });
            stream.onEnd(() => {
                console.log('Reading chat...');
                //cutChat(data);
                chatToTXT();
            });
        })
        .catch((err) => {
            console.error(err);
        });
}; //fetchChatAndroid

const fetchChatIOS = (chatURI) => {

    //Remove file// prefix 
    let arr = chatURI.split('//');
    decodedFilePath = decodeURI(arr[1]);

    RNFetchBlob.fs.exists(decodedFilePath)
        .then((exist) => {
            console.log(`file ${exist ? '' : 'not'} exists`);
            RNFetchBlob.fs.readFile(decodedFilePath, 'utf8')
            .then((data) => {
                console.log("el chat",data);
            });
        })
        .catch(() => { console.error(err) });
}//fetchChatIOS

const cutChat = async (chatContent) => {
    try {
        var messagesArray = chatContent.split('\n'); //Turn string into array

        messagesArray.reverse(); //Put array backwards to get last messages first

        var validDateMessages = await messagesArray.filter(filterbyDate);

        //console.log(validDateMessages);
        //await sendChatToBackend(validDateMessages);

    } catch (error) {

    }
}; //cutChat

var today = new Date(); //THIS MIGHT NOT GO HERE!!

const filterbyDate = (message) => {
    if (message) {
        //if message is not empty like this ""

        var messageDate = message.split(',', 1); //get date
        if (messageDate[0].search('/') !== -1) {
            //Make sure the message starts with a date

            let mdy = messageDate[0].split('/'); //Get the day, month and year into an array
            let ObjectMessageDate = new Date('20' + mdy[2], mdy[0] - 1, mdy[1]);
            var timeElapsedMs = today.getTime() - ObjectMessageDate.getTime(); // time in ms from today to this message
            var daysElapsed = Math.round(timeElapsedMs / (1000 * 60 * 60 * 24)); //Get the days elapsed
            if (daysElapsed < 30) {
                //console.log(daysElapsed);
                return true;
            }
        }
    } else {
        return false;
    }
};

const chatToTXT = (messagesArray) => {
    ///storage/emulated/0/Download


    const dirs = RNFetchBlob.fs.dirs;
    const NEW_FILE_PATH = dirs.DownloadDir + '/test.txt';
    //RNFetchBlob.fs.createFile(NEW_FILE_PATH, 'foo', 'utf8');
    PruebaSendTxt(NEW_FILE_PATH);

    /*RNFetchBlob.fs.writeStream("storage/emulated/0/Download/chat.txt", 'utf8')
        .then((stream) => {
            stream.write('foo')
            return stream.close()
        }).catch((err) => {
            console.error(err);
        });*/
}


const PruebaSendTxt = (path) => {
    filename = 'test.txt';
    const file = {
        uri: path,             // e.g. 'file:///path/to/file/image123.jpg'
        name: filename,            // e.g. 'image123.jpg',
        type: 'text/plain'             // e.g. 'image/jpg'
    }

    var body = new FormData();
    body.append('file', file);
    body.append('title', 'A beautiful photo!');

    var xhr = new XMLHttpRequest();
    xhr.open('POST', "http:192.168.100.107:3030/chat/save-chat");
    xhr.send(body);
}

const sendChatToBackend = async (validDateMessages) => {

    console.log(validDateMessages);
    const url = "http:192.168.100.107:3030/chat/save-chat";
    const data = {
        chat: validDateMessages,
        boleta: 2017630222,
        password: 123,
    };

    postRequest(url, data)
        .then(result => {
            console.log("result de postReq", result);
            if (result.success) {
                //handle successs
            }
            else {
                console.error('error');
            }
        })
        .catch(err => {
            console.error(err);
        });


}//sendChatToBackend

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

export { saveChatReceived };
