import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ActionBtn from '../components/ActionBtn';


function HomeScreen(props) {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#120078",/*120078 */
            flex: 1,
        },
        text:{
            color: "#f5f4f4",
            fontSize: 40,
            textAlign: "left",
            padding: 50,
        },
    });

    function sendToSignOut() {
        //must be the name that's in Stack.Screen
        //props.navigation.navigate('Questionaire');
    }//handlePress

    function sendModifyToScreen() {
        //must be the name that's in Stack.Screen
        //props.navigation.navigate('Questionaire');
    }//handlePress


    function sendWhatWeDo() {
        //must be the name that's in Stack.Screen
        props.navigation.navigate('WhatWeDo');
    }//sendWhatWeDo

    return (
        <ScrollView style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Nombre Alumno</Text>
            </View>

            <ActionBtn
                btnText={"Cerrar Sesión"}
                onPressFunc={sendToSignOut}
            />
            <ActionBtn
                btnText={"Modificar datos de la cuenta"}
                onPressFunc={sendModifyToScreen}
            />
            <ActionBtn
                btnText={"¿Qué hacemos con tus chats?"}
                onPressFunc={sendWhatWeDo}
            />
            
        </ScrollView>
    );
}//HomeScreen

export default HomeScreen;