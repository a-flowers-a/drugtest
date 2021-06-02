import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

function QuestMarkBtn(props) {

    const { extraStyles, onPressFunc } = props;
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, extraStyles]}
                onPress={() => onPressFunc()}>
                <Text style={[styles.btnText]}>?</Text>
            </TouchableOpacity>
        </View>
    );
}//QuestMarkBtn

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 3,
    },
    btnText: {
        color: "#f5f4f4",
        fontSize: 14,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#010a43", //0028ff 0d0cb5 0900c3 3e64ff 342ead 0779e4 sombra
        borderRadius: 50,
        height: 22,
        width: 22,
    },
})
export default QuestMarkBtn;
