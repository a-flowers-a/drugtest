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
        const name = await get("user");
        console.log(name);
    }//

    test();

    return (
        <ScrollView style={styles.container}>
            <ActionBtn
                btnText={"Realizar Cuestionario"}
                onPressFunc={() => navigateTo('Questionaire')}
            />
            <ActionBtn
                btnText={"Mostrar Resultado"}
                onPressFunc={() => navigateTo('Result')}
            />
            <ActionBtn
                btnText={"Login"}
                onPressFunc={() => navigateTo('Login')}
            />
            <ActionBtn
                btnText={"Ver Contactos de apoyo"}
                onPressFunc={() => navigateTo('Contacts')}
            />
            <ActionBtn
                btnText={"Ver resultados anteriores"}
                onPressFunc={() => navigateTo('PrevResults')}
            />
            
        </ScrollView>
    );
}//HomeScreen

export default HomeScreen;