import { Alert } from "react-native";

export const OkAlert = (data, onOk) => {
  const okFunc = onOk || (() =>{});
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
              { text: "OK", onPress: () => okFunc() }//onOK()
            ],
            { cancelable: false }
          )
    );
}//OkAlert

export const OkCancelAlert = (data, onOk, onCancel) => {
  const okFunc = onOk || (() =>{});
  const cancelFunc = onCancel || (() =>{});
  return(
      Alert.alert(
          data.title,
          data.message,
          [
            {
              text: "Cancel",
              onPress: () => cancelFunc(),
              style: "cancel"
            },
            { text: "OK", onPress: () => okFunc() }
          ],
          { cancelable: false }
        )
  );
}//OkCancelAlert