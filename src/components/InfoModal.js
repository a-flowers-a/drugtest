import React, { useState } from 'react';
import { Text, View, StyleSheet, Modal } from "react-native";
import ActionBtn from './ActionBtn';

function InfoModal(props) {
    const { onAcceptFunc, text } = props;

    return (
        <Modal
            transparent={true}
            visible={true}>
            <View style={styles.inModalContainer}>
                <View style={styles.card}>
                    <Text style={styles.text}>{text}</Text>
                    <View style={styles.row}>
                        <ActionBtn
                            btnText={"Aceptar"}
                            extraStyles={[styles.acceptBtn]}
                            onPressFunc={onAcceptFunc}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    inModalContainer: {
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "rgba(2, 6, 28, 0.7)",
        flex: 1,
    },
    acceptBtn: {
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
    card: {
        backgroundColor: "#f5f4f4",/*120078 */
        borderRadius: 7,
        padding: 15,
        marginHorizontal: 20,
    },
    text: {
        color: "#2d132c",
        fontSize: 14,
        textAlign: "justify",
        margin: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "center"
    },
    btnText: {
        color: "#f5f4f4",
        fontSize: 18,
    },

});

export default InfoModal;