import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { OkCancelAlert } from '../components/CustomAlerts';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCloud, faComment, faCommentDots, faEraser, faMinus, faMinusCircle, faMinusSquare, faPen, faPencilAlt, faPenFancy, faPowerOff, faQuestion, faTrash, faUserCircle } from '@fortawesome/free-solid-svg-icons';


function HomeScreen(props) {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#120078",/*120078 */
            flex: 1,
            paddingVertical: 20,
        },
        icon:{
            color: "#f5f4f4",
            marginRight: 15,
        },
        optionContainer:{
            marginHorizontal: 60,
            marginVertical: 10,
        },
        row:{
            alignItems: "center", //vertically
            //backgroundColor: "black",
            //flex: 1,
            flexDirection: "row",
            marginHorizontal: 20,
        },
        text:{
            color: "#f5f4f4",
            fontSize: 20,
        },
        title:{
            fontSize: 40,
        },
        titleContainer: {
            marginBottom: 30,
        },
    });

    function navigateTo(screenOption){
        props.navigation.navigate(screenOption);
    }//navigateTo

    return (
        <ScrollView style={styles.container}>
            <View style={[styles.row, styles.titleContainer]}>
                <FontAwesomeIcon
                    icon={ faUserCircle }
                    style={styles.icon}
                    size={40}
                />
                <Text style={[styles.text, styles.title]}>Nombre Alumno</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    OkCancelAlert({title: "Log Out", message: "¿Quieres cerrar sesión?"},
                        () => {props.navigation.navigate('Home');},
                        () => {}
                    );
                }}
                style={[styles.row, styles.optionContainer]}
            >
                <FontAwesomeIcon
                    icon={ faPowerOff }
                    style={styles.icon}
                    size={20}
                />
                <Text style={[styles.text]}>Cerrar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {navigateTo('Datos Cuenta');}}
                style={[styles.row, styles.optionContainer]}
            >
                <FontAwesomeIcon
                    icon={ faPen /*faPencilAlt faPen faPenFancy*/}
                    style={styles.icon}
                    size={20}
                />
                <Text style={[styles.text]}>Modificar datos de la cuenta</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {}}
                style={[styles.row, styles.optionContainer]}
            >
                <FontAwesomeIcon
                    icon={ faEraser /*faEraser faTrash faMinus*/}
                    style={styles.icon}
                    size={20}
                />
                <Text style={[styles.text]}>Eliminar Cuenta</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {navigateTo('WhatWeDo');}}
                style={[styles.row, styles.optionContainer]}
            >
                <FontAwesomeIcon
                    icon={ faCommentDots /*faCloud faComment faQuestion*/}
                    style={styles.icon}
                    size={20}
                />
                <Text style={[styles.text]}>¿Qué hacemos con tus chats?</Text>
            </TouchableOpacity>
            
        </ScrollView>
    );
}//HomeScreen

export default HomeScreen;