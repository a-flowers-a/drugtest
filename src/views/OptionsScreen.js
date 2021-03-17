import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { OkAlert, OkCancelAlert } from '../components/CustomAlerts';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCloud, faComment, faCommentDots, faEraser, faMinus, faMinusCircle, faMinusSquare, faPen, faPencilAlt, faPenFancy, faPowerOff, faQuestion, faTrash, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { remove } from '../utils/storage';
import {get} from '../utils/storage';


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
    const [userName, setUserName] = useState("Nombre Alumno");

    function navigateTo(screenOption, paramts){
        props.navigation.navigate(screenOption, paramts);
    }//navigateTo

    async function getName(){
        const name = await get("user");
        if(name === null)
            console.log(name);
        else
            setUserName(name);
    }//

    useEffect(() =>{
        getName();
    }, []);
    return (
        <ScrollView style={styles.container}>
            <View style={[styles.row, styles.titleContainer]}>
                <FontAwesomeIcon
                    icon={ faUserCircle }
                    style={styles.icon}
                    size={40}
                />
                <Text style={[styles.text, styles.title]}>{userName}</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    OkCancelAlert({title: "Log Out", message: "¿Quieres cerrar sesión?"},
                        async () => {
                            const removed = await remove("user");
                            if(removed)
                                props.navigation.navigate('Home');
                            else
                                OkAlert({title: "Error", message: "No se ha podido cerrar sesión, inténtalo nuevamente"},
                                    () => {}
                                );
                        },
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
                onPress={() => {navigateTo('Datos Cuenta', {create:false});}}
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