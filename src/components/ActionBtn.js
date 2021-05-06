import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

function FinishBtn(props) {

    const { extraStyles, onPressFunc, btnText, disabled } = props;
    return (
        <View style={styles.container}>
            <TouchableOpacity disabled={disabled}
                style={[styles.button, extraStyles, disabled ? styles.disabledBtn : styles.activeBtn]}
                onPress={() => onPressFunc()}>
                <Text style={[styles.btnText, disabled && styles.disabledTxt]}>{btnText}</Text>
            </TouchableOpacity>
        </View>
    );
}//FinishBtn

const styles = StyleSheet.create({
    activeBtn: {
        shadowColor: "#120078",//#b0deff #5edfff #010a43 #000 #120078
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    btnText: {
        color: "#f5f4f4",
        fontSize: 18,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#3a80f8", //0028ff 0d0cb5 0900c3 3e64ff 342ead 0779e4 sombra 
        borderColor: "#3a80f8",//#0070f3 #0d0cb5
        borderRadius: 10,
        height: 50,
        marginVertical: 10,
        padding: 10,
        width: 300,
    },
    container: {
        alignItems: "center",
    },
    disabledBtn: {
        backgroundColor: "#5a94f9", //rgba(13, 12, 181,0.3)
        borderWidth: 1,
    },
    disabledTxt: {
        color: "#dedddd",//#eae9e9 #dedddd #C1C1C1
    }

});

export default FinishBtn;