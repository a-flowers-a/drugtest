import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFolderOpen, faBookOpen } from '@fortawesome/free-solid-svg-icons';

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#f5f4f4",/*120078 */
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 15,
    },
    icon: {
        alignSelf: "center",
        color: "#0a043c",
        margin: 10,
    },
    text: {
        color: "#0a043c",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center"
    }
});

function CardMessage (props){

    const {cardText} = props;
    return(
        <View style={styles.card}>
            <FontAwesomeIcon
                icon={faBookOpen}
                style={styles.icon}
                size={60}
            />
            <Text style={styles.text}>{cardText}</Text>
        </View>
    );

}

export default CardMessage;