import React, { useState } from 'react';
import { StyleSheet } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import FinishBtn from '../components/FinishBtn';
import QuestionFPt from '../components/QuestionFPt';
import QuestionSPt from '../components/QuestionSPt';
import questionsII from '../res/questionsII';

function QuestScreen(props) {

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#120078",/*120078 */
            flex: 1,
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

    /*if they do not have state, since it needs to be initialized with 0,
    every re render is reinitialized to 0*/
    const [answPt1, setAnswPt1] = useState(new Array(4).fill(0));
    const [answPt2, setAnswPt2] = useState(new Array(8).fill(0));
    const [other, setOther] = useState("");//check if it could fit in array answPt2

    const [fstQNum, setFstQNum] = useState(0);
    const [secQNum, setSecQNum] = useState(0);
    const [subQstIndex, setSubQIndex] = useState(0);
    const [toDispQsts, setToDsplQst] = useState([]);

    const [subsIndxToDspl, setSubsIndxToDspl] = useState([]);

    const [display, setDisplay] = useState({
        part1: true,
        part2: false,
        submit: false,
        setTapsII: false
    });

    /*  Receives: index of the question (1-4 questions),
            index of the tapped button (0-4) consume frequency
        Set the answer values for each question
    */
    function handleFAnswers(question, answer) {
        //console.log("q# " + question + " answ " + answer);
        setAnswPt1(prevValues => {
            prevValues[question] = answer;
            return prevValues;
        });
        setFstQNum(prevQNumber => {
            if (prevQNumber < 3)
                return prevQNumber += 1;
            else
            {
                setDisplay(prevValue => {
                    return {
                        ...prevValue,
                        part1: false
                    }
                });//setDisplay
                return 3;
            }
        });
    }//handleFAnswers

    function handleSAnswers(subsIndex, answer) {
        //positive answer
        if (answer) {
            let indexSecAnswers = subsIndex;
            if(subsIndex == 2)
            {
                indexSecAnswers = 2 + Math.floor(subQstIndex / 3);
            }
            else if(subsIndex == 3)
            {
                indexSecAnswers = 5 + Math.floor(subQstIndex / 3);
            }
            
            if(subQstIndex == 10)
                setOther("otra");//answer
            else if(subQstIndex != 9)
            {
                setAnswPt2(prevValues => {
                    prevValues[indexSecAnswers] += 1;
                    return prevValues;
                });
            }
            
            nextSubIndex(1);
        }
        //negative answer
        else {
            let numNextQst = 1;
            if (subQstIndex == 0 || subQstIndex == 3 || subQstIndex == 6 || subQstIndex == 9) {
                //in case they are the alcohol questions (must be 4)
                if (toDispQsts[secQNum].length == 4)
                    numNextQst = 4;
                else
                    numNextQst = 3;
            }
            nextSubIndex(numNextQst);
        }

    }//handleSAnswers

    function nextIndexQst() {
        //last second part question
        if (secQNum == (toDispQsts.length - 1))
        {
            setDisplay(prevValue => {
                return {
                    ...prevValue,
                    part2: false,
                    submit: true
                }
            });//setDisplay
        }
        else
        {
            setSecQNum(prevQstIn => prevQstIn += 1);
            setSubQIndex(0);
        }
    }//nextIndexQst

    function nextSubIndex(indexJump) {
        const nextIndex = subQstIndex + indexJump;
        console.log("in nextSubIn, current subindex:", subQstIndex);
        console.log("nextSub would be ", nextIndex);
        //last subquestion
        if (nextIndex > (toDispQsts[secQNum].length - 1)) {
            console.log("going to next qstIndex ");
            nextIndexQst();
        }
        else {
            setSubQIndex(nextIndex);
        }
    }//nextSubIndex

    function setTapsIIQst() {
        console.log("las answ1", answPt1);
        let ansWithZero = 0;
        answPt1.map((answer, index) => {
            if (answer > 0)
            {
                console.log("entra una vez en answ>0");
                setToDsplQst(prevQsts => {
                    console.log("adding " + index +" qst in array");
                    let newArray = prevQsts;
                    newArray.push(questionsII[index]);
                    return newArray;
                    //return prevQsts.concat(questionsII[index]);
                });
                //toDispQsts.push(questionsII[index]);
                setSubsIndxToDspl(prevIndexs => {
                    let newArray = prevIndexs;
                    newArray.push(index);
                    return newArray;
                });
            }
            else
                ansWithZero += 1;
        });
        if(ansWithZero == answPt1.length)
        {
            console.log("todas answ pt1 con 0");
            setDisplay(prevValues => {
                return{
                    ...prevValues,
                    submit:true
                };
            });
        }
    }//setTapsIIQst


    function submitAnswers() {
        console.log("answ2", answPt2);
        const url = "http:localhost:3030/analysis/save-quest-answers";
        axios.post(url,{
                        resTaps2: answPt2,
                        boleta: 2017630222,
                        password: 123,
                        other: other,
                    }, {
                        headers: {"Content-Type": "application/json"},
        })
            .then((result) => {
                //const respMessage = JSON.stringify(result.data.message);
                const success = result.data.success;
                //console.log(result.data);
                if (success) {
                    console.log('success');
                }
                else {
                    console.log('error');
                }
            }).catch(error => {
                console.log(error);
            });

    }//submitAnswers

    if(!display.part1 && !display.part2 && !display.submit && !display.setTapsII)
    {
        console.log("tapsII funct triggered");
        setDisplay(prevValues => {
            return {
                ...prevValues,
                setTapsII: true,
            }
        });
        setTapsIIQst();
    }

    //console.log("to dspQst",toDispQsts);
    console.log("SubsIndxToDspl",subsIndxToDspl);

    return (
        <ScrollView style={styles.container}>
            {display.part1 &&
                <QuestionFPt
                    onPressFunc={handleFAnswers}
                    questIndex={fstQNum}
                    question={fPtQuestions[fstQNum]}
                />
            }
            {display.part2 &&
                <QuestionSPt
                    onPressFunc={handleSAnswers}
                    /*questIndex={secQNum}*/
                    substanceIndex = {subsIndxToDspl[secQNum]}
                    question={toDispQsts[secQNum][subQstIndex]}
                />
            }

            { (!display.part1 && !display.part2) &&
                <FinishBtn 
                    onPressFunc={display.submit ? submitAnswers : 
                        () => {
                            setDisplay(prevValue => {
                                return {
                                    ...prevValue,
                                    part2: true
                                }
                            });//setDisplay
                        }
                    }
                    btnText={display.submit ? "Finalizar Cuestionario" : "Terminar TAPS-I"}
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