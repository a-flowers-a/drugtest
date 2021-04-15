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

const AnalysisStack = (props) =>{
    const [userLogged, setUserLogged] = useState(false);
    async function getUser(){
        const userSt = await get("user");
        console.log("user in AnalysisStack", userSt);
        setUserLogged(true);
    }
    useEffect(()=>{
        getUser();
    },[]);
    useEffect(()=>{
        props.navigation.setOptions({tabBarVisible: userLogged});
    },[]);

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
            {userLogged &&
                <Stack.Screen 
                    name="Inicio" 
                    component={HomeScreen}
                />
            }
            {userLogged &&
                <Stack.Screen 
                    name="Cuestionario" 
                    component={QuestScreen}
                />
            }
            {userLogged &&
                <Stack.Screen 
                    name="Contactos" 
                    component={ContactsScreen}
                />
            }
            {userLogged &&
                <Stack.Screen 
                    name="Resultado" 
                    component={ResultScreen}
                />
            }
            {userLogged &&
                <Stack.Screen 
                    name="Resultados Anteriores" 
                    component={PrevResultsScreen}
                />
            }
            <Stack.Screen 
                name="Login" 
                component={Login}
            />
            <Stack.Screen 
                name="Datos Cuenta" 
                component={AccountForm}
            />
        </Stack.Navigator>
    );
}//AnalysisStack

export default AnalysisStack;