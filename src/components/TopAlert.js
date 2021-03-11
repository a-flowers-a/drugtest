import React, { useState } from 'react';
import { Text, View, StyleSheet } from "react-native";
import ActionBtn from '../components/ActionBtn';

function TopAlert(props){
    const {onAcceptFunc, onCancelFunc} = props;
    //const [display, setDisplay ] = useState(true);

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            backgroundColor: "rgba(2, 6, 28, 0.7)",/*120078 */
            flex: 1,
            justifyContent: 'center', 
            position: 'absolute',
            top: 0,
            left: 0, 
            right: 0, 
            bottom: 0, 
        },
        card: {
            backgroundColor: "#f5f4f4",/*120078 */
            borderRadius: 7,
            padding: 15,
            /*position: 'absolute',
            alignSelf: 'center',
            bottom: '-5%'*/
        },
        text: {
            color: "#2d132c",
            fontSize: 20,
            textAlign: "left",
            margin: 10,
        },
    });

    return (
        
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.text}>Text inside a centered view</Text>
                <ActionBtn 
                    btnText={"Cancelar"}
                    onPressFunc={onCancelFunc}
                />
                <ActionBtn 
                    btnText={"Aceptar"}
                    onPressFunc={onAcceptFunc}
                />
            </View>
        </View>
        
        
    );
}//TopAlert

export default TopAlert;