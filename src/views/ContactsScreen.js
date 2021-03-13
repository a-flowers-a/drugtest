import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ActionBtn from '../components/ActionBtn';
import ContactItem from '../components/ContactItem';

function ContactsScreen(){
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#120078",/*120078 */
            paddingVertical: 10,
            flex: 1,
        },
    });
    return(
        <ScrollView style={styles.container}>
            <ContactItem />
            <ContactItem />
            <ContactItem />
        </ScrollView>
    );
}//ContactsScreen

export default ContactsScreen;