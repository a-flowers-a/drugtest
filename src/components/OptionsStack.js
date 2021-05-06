import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OptionsScreen from '../views/OptionsScreen';
import WhatWeDo from '../views/WhatWeDo';

const Stack = createStackNavigator();

const OptionsStack = (props) =>{
    const {reloadLogged} = props;
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle:{
                    backgroundColor: "#aed1f5",/*c0dcf7 120078 c0fefc*/
                    //ios:
                    shadowOpacity: 0
                },
                headerTintColor: "#120078"
            }}
        >
            <Stack.Screen name="Opciones">
                {props => <OptionsScreen {...props} reloadLogged={reloadLogged} />}
            </Stack.Screen>
            <Stack.Screen 
                name="Qué hacemos" 
                component={WhatWeDo}
            />

        </Stack.Navigator>
    );
}//OptionsStack

export default OptionsStack;