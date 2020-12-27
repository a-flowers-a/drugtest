import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

function QuestionFPt(props){

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

    
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.qText}>{props.question}</Text>
            </View>
            
            <TouchableOpacity
                style={styles.button}
                onPress={() => props.onPressFunc(props.questIndex, 1)}
            >
                <Text style={styles.btnText}>Diario o casi diario</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => props.onPressFunc(props.questIndex, 2)}
            >
                <Text style={styles.btnText}>Semanal</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => props.onPressFunc(props.questIndex, 3)}
            >
                <Text style={styles.btnText}>Mensual</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => props.onPressFunc(props.questIndex, 4)}
            >
                <Text style={styles.btnText}>Menos que mensual</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => props.onPressFunc(props.questIndex, 5)}
            >
                <Text style={styles.btnText}>Nunca</Text>
            </TouchableOpacity>
        </View>
    );
}//QuestionFPt

export default QuestionFPt;