import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMeh, faFrown, faSmile } from '@fortawesome/free-solid-svg-icons'
import * as Progress from 'react-native-progress';
import ActionBtn from '../components/ActionBtn';
import TableChat from '../components/TableChat';
import { getRequest } from '../utils/HttpRequest';
import { androidHost } from '../utils/hosts';

function ResultScreen(props) {

    const localHost = Platform.OS == 'ios' ? "localhost" : androidHost;
    const [clasificadorKeys, setClasificadorKeys] = useState([]);
    const [clasificadorValues, setClasificadorValues] = useState([]);
    const [sentimentResult, setSentimentResult] = useState(0);
    const [questResult, setQuestResult] = useState(0);
    const [globalResult, setGlobalResult] = useState("Bajo");
    const [progBar, setProgBar] = useState(0.33);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#120078",/*120078 */
            flex: 1,
        },
        contentContainer: {
            alignItems: "center",

        },
        icon: {
            color: "#f5f4f4",
            marginHorizontal: 20
        },
        row: {
            flexDirection: "row",
            marginVertical: 20,
            //alignItems: "center"
        },
        subtitle: {
            fontSize: 25,
        },
        text: {
            color: "#f5f4f4",
        },
        title: {
            fontSize: 30,
        },
    });

    function navigateTo(screenOption) {
        props.navigation.navigate(screenOption);
    }//navigateTo

    async function getData() {
        const idResFinal = props.route.params.idResFinal;
        const url = `http:${localHost}:3030/analysis/get-results/${idResFinal}`;
        getRequest(url)
            .then((response) => {

                //clasificador
                setClasificadorKeys(response.result[0]);
                setClasificadorValues(response.result[1]);


                setSentimentResult(response.result[1]);

                //cuestionario
                setQuestResult(response.result[3].questionSum);

                //Riesgo
                let resulFinal = response.result[3].globalFinalScore;
                if (resulFinal > 3) {
                    setGlobalResult("Medio");
                    setProgBar(0.66);
                }
                else if (resulFinal > 5) {
                    setGlobalResult("Alto");
                    setProgBar(1);
                }


            }).catch(
                (err) => { console.error(err) }
            );
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            <View style={styles.row}>
                <Text style={[styles.text, styles.title]}>Resultado</Text>
            </View>
            <View style={styles.row}>
                <Progress.Bar progress={progBar} width={300} />
            </View>
            <Text style={styles.text}>{globalResult} </Text>

            <View style={styles.row}>
                <Text style={[styles.text, styles.subtitle]}>Análisis Chats</Text>
            </View>
            <View style={styles.row}>
                <TableChat keys={clasificadorKeys} valores={clasificadorValues} />
            </View>
            <View style={styles.row}>
                <Text style={[styles.text, styles.subtitle]}>Análisis de Sentimientos</Text>
            </View>
            <View style={styles.row}>
                <FontAwesomeIcon
                    icon={faFrown}
                    style={styles.icon}
                    size={40}
                />
                <FontAwesomeIcon
                    icon={faMeh}
                    style={styles.icon}
                    size={40}
                />
                <FontAwesomeIcon
                    icon={faSmile}
                    style={styles.icon}
                    size={40}
                />
            </View>
            <View style={styles.row}>
                <Text style={[styles.text, styles.subtitle]}>Resultado Cuestionario</Text>
            </View>
            <View style={styles.row}>
                <Text style={[styles.text, styles.subtitle]}>{questResult} </Text>
            </View>

            <ActionBtn
                btnText={"Ver Contactos de apoyo"}
                onPressFunc={() => navigateTo('Contactos')}
            />

        </ScrollView>
    );
}//ResultScreen

export default ResultScreen;