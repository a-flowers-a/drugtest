import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, processColor, Platform } from 'react-native';
import ActionBtn from '../components/ActionBtn';
import { postRequest } from '../utils/HttpRequest';
import Loading from '../components/Loading';
import {androidHost} from '../utils/hosts';
import Login from './Login';
import { get } from '../utils/storage';
import RadioBtn from '../components/RadioBtn';
import { OkAlert } from '../components/CustomAlerts';

export default function StatsScreen(props) {
    const localHost = Platform.OS == 'ios' ? "localhost" : androidHost;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filters, toggleFilters] = useState({
        students: false,
        final: false,
        classifier: false,
        questionnaire: false,
        sentiments: false,
    });
    const {navigation, reloadLogged, reloadValue } = props;

    async function getUser(){
        const userSt = await get("user");
        if(userSt != null)
        {
            console.log("user in StatsScreen", JSON.parse(userSt));
            setUser(JSON.parse(userSt));
        }
        else
            OkAlert({title: "Error", message: "No se ha podido encontrar usuario en storage"});
    }//getUser

    function handleFilters(name, value){
        toggleFilters(prevFilVals => {
            return {...prevFilVals, [name]: !value}
        });
    }//handleFilters

    function submitData() {
        setLoading(true);
        const url = `http:${localHost}:3030/admin/get-stats`;

        const data = {
            id: user.id,
            password: user.contrasenia,
            filters: filters,
        };
        postRequest(url, data)
            .then(result => {
                setLoading(false);
                let tit = "Éxito";
                let mess = "Datos enviados a su correo";
                if (!result.success)
                {
                    tit = "Error";
                    mess = "Hubo un problema en el servidor";
                    if(result.wrongPass) mess = "Contraseña incorrecta";
                    if(result.mailFailed) mess = "Hubo un error enviando el email";

                }
                OkAlert({title: tit, message: mess});
            })
            .catch(err => {
                setLoading(false);
                OkAlert({title: "Error", message: "No se pudo conectar con el servidor."});
                console.log(err);
            });
    }//submitData

    useEffect(()=>{
        if(reloadValue)
            getUser();
    },[]);

    if(!reloadValue)
        return <Login 
                navigation={navigation}
                reloadLogged={reloadLogged}
            />

    return (
        <View style={styles.container}>
            {loading && <Loading />}
            <Text style={styles.text}>Seleccione las tablas que deseé:</Text>
            <View style={styles.radiosSection}>
                    <RadioBtn 
                        name="Estudiantes"
                        selected={filters.students}
                        onPressFunc={() => handleFilters("students", filters.students)}
                    />
                    <RadioBtn 
                        name="Resultado Final"
                        selected={filters.final}
                        onPressFunc={() => handleFilters("final", filters.final)}
                    />
                    <RadioBtn 
                        name="Resultado clasificador"
                        selected={filters.classifier}
                        onPressFunc={() => handleFilters("classifier", filters.classifier)}
                    />
                    <RadioBtn 
                        name="Resultado sentimientos"
                        selected={filters.sentiments}
                        onPressFunc={() => handleFilters("sentiments", filters.sentiments)}
                    />
                    <RadioBtn 
                        name="Resultado cuestionario"
                        selected={filters.questionnaire}
                        onPressFunc={() => handleFilters("questionnaire", filters.questionnaire)}
                    />
            </View>

            <ActionBtn
                btnText={"Obtener datos"}
                onPressFunc={submitData}
            />
        </View>
    );
}//StatsScreen
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#120078",/*120078 */
        flex: 1,
    },
    radiosSection: {
        marginHorizontal: 25,
        marginVertical: 20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        color: "#f5f4f4",
        fontSize: 20,
        textAlign: "center"
    },
});