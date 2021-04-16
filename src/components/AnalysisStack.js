import React, { useContext } from 'react';
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
import { AuthContext } from './AuthProvider';

const Stack = createStackNavigator();

const AnalysisStack = (props) => {
    const { user, setUser } = useContext(AuthContext);
    
    async function getUser(){
        console.log("getuser in analysisstack triggered");
        const userSt = await get("user");
        console.log("user in AnalysisStack", userSt);
        let showBtmTab = false;
        if(userSt)
        {
            showBtmTab = true;
            setUser(userSt);
        }
        props.navigation.setOptions({tabBarVisible: showBtmTab});
    }//getUser

    useEffect(() => {
        getUser();
        //return subscriber; // unsubscribe on unmount
    }, []);

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
        {user ? (
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