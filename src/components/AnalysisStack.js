import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../views/HomeScreen';
import QuestScreen from '../views/QuestScreen';
import ResultScreen from '../views/ResultScreen';
import Login from '../views/Login';
import ContactsScreen from '../views/ContactsScreen';
import PrevResultsScreen from '../views/PrevResultsScreen';
import AccountForm from '../views/AccountForm';
import { useEffect, useState } from 'react';
import { get } from '../utils/storage';

const Stack = createStackNavigator();

const AnalysisStack = (props) => {
    const [userLogged, setUserLogged] = useState(false);
    async function getUser(){
        const userSt = await get("user");
        console.log("user in AnalysisStack", userSt);
        let showBtmTab = false;
        if(userSt)
        {
            showBtmTab = true;
            setUserLogged(true);
        }
        props.navigation.setOptions({tabBarVisible: showBtmTab});
    }
    console.log("userLogged en analysysStack fuera de todo método", userLogged);
    useEffect(()=>{
        console.log("useEffect analysysStack triggered");
        getUser();
    },[userLogged]);

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle:{
                    backgroundColor: "#120078",
                    //ios:
                    shadowOpacity: 0
                },
                headerTintColor: "#ffffff"
            }}
        >
        {userLogged ? (
            <>
                <Stack.Screen 
                    name="Inicio" 
                    component={HomeScreen}
                />
                <Stack.Screen 
                    name="Cuestionario" 
                    component={QuestScreen}
                />
                <Stack.Screen 
                    name="Contactos" 
                    component={ContactsScreen}
                />
                <Stack.Screen 
                    name="Resultado" 
                    component={ResultScreen}
                />
                <Stack.Screen 
                    name="Resultados Anteriores" 
                    component={PrevResultsScreen}
                />
                <Stack.Screen 
                    name="Datos Cuenta" 
                    component={AccountForm}
                />
            </>
        ) : (
            <>
                <Stack.Screen 
                    name="Login" 
                    component={Login}
                />
                <Stack.Screen 
                    name="Datos Cuenta" 
                    component={AccountForm}
                />
            </>
        )}
        </Stack.Navigator>
    );
}//AnalysisStack

export default AnalysisStack;