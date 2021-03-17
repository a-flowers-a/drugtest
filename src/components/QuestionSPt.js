import React, { useState } from 'react';
import { Text, View, StyleSheet, Platform } from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import ActionBtn from '../components/ActionBtn';

function QuestionSPt(props){

    const styles = StyleSheet.create({
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
                <ActionBtn 
                    btnText={"Sí"}
                    onPressFunc={() => onPressFunc(substanceIndex,true)}
                />
            )}

            {!txtInput && (
                <ActionBtn 
                    btnText={"No"}
                    onPressFunc={() => onPressFunc(substanceIndex,false)}
                />
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
                    <ActionBtn 
                        btnText={"Siguiente"}
                        onPressFunc={() => onPressFunc(substanceIndex,textValue)}
                    />
                </View>
            )}

        </View>
    );
}//QuestionSPt

export default QuestionSPt;