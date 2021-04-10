import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ContactItem from '../components/ContactItem';
import Loading from '../components/Loading';
import { getRequest } from '../utils/HttpRequest';
import { OkAlert } from '../components/CustomAlerts';
import CardMessage from '../components/CardMessage';
import {androidHost} from '../utils/hosts';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#120078",/*120078 */
        paddingVertical: 10,
        flex: 1,
    },
});


function ContactsScreen() {
    const [loading, setLoading] = useState(false);
    const [contacts, setContacts] = useState([]);

    const getContacts = async () => {
        const localHost = Platform.OS == 'ios' ? "localhost" : androidHost;//"192.168.1.89";
        setLoading(true);
        const url = `http:${localHost}:3030/admin/get-contacts`;
        await getRequest(url)
            .then(result => {

                setLoading(false);
                if (result.success) {
                    setContacts(result.data);
                }
                else {
                    OkAlert({ title: "Error", message: "No se pudieron obtener los contactos, por favor intente más tarde" });
                    console.log(result.message);
                }
            })
            .catch(err => {
                setLoading(false);
                OkAlert({ title: "Error", message: "No se pudo conectar con el servidor" });
                console.log("Error at getting the contacts");
                console.log(err);
            });
    }

    useEffect(() => {
        getContacts();
    }, []);

    return (
        <ScrollView style={styles.container}>
            { loading && <Loading />}
            {contacts.map((contact) =>
                <ContactItem escuela={contact.escuela} nombre={contact.nombre} telContacto={contact.contacto} horario={contact.horario} key={contact.id} />
            )}
            {contacts.length === 0 && (
                <CardMessage 
                    cardText="No hay contactos disponibles"
                />
            )}
        </ScrollView>
    );
}//ContactsScreen

export default ContactsScreen;