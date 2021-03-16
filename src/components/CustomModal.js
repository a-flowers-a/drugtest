import React from 'react';
import { Text, TextInput, View, StyleSheet, Modal } from "react-native";
import { useForm, Controller } from "react-hook-form";
import ActionBtn from './ActionBtn';

function CustomModal(props){
    const {onAcceptFunc, onCancelFunc, text, input} = props;
    const { control, handleSubmit, errors } = useForm();

    const styles = StyleSheet.create({
        acceptBtn:{
            backgroundColor: "#79d70f", //afa939 91b029 79d70f cdc733
            borderWidth: 0,
            borderRadius: 8,
            marginHorizontal: 10,
            width: 120,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
        },
        cancelBtn:{
            backgroundColor: "#fa1616",//ec0101 e40017 ff5722 ec4646 ff414d
            borderRadius: 8,
            borderWidth: 0,
            marginHorizontal: 10,
            width: 120,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
        },
        card: {
            backgroundColor: "#f5f4f4",/*120078 */
            borderRadius: 7,
            padding: 15,
            marginHorizontal: 20,
        },
        errorText:{
            color: "#fa1616",
            fontSize: 16,
            textAlign: "left",
            marginHorizontal: 20,
            marginBottom: 15,
        },
        input: {
            borderRadius: 5,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "black",
            color: "black",
            fontSize: 18,
            marginHorizontal: 15,
            marginBottom: 5,
            padding: 10,
        },
        inModalContainer:{
            alignItems: "center",
            justifyContent: 'center',
            backgroundColor:"rgba(2, 6, 28, 0.7)",
            flex:1,
        },
        row:{
            flexDirection: "row",
            justifyContent: "center"
        },
        text: {
            color: "#2d132c",
            fontSize: 20,
            textAlign: "center",
            margin: 10,
        },
    });

    return (
        <Modal
            transparent={true}
            visible={true}
        >
            <View style={styles.inModalContainer}>
                <View style={styles.card}>
                    <Text style={styles.text}>{text}</Text>
                    {input && (
                        <View>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                    <TextInput
                                        onBlur={onBlur}
                                        keyboardType='numeric'
                                        maxLength={10}
                                        style={styles.input}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )}
                                name="boleta"
                                rules={{ required: true }}
                                defaultValue=""
                            />
                            {errors.boleta && <Text style={styles.errorText}>Campo requerido</Text>}
                        </View>
                    )}
                    <View style={styles.row}>
                        <ActionBtn 
                            btnText={"Cancelar"}
                            extraStyles={[styles.cancelBtn]}
                            onPressFunc={onCancelFunc}
                        />
                        <ActionBtn 
                            btnText={"Aceptar"}
                            extraStyles={[styles.acceptBtn]}
                            onPressFunc={input ? handleSubmit(onAcceptFunc) : onAcceptFunc}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}//TopAlert

export default CustomModal;