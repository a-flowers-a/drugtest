import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StatsScreen from '../views/StatsScreen';

const Stack = createStackNavigator();

const AdminStack = () =>{
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
                name="Stats" 
                component={StatsScreen}
            />

        </Stack.Navigator>
    );
}//AdminStack

export default AdminStack;