import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBrain, faBookReader, faIdCardAlt, faClock } from '@fortawesome/free-solid-svg-icons';

function ContactItem(props) {
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
        icon: {
            color: "#0a043c",
            marginRight: 15,
        },
        infoContainer: {
            flex: 1,
            flexWrap: 'wrap',
            flexShrink: 1,
        },
        row: {
            flexDirection: "row",
            paddingRight: 25
        },
        textName: {
            color: "black",
            fontSize: 18,
            fontWeight: "bold",
        },
        textPhone: {
            color: "#838383",//839b97 aaaaaa
            fontSize: 16,
            //fontWeight: "bold",
        },
        textSchool: {
            color: "#a6a6a4",//a3d2ca a6a6a4
            fontSize: 16,
        },
    });

    const { onPressFunc, escuela, nombre, telContacto, horario } = props;

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPressFunc}
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
                        style={styles.icon}
                        size={20}
                    />
                    <Text style={styles.textPhone}>{telContacto}</Text>
                </View>}
                {nombre && <View style={styles.row}>
                    <FontAwesomeIcon
                        icon={faIdCardAlt}
                        style={styles.icon}
                        size={20}
                    />
                    <Text style={styles.textSchool}>{nombre}</Text>
                </View>}
                {horario && <View style={styles.row}>
                    <FontAwesomeIcon
                        icon={faClock}
                        style={styles.icon}
                        size={20}
                    />
                    <Text style={styles.textSchool}>{horario}</Text>
                </View>}
            </View>
        </TouchableOpacity >
    );
}//ContactItem

export default ContactItem;