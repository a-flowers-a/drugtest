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
}//OkAlert

export const OkCancelAlert = (data, onOk, onCancel) => {
  console.log(onCancel);
  return(
      Alert.alert(
          data.title,
          data.message,
          [
            {
              text: "Cancel",
              onPress: () => onCancel(),
              style: "cancel"
            },
            { text: "OK", onPress: () => onOk() }
          ],
          { cancelable: false }
        )
  );
}//OkCancelAlert