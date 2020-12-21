import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import QuestScreen from '../views/QuestScreen';

const Stack = createStackNavigator();

const AnalysisStack = () =>{
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle:{
                    backgroundColor: "#20252c",
                    //ios:
                    shadowOpacity: 0
                },
                headerTintColor: "#ffffff"
            }}
        >
            <Stack.Screen 
                name="Questionaire" 
                component={QuestScreen}
            />
        </Stack.Navigator>
    );
}//AnalysisStack

export default AnalysisStack;