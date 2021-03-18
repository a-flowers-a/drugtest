import React, { useEffect, useState } from 'react';
import { StyleSheet } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';

import ActionBtn from '../components/ActionBtn';
import {postRequest} from '../utils/HttpRequest';
import QuestionFPt from '../components/QuestionFPt';
import QuestionSPt from '../components/QuestionSPt';
import questionsII from '../res/questionsII';
import Loading from '../components/Loading';
import { get, store, remove} from '../utils/storage';

THE PROBLEM IS WHEN THE FQNUMBER IS TRYING TO ADD ONE, IT IS KIND OF UNDEFINED BY
THAT MOMENT

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
    const [answPt2, setAnswPt2] = useState(new Array(9).fill(0));
    
    const [fstQNum, setFstQNum] = useState(0);
    const [secQNum, setSecQNum] = useState(0);
    const [subQstIndex, setSubQIndex] = useState(0);

    const [subsIndxToDspl, setSubsIndxToDspl] = useState([]);

    const [display, setDisplay] = useState({
        part1: true,
        part2: false,
        submit: false,
        setTapsII: false
    });

    const [loading, setLoading] = useState(false);
    console.log("fstQNum", fstQNum);
    /*  Receives: index of the question (1-4 questions),
            index of the tapped button (0-4) consume frequency
        Set the answer values for each question
        Save the array and the number in storage everytime it is called
    */
    function handleFAnswers(question, answer) {
        setAnswPt1(async prevValues => {
            prevValues[question] = answer;
            const aGuardar = JSON.stringify({answ:prevValues});
            console.log("los valores a guardar", aGuardar);
            const stored = await store("fpAnswers",aGuardar);
            if(!stored)
                console.log("couldnt save array of answ1");
            return prevValues;
        });
        setFstQNum(async prevQNumber => {
            let number = 0;
            if (prevQNumber < 3)
                number = prevQNumber += 1;
            else
            {
                setDisplay(prevValue => {
                    return {
                        ...prevValue,
                        part1: false
                    }
                });//setDisplay
                number = 3;
            }
            const stored = await store("fqNumber",number.toString());
            if(!stored)
                console.log("couldnt save number of fq");
            console.log("nextFQ", number);
            return number;
        });
    }//handleFAnswers

    /* 
        Save it in storage, everytime it is called
    */
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
            {
                setAnswPt2(async prevValues => {
                    prevValues[8] = answer;
                    const stored = await store("spAnswers",JSON.stringify({answ:prevValues}));
                    if(!stored)
                        console.log("couldnt save array of answ2");
                    return prevValues;
                });
            }
            else if(subQstIndex != 9)
            {
                setAnswPt2(async prevValues => {
                    prevValues[indexSecAnswers] += 1;
                    const stored = await store("spAnswers",JSON.stringify({answ:prevValues}));
                    if(!stored)
                        console.log("couldnt save array of answ2");
                    return prevValues;
                });
            }
            
            nextSubIndex(1);
        }
        //negative answer
        else {
            let numNextQst = 1;
            if (subQstIndex == 0 || subQstIndex == 3 || subQstIndex == 6 || subQstIndex == 9)
            {
                const substanceIndex = subsIndxToDspl[secQNum];
                //in case they are the alcohol questions
                if(substanceIndex == 1)
                    numNextQst = 4;
                else
                    numNextQst = 3;
            }
            nextSubIndex(numNextQst);
        }

    }//handleSAnswers

    function nextIndexQst() {
        //last second part question
        if(secQNum == (subsIndxToDspl.length - 1) )
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
            setSecQNum(async prevQstIn => {
                const nNum = prevQstIn += 1;
                const stored = await store("sqNumber", nNum.toString());
                if(!stored)
                    console.log("couldnt save num of sq");
                return nNum;
            });
            setSubQIndex(0);
        }
    }//nextIndexQst

    function nextSubIndex(indexJump) {
        const nextIndex = subQstIndex + indexJump;
        console.log("in nextSubIn, current subindex:", subQstIndex);
        console.log("nextSub would be ", nextIndex);
        //last subquestion
        const substanceIndex = subsIndxToDspl[secQNum];
        if(nextIndex > (questionsII[substanceIndex].length - 1) )
        {
            console.log("going to next qstIndex ");
            nextIndexQst();
        }
        else
        {
            setSubQIndex(nextIndex);
        }
    }//nextSubIndex

    function setTapsIIQst() {
        console.log("las answ1", answPt1);
        let ansWithZero = 0;
        answPt1.map((answer, index) => {
            if (answer > 0)
            {
                //console.log("entra una vez en answ>0");
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

    /*remove all the questionnaire stuff storage */
    async function submitAnswers() {
        setLoading(true);
        console.log("answ2", answPt2);
        //console.log("other", other);
        const url = "http:localhost:3030/analysis/save-quest-answers";
        const data = {
            resTaps2: answPt2,
            boleta: 2017630222,
            password: 123,
        };
        postRequest(url,data)
        .then(async result => {
            setLoading(false);
            console.log("result de postReq", result);
            if (result.success)
            {
                const remFpAnsw = await remove("fpAnswers");
                const remSpAnsw = await remove("spAnswers");
                const remFqNum = await remove("fqNumber");
                const remSqNum = await remove("sqNumber");
                if(!remFpAnsw || !remSpAnsw || !remFqNum || !remSqNum)
                    console.log("one wasnt removed");
                props.navigation.navigate('Home');
            }
            else {
                console.log('error');
            }
        })
        .catch(err => {
            console.log(err);
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

    /*
        Get from storage the values of the question that is next to be shown (askeed)
        Aswell as the answers
        If the values dont exist, the initial value in useState(),
        will be 0 for the number of the question and the empty arrays for the answer
    */
    async function qstsFromStorage(){
        const fpAnsw = await get("fpAnswers"); 
        const spAnsw = await get("spAnswers"); 
        const fQNum = await get("fqNumber"); 
        const sQNum = await get("sqNumber");
        if(fpAnsw !== null)
        {
            const answers = JSON.parse(fpAnsw)
            setAnswPt1(answers.answ);
            console.log("fpAnswers found", answers);
        }
        if(spAnsw !== null)
        {
            const answers = JSON.parse(spAnsw)
            setAnswPt1(answers.answ);
            console.log("spAnswers found", answers);
        }
        if(fQNum !== null)
        {
            setFstQNum(parseInt(fQNum));
            console.log("fQNum found", fQNum);
        }
        if(sQNum !== null)
        {
            setSecQNum(parseInt(sQNum));
            console.log("sQNum found", sQNum);
        }
        setLoading(false);
    }//qstsFromStorage

    async function testRemove(){
        const remFpAnsw = await remove("fpAnswers");
        const remSpAnsw = await remove("spAnswers");
        const remFqNum = await remove("fqNumber");
        const remSqNum = await remove("sqNumber");
        if(!remFpAnsw || !remSpAnsw || !remFqNum || !remSqNum)
            console.log("one wasnt removed");
        else
            console.log("all removed");
    }//
    useEffect(()=>{
        //setLoading(true);
        //testRemove();
        qstsFromStorage();
    },[]);

    return (
        <ScrollView style={styles.container}>
            {/*loading && <Loading />*/}
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
                    substanceIndex = {subsIndxToDspl[secQNum]}
                    question={questionsII[subsIndxToDspl[secQNum]][subQstIndex]}
                    txtInput={(subsIndxToDspl[secQNum]==2 && subQstIndex==10) && true}
                />
            }

            { (!display.part1 && !display.part2) &&
                <ActionBtn 
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
                    btnText={display.submit ? "Finalizar Cuestionario" : "Continuar a TAPS-II"}
                />
            }
        </ScrollView>
    );
}//QuestScreen

export default QuestScreen;