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
import { OkAlert } from '../components/CustomAlerts';
import Loading from '../components/Loading';
import TableQuest from '../components/TableQuest';

function ResultScreen(props) {

    const localHost = Platform.OS == 'ios' ? "localhost" : androidHost;
    const [clasificadorValues, setClasificadorValues] = useState([[0], [0], [0]]);
    const [questResult, setQuestResult] = useState([]);
    const [globalResult, setGlobalResult] = useState("Bajo");
    const [progBar, setProgBar] = useState(0.33);
    const [loading, setLoading] = useState(false);
    const [faFrownColor, setfaFrownColor] = useState("#b0deff");
    const [faMehColor, setfaMehColor] = useState("#b0deff");
    const [faSmileColor, setfaSmileColor] = useState("#b0deff");

    function navigateTo(screenOption) {
        props.navigation.navigate(screenOption);
    }//navigateTo

    async function getData() {
        setLoading(true);
        const idResFinal = props.route.params.idResFinal;
        const url = `http:${localHost}:3030/analysis/get-results/${idResFinal}`;
        getRequest(url)
            .then((response) => {
                setLoading(false);
                if (response.success) {
                    //console.log("Valores del analisis", response.result);

                    //sentiment
                    var sentMagni = response.result[0].magnitude;
                    var color = "";
                    if (sentMagni <= 3)
                        color = "#B3EB9E";
                    else if (sentMagni > 3 && sentMagni <= 4)
                        color = "#EAD154";
                    else if (sentMagni > 4)
                        color = "#FD7E77";

                    var sentScore = response.result[0].score;
                    if (sentScore <= -0.3)
                        setfaFrownColor(color);
                    else if (sentScore > -0.3 && sentScore < 0.2)
                        setfaMehColor(color);
                    else if (sentScore >= 0.2)
                        setfaSmileColor(color);

                    //cuestionario
                    const QuestToArray = response.result[1].questResults.map(x => ["" + x])
                    setQuestResult(QuestToArray);

                    //clasificador
                    var sustancias = [];
                    sustancias.push([response.result[2].etiquetasAlcohol]);
                    sustancias.push([response.result[2].etiquetasTabaco]);
                    sustancias.push([response.result[2].drogas]);
                    //console.log("valores sustanicas", sustancias);
                    setClasificadorValues(sustancias);

                    //Riesgo
                    let resulFinal = response.result[3].globalFinalScore;
                    if (resulFinal >= 3) {
                        setGlobalResult("Medio");
                        setProgBar(0.66);
                    }
                    if (resulFinal > 5) {
                        setGlobalResult("Alto");
                        setProgBar(1);
                    }

                }
                else {
                    OkAlert({ title: "Error", message: "No fue posible obtener el resultado final, por favor intente más tarde" },
                        () => { props.navigation.navigate('Inicio'); });
                }
            })
            .catch((err) => {
                setLoading(false);
                OkAlert({ title: "Error", message: "No fue posible obtener el resultado final, por favor intente más tarde" },
                    () => { props.navigation.navigate('Inicio'); });
                console.error(err);
            });
    }//getData

    useEffect(() => {
        getData();
    }, []);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {loading && <Loading />}
            <View style={styles.row}>
                <Text style={[styles.text, styles.title]}>Resultado</Text>
            </View>
            <View style={styles.row}>
                <Progress.Bar color={"#fefefe"} progress={progBar} width={300} />
            </View>
            <Text style={styles.text}>{globalResult} </Text>

            <View style={styles.row}>
                <Text style={[styles.text, styles.subtitle]}>Análisis Chats</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Se hace mención de las siguientes sustancias en sus chats: </Text>
            </View>
            <View style={styles.row}>
                <TableChat values={clasificadorValues} />
            </View>
            <View style={styles.row}>
                <Text style={[styles.text, styles.subtitle]}>Análisis de Sentimientos</Text>
            </View>
            <View style={[styles.card]}>
                <View style={styles.row}>
                    <FontAwesomeIcon
                        icon={faFrown}
                        style={styles.icon}
                        size={40}
                        color={faFrownColor}
                    />
                    <FontAwesomeIcon
                        icon={faMeh}
                        style={styles.icon}
                        size={40}
                        color={faMehColor}
                    />
                    <FontAwesomeIcon
                        icon={faSmile}
                        style={styles.icon}
                        size={40}
                        color={faSmileColor}
                    />
                </View>
            </View>
            <View style={styles.row}>
                <Text style={[styles.text, styles.subtitle]}>Resultado Cuestionario</Text>
            </View>
            <View style={styles.row}>
                <TableQuest values={questResult} />
            </View>

            <ActionBtn
                btnText={"Ver Contactos de apoyo"}
                onPressFunc={() => navigateTo('Contactos')}
            />

        </ScrollView>
    );
}//ResultScreen

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fefefe",
        borderRadius: 10,
        shadowColor: "#120078",//#b0deff #5edfff #010a43 #000 #120078
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    container: {
        backgroundColor: "#aed1f5",/*#120078 */
        flex: 1,
    },
    contentContainer: {
        alignItems: "center",

    },
    icon: {
        //color: "#0070f3",//#f5f4f4
        marginHorizontal: 20
    },
    row: {
        flexDirection: "row",
        marginVertical: 20,
    },
    subtitle: {
        fontSize: 25,
    },
    text: {
        color: "#150e56",//#f5f4f4 #010101
        marginLeft: 20,
        marginRight: 20
    },
    title: {
        fontSize: 30,
    },
});

export default ResultScreen;