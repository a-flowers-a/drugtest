import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import UrlButton from '../components/UrlButton';


function HomeScreen() {

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>El contenido de tus chats no es leído ni siquiera por los desarrolladores de esta aplicación, a algunos segmentos de chat le será analizado el sentimiento con Google Natural Language. El contenido del chat será almacenado cifrado (AES-256) en nuestra base de datos. Así mismo, te informamos que no almacenamos nombres propios ni de personas ni lugares; ningún dato encontrado en tu chat será almacenado, únicamente el resultado del análisis para poder mostrártelo en tu cuenta.</Text>
            <Text style={styles.text}>Igualmente, te informamos que tus resultados pueden tomados para la obtención de estadísticas en tu Unidad Académica. No obstante, no se mostrarán tus datos personales; es decir, en estas estadísticas no se proporcionarán: tu nombre, boleta, correo, ni mucho menos tus credenciales de la aplicación.</Text>
            <View style={styles.UrlView}>
                <UrlButton />
            </View>
        </ScrollView>
    );
}//HomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#aed1f5",/*#120078 */
        flex: 1,
    },
    text: {
        color: "black",
        fontSize: 20,
        textAlign: "justify",
        padding: 20,
    },
    UrlView: {
        paddingBottom: 20,
        alignSelf: "center",
    },
});
export default HomeScreen;