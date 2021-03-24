import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ActionBtn from '../components/ActionBtn';
import {get} from '../utils/storage';

function HomeScreen(props) {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#120078",/*120078 */
            flex: 1,
        },
    });

    function navigateTo(screenOption){
        props.navigation.navigate(screenOption);
    }//navigateTo

    async function test(){
        const user = await get("user");
        console.log("user in Home", user);
    }//

    test();

    return (
        <ScrollView style={styles.container}>
            <ActionBtn
                btnText={"Realizar Cuestionario"}
                onPressFunc={() => navigateTo('Cuestionario')}
            />
            <ActionBtn
                btnText={"Mostrar Resultado"}
                onPressFunc={() => navigateTo('Resultado')}
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