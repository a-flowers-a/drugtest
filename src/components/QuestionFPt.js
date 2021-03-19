import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import ActionBtn from '../components/ActionBtn';

function QuestionFPt(props){

    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
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

    //run to save the values
    const {toSave} = props;
    toSave();
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.qText}>{props.question}</Text>
            </View>
            
            <ActionBtn 
                btnText={"Diario o casi diario"}
                onPressFunc={() => props.onPressFunc(props.questIndex, 4)}
            />
            <ActionBtn 
                btnText={"Semanal"}
                onPressFunc={() => props.onPressFunc(props.questIndex, 3)}
            />
            <ActionBtn 
                btnText={"Mensual"}
                onPressFunc={() => props.onPressFunc(props.questIndex, 2)}
            />
            <ActionBtn 
                btnText={"Menos que mensual"}
                onPressFunc={() => props.onPressFunc(props.questIndex, 1)}
            />
            <ActionBtn 
                btnText={"Nunca"}
                onPressFunc={() => props.onPressFunc(props.questIndex, 0)}
            />
        </View>
    );
}//QuestionFPt

export default QuestionFPt;