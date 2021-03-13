import React from 'react';
import { Alert } from "react-native";

export const OkAlert = (data, onOk) => {
    return(
        Alert.alert(
            data.title,
            data.message,
            [
              /*{
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },*/
              { text: "OK", onPress: () => onOk() }
            ],
            { cancelable: false }
          )
    );
}//postRequest