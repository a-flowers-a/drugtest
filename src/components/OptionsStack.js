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
                    backgroundColor: "#20252c",
                    //ios:
                    shadowOpacity: 0
                },
                headerTintColor: "#ffffff"
            }}
        >
            <Stack.Screen 
                name="Options" 
                component={OptionsScreen}
            />
            <Stack.Screen 
                name="WhatWeDo" 
                component={WhatWeDo}
            />

        </Stack.Navigator>
    );
}//OptionsStack

export default OptionsStack;