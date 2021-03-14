import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ActionBtn from '../components/ActionBtn';
import { OkCancelAlert } from '../components/CustomAlerts';


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

    function navigateTo(screenOption){
        props.navigation.navigate(screenOption);
    }//navigateTo

    return (
        <ScrollView style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Nombre Alumno</Text>
            </View>

            <ActionBtn
                btnText={"Cerrar Sesión"}
                onPressFunc={() => {
                    OkCancelAlert({title: "Log Out", message: "¿Quieres cerrar sesión?"},
                        () => {props.navigation.navigate('Home');},
                        () => {}
                    );
                }}
            />
            <ActionBtn
                btnText={"Modificar datos de la cuenta"}
                onPressFunc={() => {navigateTo('Datos Cuenta');}}
            />
            <ActionBtn
                btnText={"¿Qué hacemos con tus chats?"}
                onPressFunc={() => {navigateTo('WhatWeDo');}}
            />
            
        </ScrollView>
    );
}//HomeScreen

export default HomeScreen;