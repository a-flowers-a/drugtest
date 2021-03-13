import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCapsules, faSpa, faLightbulb } from '@fortawesome/free-solid-svg-icons';

function ResultItem(){
    const styles = StyleSheet.create({
        card: {
            backgroundColor: "#e7e6e1",/*120078 */
            borderRadius: 10,
            flex: 1,
            flexDirection: "row",
            marginHorizontal: 20,
            marginVertical: 10,
            padding: 10,
            //font color 0a043c
        },
        icon:{
            color: "#0a043c",
            marginRight: 15,
        },
        infoContainer: {
            flex: 1,
        },
        row:{
            justifyContent: "space-between",
            flexDirection: "row",
        },
        textRisk: {
            color: "black",
            fontSize: 18,
            fontWeight: "bold",
        },
        textDate: {
            color: "#838383",//839b97 aaaaaa
            fontSize: 16,
            //fontWeight: "bold",
        },
    });
    return (
        <View style={styles.card}>
            <FontAwesomeIcon
                icon={ faLightbulb }
                style={styles.icon}
                size={40}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.textRisk}>Riesgo Alto/Medio/Bajo</Text>
                <View style={styles.row}>
                    <Text style={styles.textDate}>Fecha realización</Text>
                </View>
            </View>
        </View>
    );
}//ResultItem

export default ResultItem;