import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StatsScreen from '../views/StatsScreen';

const Stack = createStackNavigator();

const AdminStack = (props) => {
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
            <Stack.Screen name="Estadísticas">
                {props => <StatsScreen
                    {...props}
                    reloadLogged={reloadLogged}
                    reloadValue={reloadValue}
                />}
            </Stack.Screen>

        </Stack.Navigator>
    );
}//AdminStack

export default AdminStack;