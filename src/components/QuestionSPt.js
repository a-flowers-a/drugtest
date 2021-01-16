import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { TextInput } from 'react-native-gesture-handler';

function QuestionSPt(props){

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
        textInput: {
            borderWidth: 1,
            color: "#f5f4f4",
            fontSize: 18,
            height: 46,
            marginBottom: 10,
        },
        textInputAndroid:{
            borderWidth: 2,
            color: "#fff",
        },
        textInputIOS:{
            borderRadius: 8,
            borderColor: "#fff",
        },
        textContainer: {
            backgroundColor: "#3399FF", /*#3e64ff */
            borderRadius: 10,
            marginHorizontal: 15,
            marginVertical: 20,
            paddingHorizontal: 15,
            paddingVertical: 30,
        },
        qText: {
            color: "#f5f4f4",
            fontSize: 20,
            textAlign: "center"
        },
    });

    const {question, onPressFunc, substanceIndex, txtInput} = props;
    const [textValue, onChangeText] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.qText}>{question}</Text>
            </View>
            
            {!txtInput && (
                <TouchableOpacity
                style={styles.button}
                onPress={() => onPressFunc(substanceIndex,true)}
                >
                    <Text style={styles.btnText}>Sí</Text>
                </TouchableOpacity>
            )}

            {!txtInput && (
                <TouchableOpacity
                style={styles.button}
                onPress={() => onPressFunc(substanceIndex,false)}
                >
                    <Text style={styles.btnText}>No</Text>
                </TouchableOpacity>
            )}

            {txtInput && (
                <View>
                    <TextInput
                        style={[styles.textInput,
                            Platform.OS == 'ios' ?
                            styles.textInputIOS :
                            styles.textInputAndroid
                        ]}
                        onChangeText={text => onChangeText(text)}
                        value={textValue}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onPressFunc(substanceIndex,textValue)}
                        >
                            <Text style={styles.btnText}>Siguiente</Text>
                    </TouchableOpacity>
                </View>
            )}

        </View>
    );
}//QuestionSPt

export default QuestionSPt;