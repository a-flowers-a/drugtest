import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, processColor, Platform } from 'react-native';
import ActionBtn from '../components/ActionBtn';
import { getRequest } from '../utils/HttpRequest';
import Loading from '../components/Loading';
import {androidHost} from '../utils/hosts';
import Login from './Login';
import { get } from '../utils/storage';
import RadioBtn from '../components/RadioBtn';

export default function StatsScreen(props) {
    const localHost = Platform.OS == 'ios' ? "localhost" : androidHost;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filters, toggleFilters] = useState({
        sex: false,
        semester: false,
        shift: false,
        final: false,
    });

    async function getUser(){
        const userSt = await get("user");
        console.log("user in StatsScreen", userSt);
        setUser(userSt);
    }//getUser

    function handleFilters(name, value){
        toggleFilters(prevFilVals => {
            return {...prevFilVals, [name]: !value}
        });
    }//handleFilters

    function submitData() {
        setLoading(true);
        const url = `http:${localHost}:3030/admin/get-all-quest-res`;

        getRequest(url)

            .then(result => {
                setLoading(false);
                if (result.success)
                    props.navigation.navigate('Home');
                else
                    console.log(result.message);
            })
            .catch(err => {
                console.log("error aquí");
                console.log(err);
            });
    }//submitData
    useEffect(()=>{
        getUser();
    },[]);

    if(!user)
        return <Login 
                navigation={props.navigation}
                reloadLogged={props.reloadLogged}
            />

    return (
        <View style={styles.container}>
            {loading && <Loading />}
            <Text style={styles.text}>Seleccione los filtros que desee:</Text>
            <View style={styles.radiosSection}>
                <RadioBtn 
                    name="sexo"
                    selected={filters.sex}
                    onPressFunc={() => handleFilters("sex", filters.sex)}
                />
                <RadioBtn 
                    name="semestre"
                    selected={filters.semester}
                    onPressFunc={() => handleFilters("semester", filters.semester)}
                />
                <RadioBtn 
                    name="turno"
                    selected={filters.shift}
                    onPressFunc={() => handleFilters("shift", filters.shift)}
                />
                <RadioBtn 
                    name="resultado final"
                    selected={filters.final}
                    onPressFunc={() => handleFilters("final", filters.final)}
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
    text: {
        color: "#f5f4f4",
        fontSize: 20,
        textAlign: "center"
    },
});