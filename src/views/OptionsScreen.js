import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { OkAlert, OkCancelAlert } from '../components/CustomAlerts';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCommentDots, faEraser, faPen, faPowerOff, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { remove } from '../utils/storage';
import { get } from '../utils/storage';
import Loading from '../components/Loading';
import CustomModal from '../components/CustomModal';
import { hash } from '../utils/hashing';
import { postRequest } from '../utils/HttpRequest';
import { androidHost } from '../utils/hosts';
import Login from './Login';
import { removeMany } from '../utils/storage';


function HomeScreen(props) {
    const { refreshOS } = props.route.params || false;
    const localHost = Platform.OS == 'ios' ? "localhost" : androidHost;
    const [user, setUser] = useState(null);
    const [displayDelete, setDisplayDelete] = useState(false);
    const [loading, setLoading] = useState(false);
    const { reloadLogged } = props;

    if (refreshOS) {
        props.route.params.refreshOS = false;
        getUser();
    }

    const handleDisplay = () => setDisplayDelete(prevVal => !prevVal);

    async function deleteAccount(data) {
        handleDisplay();
        setLoading(true);
        const url = `http:${localHost}:3030/student/delete-account`;
        const hashPass = await hash(data.password);
        const finalData = { password: hashPass[0], boleta: user.boleta };
        console.log(finalData);
        postRequest(url, finalData)
            .then(async response => {
                setLoading(false);
                if (response.success) {
                    const removed = await remove("user");
                    const removedFlags = await remove("analysisFlags");
                    if (!removed)
                        console.log("couldnt remove user from storage");
                    if (!removedFlags)
                        console.log("couldn't remove flags from storage");
                    OkAlert({ title: "Éxito", message: "Se eliminó la cuenta correctamente" },
                        () => { setUser(null); reloadLogged(false); }
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

    async function deleteStorage() {
        const deleted = await removeMany(["display", "subQstIndex", "fstQNum", "answPt1", "answPt2", "secQNum", "subsIndxToDspl"]);
        if (!deleted)
            console.log("couldnt delete quest Storage");
        else
            console.log("quest Storage deleted");
    }//deleteStorage

    async function getUser() {
        const stUser = await get("user");
        if (stUser !== null) {
            const parsObj = JSON.parse(stUser);
            console.log("user in storage in optionss", parsObj);
            setUser(parsObj);
        }
        else
            console.log("not user found in OptionsScreen");
    }//getUser

    useEffect(() => {
        getUser();
    }, []);

    if (!user)
        return (
            <Login
                navigation={props.navigation}
                reloadLogged={props.reloadLogged}
            />
        );
    return (
        <ScrollView style={styles.container}>
            {loading && <Loading />}
            <View style={[styles.row, styles.titleContainer]}>
                <FontAwesomeIcon
                    icon={faUserCircle}
                    style={styles.icon}
                    size={40}
                />
                <View style={styles.textContainer}>
                    <Text style={[styles.text, styles.title]}>{user.name}</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => {
                    OkCancelAlert({ title: "Log Out", message: "¿Quieres cerrar sesión?" },
                        async () => {
                            const removed = await removeMany(["user", "analysisFlags"]);
                            await deleteStorage();
                            if (removed) {
                                setUser(null);
                                reloadLogged(false);
                                console.log("Log-out: removed analysis flags and user");
                            }
                            else {
                                !removed ? mess = "No se ha podido cerrar sesión, inténtalo nuevamente" : "Algo salió mal por favor intenté nuevamente";
                                OkAlert({ title: "Error", message: mess });
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
                <View style={styles.textContainer}>
                    <Text style={[styles.text]}>Cerrar Sesión</Text>
                </View>
            </TouchableOpacity>
            {!user.admin &&
                <TouchableOpacity
                    onPress={() => { navigateTo('Datos Cuenta', { create: false }); }}
                    style={[styles.row, styles.optionContainer]}
                >
                    <FontAwesomeIcon
                        icon={faPen /*faPencilAlt faPen faPenFancy*/}
                        style={styles.icon}
                        size={20}
                    />
                    <View style={styles.textContainer}>
                        <Text style={[styles.text]}>Modificar datos de la cuenta</Text>
                    </View>
                </TouchableOpacity>
            }
            {!user.admin &&
                <TouchableOpacity
                    onPress={handleDisplay}
                    style={[styles.row, styles.optionContainer]}
                >
                    <FontAwesomeIcon
                        icon={faEraser /*faEraser faTrash faMinus*/}
                        style={styles.icon}
                        size={20}
                    />
                    <View style={styles.textContainer}>
                        <Text style={[styles.text]}>Eliminar Cuenta</Text>
                    </View>
                </TouchableOpacity>
            }
            {!user.admin &&
                <TouchableOpacity
                    onPress={() => { navigateTo('Qué hacemos'); }}
                    style={[styles.row, styles.optionContainer]}
                >
                    <FontAwesomeIcon
                        icon={faCommentDots /*faCloud faComment faQuestion*/}
                        style={styles.icon}
                        size={20}
                    />
                    <View style={styles.textContainer}>
                        <Text style={[styles.text]}>¿Qué hacemos con tus chats?</Text>
                    </View>
                </TouchableOpacity>
            }

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

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#aed1f5",/*#c0dcf7 #120078 #c0fefc #aed1f5 #faf9fb*/
        flex: 1,
        paddingVertical: 20,
    },
    icon: {
        color: "#0070f3", /*#120078 #f5f4f4 drs #1579fe #0070f3 #faf9fb*/
        marginRight: 15,
    },
    optionContainer: {
        marginHorizontal: 60,
        marginVertical: 10,
    },
    row: {
        alignItems: "center", //vertically
        //flex: 1,
        flexDirection: "row",
        marginHorizontal: 20,
    },
    text: {
        color: "#010101",/*#150e56 #120078 #1f368d #010101*/
        fontSize: 20,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 40,
    },
    titleContainer: {
        marginBottom: 30,
    },
});

export default HomeScreen;