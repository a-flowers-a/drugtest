import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


function HomeScreen() {

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>Tu información no es divulgada con alguien más, el contenido de tus chats no es leído ni siquiera por los desarrolladores de esta aplicación, dicho contenido será almacenado en nuestra base de datos hasta que se haya terminado el análisis, una vez concluido, nosotros no tenemos razón para continuar guardando esa información, por lo que el contenido es borrado de nuestra base de datos. Así mismo, te informamos que no almacenamos nombres propios ni de personas ni lugares, ningún dato encontrado en tu chat será almacenado, únicamente el resultado del análisis para poder mostrártelo en tu cuenta.</Text>
            <Text style={styles.text}>Igualmente te informamos que tus resultados pueden tomados para la obtención de estadísticas en tu Unidad Académica, no obstante, no se mostrarán tus datos personales; es decir, en estas estadísticas no se proporcionarán: tu nombre, boleta, correo ni mucho menos tus credenciales de la aplicación.</Text>
        </ScrollView>
    );
}//HomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#aed1f5",/*#120078 */
        flex: 1,
    },
    text:{
        color: "black",
        fontSize: 20,
        textAlign: "justify" ,
        padding: 20,
    },
});
export default HomeScreen;