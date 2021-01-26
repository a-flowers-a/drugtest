import React, { useState } from 'react';
import { StyleSheet, Text, View, processColor } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#120078",/*120078 */
        flex: 1,
    },
    text: {
        color: "#f5f4f4",
        fontSize: 20,
        textAlign: "center"
    },
});

export default function Charts(props){

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Here is going to be the selection of the data</Text>
        </View>
    );
}//Charts