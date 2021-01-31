//On this document we will handle chat processing
/*
    -Fetching file on phone's filesystem
    -Cut chat to only messages from last month
    -Storage shorter version of the chat into a json 
    -Send the chat to the backend
 */
/*
import RNFetchBlob from 'react-native-fetch-blob';
import { PermissionsAndroid } from "react-native";
import { Platform } from 'react-native';

function saveChatReceived(chatURI) {
    //for Android up to 6.0 version ask the user for permission to access the local storage
    if (requestStoragePermission()) {
        //Fetch chat by using its URI
        let chatString = fetchChat(chatURI);
    }
}

//Looks for the chat inside the mobile storage, reads the chat and splits it into an array of messages
const fetchChat = (chatURI) => {
    RNFetchBlob.fs.readStream(chatURI, 'utf8')
        .then((stream) => {
            console.log("Chat found!!...Reading chat...");
            let data = ''
            stream.open()
            stream.onData((chunk) => {
                data += chunk
            })
            stream.onEnd(() => {

                //console.log(data)
                cutChat(data);
                return data;
                //new Blob([data], { type: 'text/plain;charset=utf-8' });
            })
        })
        .catch(err => {
            console.error(err);
        })

}//fetchChat

const cutChat = (chatContent) => {
    var messagesArray = chatContent.split("\n");//Turn string into array

    messagesArray.reverse(); //Put array backwards to get last messages first

    var validDateMessages = messagesArray.filter(filterbyDate);
    console.log(validDateMessages);
    return messagesArray;

}//cutChat

var today = new Date(); //THIS MIGHT NOT GO HERE!!

const filterbyDate = (message) => {
    if (message) { //if message is not empty like this ""

        var messageDate = message.split(",", 1);//get date
        if (messageDate[0].search('/') !== -1) { //Make sure the message starts with a date    

            let mdy = messageDate[0].split("/"); //Get the day, month and year into an array
            let ObjectMessageDate = new Date('20' + mdy[2], mdy[0] - 1, mdy[1])
            var timeElapsedMs = today.getTime() - ObjectMessageDate.getTime(); // time in ms from today to this message
            var daysElapsed = Math.round(timeElapsedMs / (1000 * 60 * 60 * 24)); //Get the days elapsed
            //console.log(daysElapsed);
            if (daysElapsed > 30) {
                return true;
            }

        }
    }
    else {
        return false;
    }
}

//Turn string into txt file
/*const chatToTXT = (chat) =>{
    RNFetchBlob.fs.writeStream('/storage/emulated/0/Download', 'utf8')
    .then((stream) => {
        stream.write('foo')
        console.log("chat saved")
        return stream.close()
        })
        
}


const requestStoragePermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: "Drugtest App External storage permission",
                message:
                    "Drugtest App needs access to your local files " +
                    "so you can do all the tests.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can open the mobile storage");
            return true;
        } else {
            console.log("Files permission denied");
            return false;
        }
    } catch (err) {
        console.warn(err);
    }
};

export { saveChatReceived };
*/