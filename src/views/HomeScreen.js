import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ActionBtn from '../components/ActionBtn';
import ChatUpload from '../components/ChatUpload';
import { getRequest } from '../utils/HttpRequest';
import { iosGet, iosStore } from '../utils/iosStorage';
import { get, store } from '../utils/storage';
import Login from './Login';
import {androidHost} from '../utils/hosts';
import { OkAlert } from '../components/CustomAlerts';
import Loading from '../components/Loading';

const localHost = Platform.OS == 'ios' ? "localhost" : androidHost;

function HomeScreen(props) {
    const {reloadLogged, reloadValue} = props;
    const [analFlags, setAnalFlags] = useState({
        questSent: false,
        chatSent: 0,
    });
    const [loading, setLoading] = useState(false);

    function navigateTo(screenOption) {
        props.navigation.navigate(screenOption);
    }//navigateTo

    async function getInfo() {
        setLoading(true);
        const flags = await get("analysisFlags");
        if (flags != null) {
            let idResFin = 0;
            if(Platform.OS === 'ios')
            {
                idResFin = await iosGet();
            }
            else
            {
                idResFin = JSON.parse(flags).idResFinal;
            }
            const numChats = await getNumChats(idResFin);
            console.log("numchats from server inside getInfo in Home Screen", numChats);
            const questFlag = JSON.parse(flags).questSent;
            setAnalFlags({questSent: questFlag, chatSent: numChats});
            const storedChats = JSON.parse(flags).chatsSent;
            if(storedChats !== numChats)
            {
                const stored = await store("analysisFlags", JSON.stringify({ questSent: questFlag, chatsSent: numChats, idResFinal:idResFin }));
                if(!stored)
                    OkAlert({ title: "Error", message: "No se ha podido guardar un dato en el storage de tu dispositivo" });
            }
        }
        setLoading(false);
    }//getInfo

    async function getNumChats(idResFinal){
        const url = `http:${localHost}:3030/analysis/get-num-chats/${idResFinal}`;
        return await getRequest(url)
        .then(response => {
            if (response.success) {
                return response.numChats
            }
            else {
                let mess = "Hubo un error en el servidor";
                if(response.idNotFound)
                    mess = "No existe análisis iniciado" 
                OkAlert({ title: "Error", message: mess });
            }
        })
        .then(numChats => numChats)
        .catch(error => {
            OkAlert({ title: "Error", message: "No se pudo conectar con el servidor para obtener el número de chats enviados" });
            console.log(error);
        });
    }//getNumChats

    async function resetFlags() {
        let storedios = true;
        if(Platform.OS === 'ios')
            storedios = await iosStore("");
        const storedFlags = await store("analysisFlags", JSON.stringify({ questSent: false, chatsSent: 0, idResFinal:null }));
        if (!storedFlags || !storedios)
            OkAlert({ title: "Error", message: "No se ha podido reiniciar valores en el storage del dispositivo" });
        else
            setAnalFlags({ questSent: false, chatsSent: 0 });
    }//resetFlags

    useEffect(() => {
        if(reloadValue)
            getInfo();
    }, []);

    if(!reloadValue)
        return (
            <Login
                navigation={props.navigation}
                reloadLogged={reloadLogged}
            />
        );
        
    return (
        <ScrollView style={styles.container}>
            {loading && <Loading />}
            <ActionBtn
                btnText={"Realizar Cuestionario"}
                onPressFunc={() => navigateTo('Cuestionario')}
                disabled={analFlags.questSent}
            />
            <ChatUpload
                onPressFunc={getInfo}
                numChats={analFlags.chatSent}
            />
            <ActionBtn
                btnText={"Mostrar Resultado"}
                onPressFunc={() => navigateTo('Resultado')}
                disabled={!(analFlags.chatSent == 3)}
            />
            <ActionBtn
                btnText={"Nuevo análisis"}
                onPressFunc={resetFlags}
                disabled={!analFlags.questSent}
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#120078",/*120078 */
        flex: 1,
    },
});

export default HomeScreen;