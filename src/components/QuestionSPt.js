import React, { useState } from 'react';
import { Text, View, StyleSheet, Platform } from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import ActionBtn from '../components/ActionBtn';
import questionsII from '../res/questionsII';
import { store } from '../utils/storage';

function QuestionSPt(props){

    const {onPressFunc, txtInput, secQNum,
        subQstIndex, subsIndxToDspl, display} = props;
    const [textValue, onChangeText] = useState("");

    async function saveQstIndex(){
        const stsecQNum = await store("secQNum", secQNum.toString());
        const stSubQstIndex = await store("subQstIndex", subQstIndex.toString());
        const stSubsIndxToDspl = await store("subsIndxToDspl", JSON.stringify(subsIndxToDspl));
        const stDisplay = await store("display", JSON.stringify(display));
        if(stsecQNum==null)
            console.log("could not storage SPart secQNum");
        else
            console.log("stored SPart secQNum", secQNum);
        if(stSubQstIndex==null)
            console.log("could not storage SPart stSubQstIndex");
        else
            console.log("stored SPart subQstIndex", subQstIndex);
        if(stSubsIndxToDspl==null)
            console.log("could not storage SPart stSubsIndxToDspl");
        else
            console.log("stored SPart subsIndxToDspl", subsIndxToDspl);
        if(stDisplay==null)
            console.log("could not storage SPart stDisplay");
        else
            console.log("stored SPart display", display);
    }//saveQstIndex

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.qText}>{questionsII[subsIndxToDspl[secQNum]][subQstIndex]}</Text>
            </View>
            
            {!txtInput && (
                <ActionBtn 
                    btnText={"Sí"}
                    onPressFunc={() => {
                        saveQstIndex();
                        onPressFunc(true);
                    }}
                />
            )}

            {!txtInput && (
                <ActionBtn 
                    btnText={"No"}
                    onPressFunc={() => {
                        saveQstIndex();
                        onPressFunc(false);
                    }}
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
                        autoCapitalize={"none"}
                        onChangeText={text => onChangeText(text)}
                        value={textValue}
                    />
                    <ActionBtn 
                        btnText={"Siguiente"}
                        onPressFunc={() => {
                            saveQstIndex();
                            onPressFunc(textValue);
                        }}
                    />
                </View>
            )}

        </View>
    );
}//QuestionSPt


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    textInput: {
        borderWidth: 1,
        color: "#010101",
        fontSize: 18,
        height: 46,
        marginBottom: 10,
    },
    textInputAndroid:{
        borderWidth: 2,
        color: "#fefefe",
        padding: 5,
    },
    textInputIOS:{
        borderRadius: 8,
        borderColor: "#fefefe",//#0070f3
        padding: 5,
    },
    textContainer: {
        backgroundColor: "#3399FF", /*#3399FF #3e64ff */
        borderRadius: 10,
        marginHorizontal: 15,
        marginVertical: 20,
        paddingHorizontal: 15,
        paddingVertical: 30,
    },
    qText: {
        color: "#fefefe",//#010101 #f5f4f4
        fontSize: 20,
        textAlign: "center"
    },
});

export default QuestionSPt;