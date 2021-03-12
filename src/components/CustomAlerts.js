import React from 'react';
import { Alert } from "react-native";

export const SuccessAlert = (data) => {
    return(
        Alert.alert(
            "Éxito",
            "mensaje",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          )
    );
}//postRequest