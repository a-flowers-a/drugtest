import React, { useState } from 'react';
import { StyleSheet} from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import QuestionFPt from '../components/QuestionFPt';
import QuestionSPt from '../components/QuestionSPt';
import questionsII from '../res/questionsII';

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
    
    /*if they are not with state, since it needs to be initialized with 0,
    every re render is reinitialized to 0*/
    const [answPt1, setAnswPt1] = useState(new Array(4).fill(0));
    const [answPt2, setAnswPt2] = useState(new Array(5).fill(0));

    const [fstQNum, setFstQNum] = useState(0);
    const [secQNum, setSecQNum] = useState(0);
    const [subQstIndex, setSubQIndex] = useState(0);

    const [taps1, setTaps1] = useState(true);
    let toDispQsts = [];

    /*  Receives: index of the question (1-4 questions),
            index of the tapped button (0-4) consume frequency
        Set the answer values for each question
    */
    function handleFAnswers(question, answer){
        console.log("q# " + question + " answ " +answer);
        setAnswPt1( prevValues => {
            prevValues[question] = answer;
            return prevValues;
        });
        setFstQNum( prevQNumber => {
            if(prevQNumber < 3)
                return prevQNumber += 1;
            else
            {
                setTaps1(false);
                return 3;
            }
        });
        console.log(answPt1);
    }//handleFAnswers

    if(!taps1)
        setTapsIIQst();
    
    function setTapsIIQst(){
        console.log("las answ1",answPt1);
        answPt1.map((answer,index) => {
            if(answer > 0)
                toDispQsts.push(questionsII[index]);
        });
        console.log(toDispQsts);
    }//setTapsIIQst

    function nextIndexQst(qstIndex){
        //last second pat question
        if(qstIndex == (toDispQsts.length - 1) )
            console.log("test finished");
        else
        {
            setSecQNum(prevQstIn => prevQstIn += 1);
            setSubQIndex(0);
        }
    }//nextIndexQst

    function nextSubIndex(qstIndex){
        let numNextQst = 1;
        if( subQstIndex == 0 || subQstIndex == 3 || subQstIndex == 6 || subQstIndex == 9)
            numNextQst = 3;
        const nextIndex = subQstIndex + numNextQst;
        //last subquestion
        if(nextIndex >= (toDispQsts[qstIndex].length - 1) )
            nextIndexQst(qstIndex);
        else
            setSubQIndex(nextIndex);
    }//nextSubIndex

    function handleSAnswers(qstIndex, answer){
        //positive answer
        if(answer)
        {
            setAnswPt2( prevValues => {
                prevValues[qstIndex] += answer;
                return prevValues;
            });
            nextSubIndex(qstIndex);
        }
        //negative answer
        else
        {
            nextSubIndex(qstIndex);
        }

    }//handleSAnswers

    //next questions (TAPS-2)
    /*function handleSAnswers(question, answer){
        console.log("amsw 1",answPt1);
        console.log("inside taps2, fstQNum ", fstQNum);
        setTaps1(false);
        //tobacco questions
        if(secQNum < 3 && answPt1[0] > 0)
        {
            console.log("inside tobacco, secQNum ", secQNum);
            //not first tobacco question
            if(secQNum > 0 && answer)
            {
                setAnswPt2(prevValues => {
                    prevValues[0] += 1;
                    return prevValues;
                });
                //next Question TAPS II
                setSecQNum( prevIndex => prevIndex += 1);
            }
        }//tobacco
        //alcohol questions
        else if(secQNum < 7 && answPt1[1] > 0)
        {
            console.log("inside alcohol, secQNum ", secQNum);
            //first alcohol question
            if(secQNum < 3)
                setSecQNum(3);
            else
            {
                if(answer)
                    setAnswPt2(prevValues => {
                        prevValues[1] += 1;
                        return prevValues;
                    });
                //next Question TAPS II
                setSecQNum( prevIndex => prevIndex += 1);
            }
        }//alcohol
        //drugs questions
        else if(secQNum < 18 && answPt1[2] > 0)
        {
            console.log("inside drugs, secQNum ", secQNum);
            //first drugs question
            if(secQNum < 7)
                setSecQNum(7);
            else
            {
                if(answer)
                    setAnswPt2(prevValues => {
                        prevValues[2] += 1;
                        return prevValues;
                    });
                //next Question TAPS II
                setSecQNum( prevIndex => prevIndex += 1);
            }
        }//drugs
        //medicine questions
        else if(secQNum < 25 && answPt1[3] > 0)
        {
            console.log("inside medicine, secQNum ", secQNum);
            console.log("answPt1 in 3", answPt1[3]);
            //first medicine question
            if(secQNum < 16)
                setSecQNum(16);
            else
            {
                if(answer)
                    setAnswPt2(prevValues => {
                        prevValues[3] += 1;
                        return prevValues;
                    });
                //next Question TAPS II
                setSecQNum( prevIndex => prevIndex += 1);
            }
        }//medicine
        console.log("index qII ",secQNum);
        console.log("AnswPt2",answPt2);
        setQuestionII(questionsII[secQNum]);
    }//handleSAnswers
    */

    return(
        <ScrollView style={styles.container}>
            {taps1 ?
                <QuestionFPt 
                    onPressFunc= {handleFAnswers}
                    questIndex= {fstQNum}
                    question= {fPtQuestions[fstQNum]}
                />
                :
                <QuestionSPt
                    onPressFunc= {handleSAnswers}
                    questIndex= {secQNum}
                    question= {toDispQsts[secQNum][subQstIndex]}
                />
            }
            
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