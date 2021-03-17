import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OptionsScreen from '../views/OptionsScreen';
import WhatWeDo from '../views/WhatWeDo';

const Stack = createStackNavigator();

const OptionsStack = () =>{
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
                name="Opciones" 
                component={OptionsScreen}
            />
            <Stack.Screen 
                name="Qué hacemos" 
                component={WhatWeDo}
            />

        </Stack.Navigator>
    );
}//OptionsStack

export default OptionsStack;