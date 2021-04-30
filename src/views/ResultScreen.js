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

function ResultScreen(props) {

    const localHost = Platform.OS == 'ios' ? "localhost" : androidHost;
    const [clasificadorValues, setClasificadorValues] = useState([[0], [0], [0]]);
    const [questResult, setQuestResult] = useState(0);
    const [globalResult, setGlobalResult] = useState("Bajo");
    const [progBar, setProgBar] = useState(0.33);
    const [loading, setLoading] = useState(false);
    const [faFrownColor, setfaFrownColor] = useState("white");
    const [faMehColor, setfaMehColor] = useState("white");
    const [faSmileColor, setfaSmileColor] = useState("white");


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
                    console.log("Valores del analisis", response.result);

                    //sentiment
                    var sentMagni = response.result[0].magnitude;
                    var color = ""
                    if (sentMagni <= 3)
                        color = "green";
                    else if (sentMagni > 3 && sentMagni <= 4)
                        color = "yellow";
                    else if (sentMagni > 4)
                        color = "red";

                    var sentScore = response.result[0].score;
                    if (sentScore <= -0.3)
                        setfaFrownColor(color);
                    else if (sentScore > -0.3 && sentScore <= 0.4)
                        setfaMehColor(color);
                    else if (sentScore > 0.4)
                        setfaSmileColor(color);

                    //cuestionario
                    setQuestResult(response.result[1].questionSum);

                    //clasificador
                    var sustancias = [];
                    sustancias.push([response.result[2].etiquetasAlcohol]);
                    sustancias.push([response.result[2].etiquetasTabaco]);
                    sustancias.push([response.result[2].drogas]);
                    console.log("valores sustanicas", sustancias);
                    setClasificadorValues(sustancias);

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

                }
                else {
                    OkAlert({ title: "Error", message: "No fue posible obtener el resultado final, por favor intente más tarde" },
                        () => { props.navigation.navigate('Inicio'); });
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
            {loading && <Loading />}
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
                <Text style={styles.text}>Se hace mención de las siguientes sustancias en sus chats </Text>
            </View>
            <View style={styles.row}>
                <TableChat values={clasificadorValues} />
            </View>
            <View style={styles.row}>
                <Text style={[styles.text, styles.subtitle]}>Análisis de Sentimientos</Text>
            </View>
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
        marginLeft: 20,
        marginRight: 20
    },
    title: {
        fontSize: 30,
    },
});

export default ResultScreen;