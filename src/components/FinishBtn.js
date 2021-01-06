import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

function FinishBtn(props){

    const styles = StyleSheet.create({
        btnText: {
            color: "#f5f4f4",
            fontSize: 18,
        },
        button: {
            alignItems: "center",
            borderColor: "blue",
            borderStyle: "solid",
            borderWidth: 1,
            height: 50,
            marginVertical: 10,
            padding: 10,
            width: 300
        },
        container: {
            alignItems: "center",
        },
    });
    
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => props.onPressFunc()}
            >
                <Text style={styles.btnText}>{props.btnText}</Text>
            </TouchableOpacity>
        </View>
    );
}//FinishBtn

export default FinishBtn;