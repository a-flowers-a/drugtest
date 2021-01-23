import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Charts from '../views/Charts';

const Stack = createStackNavigator();

const AdminStack = () =>{
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
                name="Charts" 
                component={Charts}
            />

        </Stack.Navigator>
    );
}//AdminStack

export default AdminStack;