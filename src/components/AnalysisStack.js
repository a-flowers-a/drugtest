import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../views/HomeScreen';
import QuestScreen from '../views/QuestScreen';
import ResultScreen from '../views/ResultScreen';
import Login from '../views/Login';
import ContactsScreen from '../views/ContactsScreen';
import PrevResultsScreen from '../views/PrevResultsScreen';

const Stack = createStackNavigator();

const AnalysisStack = () =>{
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
            <Stack.Screen 
                name="Home" 
                component={HomeScreen}
            />
            
            <Stack.Screen 
                name="Questionaire" 
                component={QuestScreen}
            />
            <Stack.Screen 
                name="Result" 
                component={ResultScreen}
            />
            <Stack.Screen 
                name="Login" 
                component={Login}
            />
            <Stack.Screen 
                name="Contacts" 
                component={ContactsScreen}
            />
            <Stack.Screen 
                name="PrevResults" 
                component={PrevResultsScreen}
            />

        </Stack.Navigator>
    );
}//AnalysisStack

export default AnalysisStack;