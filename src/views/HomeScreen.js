import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ActionBtn from '../components/ActionBtn';
import { get, store } from '../utils/storage';


function HomeScreen(props) {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#120078",/*120078 */
            flex: 1,
        },
    });

    function navigateTo(screenOption) {
        props.navigation.navigate(screenOption);
    }//navigateTo

    async function test() {
        const user = await get("user");
        console.log("user in Home", user);
    }//

    async function getFlags() {

        const flags = await get("analysisFlags");
        if (flags != null) {
            setAnalFlags(JSON.parse(flags));
            console.log("Banderas obtenidas en home " + flags);
        }
    }

    async function resetFlags() {
        const storedFlags = await store("analysisFlags", JSON.stringify({ questSent: false, chatsSent: false }));
        if (!storedFlags)
            OkAlert({ title: "Error", message: "No se ha podido iniciar un nuevo análisis por favor inténtelo más tarde" },
                () => { props.navigation.navigate('Inicio'); }
            );
    }

    test();

    useEffect(() => {
        getFlags();
    }, []);

    const [analFlags, setAnalFlags] = useState({
        questSent: false,
        chatSent: false,
    });

    return (
        <ScrollView style={styles.container}>

            <ActionBtn
                btnText={"Realizar Cuestionario"}
                onPressFunc={() => navigateTo('Cuestionario')}
                hidden={analFlags.questSent}
            />
            <ActionBtn
                btnText={"Exportar chats"}
                hidden={analFlags.chatsSent}
            />
            <ActionBtn
                btnText={"Mostrar Resultado"}
                onPressFunc={() => navigateTo('Resultado')}
                hidden={!(analFlags.questSent === true && analFlags.chatsSent === true)}
            />
            <ActionBtn
                btnText={"Nuevo análisis"}
                onPressFunc={resetFlags}
                hidden={!(analFlags.questSent === true && analFlags.chatsSent === true)}
            />
            <ActionBtn
                btnText={"Login"}
                onPressFunc={() => navigateTo('Login')}
            />
            <ActionBtn
                btnText={"Ver Contactos de apoyo"}
                onPressFunc={() => navigateTo('Contactos')}
            />
            <ActionBtn
                btnText={"Ver resultados anteriores"}
                onPressFunc={() => navigateTo('Resultados Anteriores')}
            />

        </ScrollView>
    );
}//HomeScreen

export default HomeScreen;