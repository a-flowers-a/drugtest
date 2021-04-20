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
    const {reloadLogged, reloadValue} = props;
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
            <Stack.Screen name="Inicio">
                {props => <HomeScreen
                    {...props}
                    reloadLogged={reloadLogged}
                    reloadValue={reloadValue}
                />}
            </Stack.Screen>
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
                name="Login" 
                component={Login}
            />
            <Stack.Screen name="Datos Cuenta">
                {props => <AccountForm {...props} reloadLogged={reloadLogged} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}//AnalysisStack

export default AnalysisStack;