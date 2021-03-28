import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';

import ActionBtn from '../components/ActionBtn';
import { postRequest } from '../utils/HttpRequest';
import QuestionFPt from '../components/QuestionFPt';
import QuestionSPt from '../components/QuestionSPt';
import questionsII from '../res/questionsII';
import Loading from '../components/Loading';
import { multiGet, removeMany, store, get } from '../utils/storage';

function QuestScreen(props) {

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#120078",/* 120078 */
            //flex: 1,
        },
        contentContainer: {
            flexGrow: 1,
            justifyContent: 'center'
        },
    });

    const localHost = Platform.OS == 'ios' ? "localhost" : "192.168.1.89";

    /*if they do not have state, since it needs to be initialized with 0,
    every re render is reinitialized to 0*/
    const [answPt1, setAnswPt1] = useState(new Array(4).fill(0));
    const [answPt2, setAnswPt2] = useState(new Array(9).fill(0));

    const [fstQNum, setFstQNum] = useState(0);
    const [secQNum, setSecQNum] = useState(0);
    const [subQstIndex, setSubQIndex] = useState(0);
    const [user, setUser] = useState({
        boleta:"",
    });
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
        if (!stAns1)
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
            else {
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

    async function handleSAnswers(answer) {
        const stAns2 = await store("answPt2", JSON.stringify(answPt2));
        if (!stAns2)
            console.log("coulnt save answPt2");
        else
            console.log("answPt2 stored");
        //positive answer
        if (answer) {
            let indexSecAnswers = subsIndxToDspl[secQNum];//subsIndex;
            if (subsIndxToDspl[secQNum] == 2) {
                indexSecAnswers = 2 + Math.floor(subQstIndex / 3);
            }
            else if (subsIndxToDspl[secQNum] == 3) {
                indexSecAnswers = 5 + Math.floor(subQstIndex / 3);
            }

            if (subQstIndex == 10) {
                //setOther(answer);//answer
                setAnswPt2(prevValues => {
                    prevValues[8] = answer;
                    return prevValues;
                });

            }
            else if (subQstIndex != 9) {
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
                const substanceIndex = subsIndxToDspl[secQNum];
                //in case they are the alcohol questions
                if (substanceIndex == 1)
                    numNextQst = 4;
                else
                    numNextQst = 3;
            }
            nextSubIndex(numNextQst);
        }

    }//handleSAnswers

    function nextIndexQst() {
        //last second part question
        if (secQNum == (subsIndxToDspl.length - 1)) {
            setDisplay(prevValue => {
                return {
                    ...prevValue,
                    part2: false,
                    submit: true
                }
            });//setDisplay
        }
        else {
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
        if (nextIndex > (questionsII[substanceIndex].length - 1)) {
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
            if (answer > 0) {
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
        if (ansWithZero == answPt1.length) {
            console.log("todas answ pt1 con 0");
            setDisplay(prevValues => {
                return {
                    ...prevValues,
                    submit: true
                };
            });
        }
    }//setTapsIIQst


    async function submitAnswers() {
        setLoading(true);
        console.log("answ2", answPt2);
        const url = `http:${localHost}:3030/analysis/save-quest-answers`;
        const data = {
            resTaps2: answPt2,
            boleta: user.boleta
        };
        postRequest(url, data)
            .then(result => {
                setLoading(false);
                console.log("result de postReq", result);
                if (result.success) {
                    deleteStorage();
                    const analysisFlags = store("analysisFlags", JSON.stringify({ questSent: true, chatsSent: false }));
                    console.log("Se guardó la bandera de cuestionario enviado" + get("analysisFlags"))
                    props.navigation.navigate('Inicio');
                }
                else {
                    console.log('error');
                }
            })
            .catch(err => {
                console.log(err);
            });

    }//submitAnswers

    if (!display.part1 && !display.part2 && !display.submit && !display.setTapsII) {
        console.log("tapsII funct triggered");
        setDisplay(prevValues => {
            return {
                ...prevValues,
                setTapsII: true,
            }
        });
        setTapsIIQst();
    }

    async function getStorage() {
        //const keys = await getAllKeys();
        const values = await multiGet(["display", "subQstIndex", "fstQNum", "answPt1", "answPt2", "secQNum", "subsIndxToDspl", "user"]);
        if(values !==null)
        {
            //console.log(values);
            const [display, subQstIndex, fstQNum, answPt1, answPt2, secQNum, subsIndxToDspl, user] = values;
            subsIndxToDspl[1] && setSubsIndxToDspl(JSON.parse(subsIndxToDspl[1]));
            subQstIndex[1] && setSubQIndex(parseInt(subQstIndex[1]));
            secQNum[1] && setSecQNum(parseInt(secQNum[1]));
            fstQNum[1] && setFstQNum(parseInt(fstQNum[1]));
            answPt1[1] && setAnswPt1(JSON.parse(answPt1[1]));
            answPt2[1] && setAnswPt2(JSON.parse(answPt2[1]));
            display[1] && setDisplay(JSON.parse(display[1]));
            user[1] && setUser(JSON.parse(user[1]));
        }
    }//getStorage

    async function deleteStorage() {
        const deleted = await removeMany(["display", "subQstIndex", "fstQNum", "answPt1", "answPt2", "secQNum", "subsIndxToDspl"]);
        if (!deleted)
            console.log("couldnt delete quest Storage");
        else
            console.log("quest Storage deleted");
    }//deleteStorage

    useEffect(() => {
        //setLoading(true);
        getStorage();
        //deleteStorage();
        //setLoading(false);
    }, []);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            {loading && <Loading />}
            {display.part1 &&
                <QuestionFPt
                    onPressFunc={handleFAnswers}
                    fstQNum={fstQNum}
                    display={display}
                />
            }
            {display.part2 &&
                <QuestionSPt
                    onPressFunc={handleSAnswers}
                    secQNum={secQNum}
                    subQstIndex={subQstIndex}
                    subsIndxToDspl={subsIndxToDspl}
                    display={display}
                    txtInput={(subsIndxToDspl[secQNum] == 2 && subQstIndex == 10) && true}
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