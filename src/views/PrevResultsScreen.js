import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ResultItem from '../components/ResultItem';
import { androidHost } from '../utils/hosts';
import { getRequest } from '../utils/HttpRequest';
import { get } from '../utils/storage';
import { OkAlert } from '../components/CustomAlerts';
import Loading from '../components/Loading';
import CardMessage from '../components/CardMessage';


function PrevResultsScreen(props) {

    const localHost = Platform.OS == 'ios' ? "localhost" : androidHost;
    const [prevResults, setPrevResults] = useState([])
    const [loading, setLoading] = useState(false);
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#aed1f5",/*120078 */
            flex: 1,
            paddingVertical: 10,
        },
    });

    async function getData() {
        setLoading(true);
        const fndUser = await get("user");
        const parsedUser = JSON.parse(fndUser);
        const boleta = parsedUser.boleta;
        const url = `http:${localHost}:3030/analysis/get-previous-results/${boleta}`;
        getRequest(url)
            .then((response) => {
                setLoading(false);
                if (response.success) {
                    setPrevResults(response.prevRes);
                }
                else {
                    OkAlert({ title: "Error", message: "No fue posible obtener los resultados anteriores, por favor intente más tarde" },
                        () => { props.navigation.navigate('Inicio'); });
                }

            })
            .catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {loading && <Loading />}
            {prevResults.map((result) =>
                <ResultItem riesgo={result.resFinal} quest={result.questRes} key={result.id} />
            )}
            {prevResults.length === 0 && (
                <CardMessage
                    cardText="No hay resultados anteriores disponibles"
                />
            )}
        </ScrollView>
    );
}//PrevResultsScreen

export default PrevResultsScreen;