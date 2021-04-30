import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ResultItem from '../components/ResultItem';
import { androidHost } from '../utils/hosts';
import { getRequest } from '../utils/HttpRequest';
import { get } from '../utils/storage';


function PrevResultsScreen(props) {

    const localHost = Platform.OS == 'ios' ? "localhost" : androidHost;
    const [prevResults, setPrevResults] = useState([])
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#120078",/*120078 */
            flex: 1,
            paddingVertical: 10,
        },
    });

    async function getData() {
        const fndUser = await get("user");
        const parsedUser = JSON.parse(fndUser);
        const boleta = parsedUser.boleta;
        const url = `http:${localHost}:3030/analysis/get-previous-results/${boleta}`;
        getRequest(url)
            .then((response) => {
                //console.log("Resultados anteriores recibidos en PrevResultsScreen", response.results);
                setPrevResults(response.results)
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
            {prevResults.map((result) =>
                <ResultItem riesgo= {result.valor} />
            )}
            <ResultItem />
            <ResultItem />
        </ScrollView>
    );
}//PrevResultsScreen

export default PrevResultsScreen;