import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ActionBtn from '../components/ActionBtn';


function HomeScreen(props) {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#120078",/*120078 */
            flex: 1,
        },
    });

    function sendToQuestScreen() {
        //must be the name that's in Stack.Screen
        props.navigation.navigate('Questionaire');
    }//handlePress

    return (
        <ScrollView style={styles.container}>
            <ActionBtn
                btnText={"Realizar Cuestionario"}
                onPressFunc={sendToQuestScreen}
            />
            
        </ScrollView>
    );
}//HomeScreen

export default HomeScreen;