import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBrain, faBookReader, faIdCardAlt, faClock } from '@fortawesome/free-solid-svg-icons';

function ContactItem(props) {

    const { escuela, nombre, telContacto, horario } = props;

    return (
        <View
            style={styles.card}
        >
            <FontAwesomeIcon
                icon={faBrain}
                style={styles.icon}
                size={40}
            />
            <View style={styles.infoContainer}>

                <Text style={styles.textName}>{escuela}</Text>
                {<View style={styles.row}>
                    <FontAwesomeIcon
                        icon={faBookReader}
                        style={[styles.icon, styles.miniIcon]}
                        size={20}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.textPhone}>{telContacto}</Text>
                    </View>
                </View>}
                {nombre && <View style={styles.row}>
                    <FontAwesomeIcon
                        icon={faIdCardAlt}
                        style={[styles.icon, styles.miniIcon]}
                        size={20}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.textSchool}>{nombre}</Text>
                    </View>
                </View>}
                {horario && <View style={styles.row}>
                    <FontAwesomeIcon
                        icon={faClock}
                        style={[styles.icon, styles.miniIcon]}
                        size={20}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.textSchool}>{horario}</Text>
                    </View>
                </View>}
            </View>
        </View>
    );
}//ContactItem

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fefefe",/* #e7e6e1*/
        borderRadius: 10,
        flex: 1,
        flexDirection: "row",
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        //font color 0a043c
    },
    icon: {
        alignSelf: "center",
        color: "#0070f3", //#0a043c #0070f3 #150e56
        marginRight: 15,
    },
    infoContainer: {
        flex: 1,
        //padding: 5
    },
    miniIcon : {
        color: "#1f147e",//#1f147e #1c1271 #150e56 #201584
    },
    row: {
        flexDirection: "row",
    },
    textContainer:{
        flex:1,
    },
    textName: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
    },
    textPhone: {
        color: "#838383",//#839b97 #aaaaaa #838383
        fontSize: 16,
        //fontWeight: "bold",
    },
    textSchool: {
        color: "#838383",//#a6a6a4 #a3d2ca #a6a6a4
        fontSize: 16,
    },
});

export default ContactItem;