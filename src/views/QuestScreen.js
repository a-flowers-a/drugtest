import React, { useState } from 'react';
import { StyleSheet} from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import QuestionFPt from '../components/QuestionFPt';

function QuestScreen(props){

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#120078",/*120078 */
            flex:1,
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

    const [answPt1, setAnswPt1] = useState({});
    const [qstNumber, setQstNumber] = useState(0);

    /*  Receives: index of the question (1-4 questions),
            index of the tapped button (1-5) consume frequency
        Set the answer values for each question
    */
    function handleFAnswers(question, answer){
        console.log("q# " + question + " answ " +answer);
        setAnswPt1( prevValues => {
            return { ...prevValues,
                    [question]:answer
            };
        });
        setQstNumber( prevQNumber => {
            if (prevQNumber < 3)
                return prevQNumber += 1;
            else
                //here must be the sending of the next questions
                return 0;
        });
        console.log(answPt1);
    }//checkButton

    return(
        <ScrollView style={styles.container}>
            <QuestionFPt 
                onPressFunc= {handleFAnswers}
                questIndex= {qstNumber}
                question= {fPtQuestions[qstNumber]}
            />
            {/*<FlatList
                data={fPtQuestions}
                renderItem={({item, index}) =>
                    <QuestionFPt 
                        question={item}
                        onPressFunc={handleFAnswers}
                        questIndex={index}
                    />
                }
            />*/}
        </ScrollView>
    );
}//QuestScreen

export default QuestScreen;