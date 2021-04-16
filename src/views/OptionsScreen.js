import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { OkAlert, OkCancelAlert } from '../components/CustomAlerts';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCloud, faComment, faCommentDots, faEraser, faMinus, faMinusCircle, faMinusSquare, faPen, faPencilAlt, faPenFancy, faPowerOff, faQuestion, faTrash, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { remove } from '../utils/storage';
import { get } from '../utils/storage';
import Loading from '../components/Loading';
import CustomModal from '../components/CustomModal';
import { hash } from '../utils/hashing';
import { postRequest } from '../utils/HttpRequest';
import {androidHost} from '../utils/hosts';
import { AuthContext } from '../components/AuthProvider';

function HomeScreen(props) {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#120078",/*120078 */
            flex: 1,
            paddingVertical: 20,
        },
        icon: {
            color: "#f5f4f4",
            marginRight: 15,
        },
        optionContainer: {
            marginHorizontal: 60,
            marginVertical: 10,
        },
        row: {
            alignItems: "center", //vertically
            //backgroundColor: "black",
            //flex: 1,
            flexDirection: "row",
            marginHorizontal: 20,
        },
        text: {
            color: "#f5f4f4",
            fontSize: 20,
        },
        title: {
            fontSize: 40,
        },
        titleContainer: {
            marginBottom: 30,
        },
    });

    const localHost = Platform.OS == 'ios' ? "localhost" : androidHost;
    //FOR CONTEXT
    const { setUser } = useContext(AuthContext);


    const [userSt, setUserSt] = useState({
        name: "Nombre Alumno",
        boleta: "",
    });
    const [displayDelete, setDisplayDelete] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDisplay = () => setDisplayDelete(prevVal => !prevVal);

    async function deleteAccount(data) {
        setLoading(true);
        const url = `http:${localHost}:3030/student/delete-account`;
        const hashPass = await hash(data.password);
        const finalData = { password: hashPass[0], boleta: userSt.boleta };
        console.log(finalData);
        postRequest(url, finalData)
            .then(async response => {
                setLoading(false);
                handleDisplay();
                if (response.success) {
                    const removed = await remove("user");
                    const removedFlags = await remove("analysisFlags");
                    if (!removed)
                        console.log("couldnt remove user from storage");
                    if (!removedFlags)
                        console.log("couldn't remove flags from storage");
                    OkAlert({ title: "Éxito", message: "Se eliminó la cuenta correctamente" },
                        () => props.navigation.navigate('Inicio')
                    );
                }
                else {
                    let mess = "Problema en el servidor, no se ha podido eliminar la cuenta."
                    if (response.wrongPass)
                        mess = "Contraseña incorrecta";
                    OkAlert({ title: "Error", message: mess });
                }
            })
            .catch(err => {
                setLoading(false);
                OkAlert({ title: "Error", message: "No se pudo conectar con el servidor" })
            });
    }//deleteAccount

    function navigateTo(screenOption, paramts) {
        props.navigation.navigate(screenOption, paramts);
    }//navigateTo

    async function getUser() {
        const stUser = await get("user");
        if (stUser !== null) {
            const parsObj = JSON.parse(stUser);
            console.log("user in storage", parsObj);
            setUserSt(parsObj);
        }
        else
            console.log("not user found in storage");
    }//getUser

    useEffect(() => {
        getUser();
    }, []);
    return (
        <ScrollView style={styles.container}>
            {loading && <Loading />}
            <View style={[styles.row, styles.titleContainer]}>
                <FontAwesomeIcon
                    icon={faUserCircle}
                    style={styles.icon}
                    size={40}
                />
                <Text style={[styles.text, styles.title]}>{userSt.name}</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    OkCancelAlert({ title: "Log Out", message: "¿Quieres cerrar sesión?" },
                        async () => {
                            const removed = await remove("user");
                            const removedFlags = await remove("analysisFlags");
                            if (removed && removedFlags)
                            {
                                setUser(null);
                                //props.navigation.navigate('Inicio');
                            }
                            else{
                                !removed ? mess = "No se ha podido cerrar sesión, inténtalo nuevamente": "Algo salió mal por favor intenté nuevamente";
                                OkAlert({ title: "Error", message: mess});
                            }
                        }
                    );
                }}
                style={[styles.row, styles.optionContainer]}
            >
                <FontAwesomeIcon
                    icon={faPowerOff}
                    style={styles.icon}
                    size={20}
                />
                <Text style={[styles.text]}>Cerrar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { navigateTo('Datos Cuenta', { create: false }); }}
                style={[styles.row, styles.optionContainer]}
            >
                <FontAwesomeIcon
                    icon={faPen /*faPencilAlt faPen faPenFancy*/}
                    style={styles.icon}
                    size={20}
                />
                <Text style={[styles.text]}>Modificar datos de la cuenta</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleDisplay}
                style={[styles.row, styles.optionContainer]}
            >
                <FontAwesomeIcon
                    icon={faEraser /*faEraser faTrash faMinus*/}
                    style={styles.icon}
                    size={20}
                />
                <Text style={[styles.text]}>Eliminar Cuenta</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { navigateTo('Qué hacemos'); }}
                style={[styles.row, styles.optionContainer]}
            >
                <FontAwesomeIcon
                    icon={faCommentDots /*faCloud faComment faQuestion*/}
                    style={styles.icon}
                    size={20}
                />
                <Text style={[styles.text]}>¿Qué hacemos con tus chats?</Text>
            </TouchableOpacity>

            {displayDelete &&
                <CustomModal
                    input={true}
                    inputName={"password"}
                    password={true}
                    onAcceptFunc={deleteAccount}
                    onCancelFunc={handleDisplay}
                    text={"Ingresa tu contraseña para eliminar definitivamente tu cuenta:"}
                />
            }

        </ScrollView>
    );
}//HomeScreen

export default HomeScreen;