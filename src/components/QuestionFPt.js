import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import ActionBtn from '../components/ActionBtn';
import { store } from '../utils/storage';

function QuestionFPt(props){

    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
        },
        textContainer: {
            backgroundColor: "#3399FF", /*#3e64ff */
            borderRadius: 10,
            marginHorizontal: 15,
            marginVertical: 20,
            paddingHorizontal: 15,
            paddingVertical: 30,
        },
        qText: {
            color: "#f5f4f4",
            fontSize: 20,
            textAlign: "center"
        },
    });

    const sex = false;
    let numDrinks = 5;

    if (!sex)
        numDrinks = 4;

    const fPtQuestions = [
        "1. En los últimos 12 meses, ¿con qué frecuencia ha usado algún producto de tabaco (por ejemplo, cigarrillos, cigarrillos electrónicos, cigarros puros, pipas o tabaco sin humo)?",
        `2. En los últimos 12 meses, ¿con qué frecuencia ha tomado ${numDrinks} o más bebidas que contienen alcohol en un día? Una bebida estándar es aproximadamente 1 vaso pequeño de vino (5 oz), 1 cerveza (12 oz), o 1 solo trago de licor`,
        "3. En los últimos 12 meses, ¿con qué frecuencia ha consumido drogas como marihuana, cocaína o crack, heroína, metanfetamina (metanfetamina de cristal), alucinógenos, éxtasis/MDMA?",
        "4. En los últimos 12 meses, ¿con qué frecuencia ha utilizado cualquier medicamento recetado sólo para la sensación, más de lo prescrito o que no se prescribieron para usted? Los medicamentos recetados que se pueden utilizar a su manera incluyen: Analgésicos opiáceos (por ejemplo, OxyContin, Vicodin, Percocet, Metadona). Medicamentos para la ansiedad o el sueño (por ejemplo, Xanax, Ativan, Klonopin) Medicamentos para el Trastorno de Déficit de Atención e Hiperactividad (por ejemplo, Adderall o Ritalin)."
    ];

    const {onPressFunc, qstIndex} = props;

    async function saveQstIndex(){
        stQstIn = await store("qstIndex", qstIndex.toString());
        if(stQstIn==null)
            console.log("could not storage fPart qstIndex");
        else
            console.log("stored fPart qstIndex", qstIndex);
    }//saveQstIndex

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.qText}>{fPtQuestions[qstIndex]}</Text>
            </View>
            
            <ActionBtn 
                btnText={"Diario o casi diario"}
                onPressFunc={() => {
                    saveQstIndex();
                    onPressFunc(4);
                }}
            />
            <ActionBtn 
                btnText={"Semanal"}
                onPressFunc={() => {
                    saveQstIndex();
                    onPressFunc(3);
                }}
            />
            <ActionBtn 
                btnText={"Mensual"}
                onPressFunc={() => {
                    saveQstIndex();
                    onPressFunc(2);
                }}
            />
            <ActionBtn 
                btnText={"Menos que mensual"}
                onPressFunc={() => {
                    saveQstIndex();
                    onPressFunc(1);
                }}
            />
            <ActionBtn 
                btnText={"Nunca"}
                onPressFunc={() => {
                    saveQstIndex();
                    onPressFunc(0);
                }}
            />
        </View>
    );
}//QuestionFPt

export default QuestionFPt;