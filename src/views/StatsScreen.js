import React, { useState } from 'react';
import { StyleSheet, Text, View, processColor, Platform } from 'react-native';
import ActionBtn from '../components/ActionBtn';
import { getRequest } from '../utils/HttpRequest';
import Loading from '../components/Loading';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#120078",/*120078 */
        flex: 1,
    },
    text: {
        color: "#f5f4f4",
        fontSize: 20,
        textAlign: "center"
    },
});

export default function StatsScreen(props) {
    const [loading, setLoading] = useState(false);
    const localHost = Platform.OS == 'ios' ? "localhost" : "192.168.1.89";
    
    function submitData() {
        setLoading(true);
        const url = `http:${localHost}:3030/admin/get-all-quest-res`;

        getRequest(url)

            .then(result => {
                setLoading(false);
                if (result.success)
                    props.navigation.navigate('Home');
                else
                    console.log(result.message);
            })
            .catch(err => {
                console.log("error aquí");
                console.log(err);
            });
    }//submitData

    return (
        <View style={styles.container}>
            {loading && <Loading />}
            <Text style={styles.text}>Here is going to be the selection of the data</Text>

            <ActionBtn
                btnText={"Obtener datos"}
                onPressFunc={submitData}
            />
        </View>
    );
}//StatsScreen