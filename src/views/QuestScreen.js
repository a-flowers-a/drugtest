import React, { useState } from 'react';
import { StyleSheet } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';

import ActionBtn from '../components/ActionBtn';
import {postRequest} from '../utils/HttpRequest';
import QuestionFPt from '../components/QuestionFPt';
import QuestionSPt from '../components/QuestionSPt';
import questionsII from '../res/questionsII';
import Loading from '../components/Loading';
import { store } from '../utils/storage';

function QuestScreen(props) {

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#120078",/*120078 */
            flex: 1,
        },
    });

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

    /*  
        Set the answer value for the current question (fstQNum)
        Receives: The answer value of the question (0-4)
    */
    async function handleFAnswers(answer) {
        const stAns1 = await store("answPt1", JSON.stringify(answPt1));
        if(!stAns1)
            console.log("coulnt save stAns1");
        else
            console.log("answPt1 stored");
            
        setAnswPt1(prevValues => {
            prevValues[fstQNum] = answer;
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

    function handleSAnswers(answer) {
        //positive answer
        if (answer) {
            let indexSecAnswers = subsIndxToDspl[secQNum];//subsIndex;
            if(subsIndxToDspl[secQNum] == 2)
            {
                indexSecAnswers = 2 + Math.floor(subQstIndex / 3);
            }
            else if(subsIndxToDspl[secQNum] == 3)
            {
                indexSecAnswers = 5 + Math.floor(subQstIndex / 3);
            }
            
            if(subQstIndex == 10)
            {
                //setOther(answer);//answer
                setAnswPt2(prevValues => {
                    prevValues[8] = answer;
                    return prevValues;
                });

            }
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
            setSecQNum(prevQstIn => prevQstIn += 1);
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
        .then(result => {
            setLoading(false);
            console.log("result de postReq", result);
            if (result.success) {
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

    return (
        <ScrollView style={styles.container}>
            {loading && <Loading />}
            {display.part1 &&
                <QuestionFPt
                    onPressFunc={handleFAnswers}
                    qstIndex={fstQNum}
                />
            }
            {display.part2 &&
                <QuestionSPt
                    onPressFunc={handleSAnswers}
                    /*substanceIndex={subsIndxToDspl[secQNum]}*/
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