import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ActionBtn from '../components/ActionBtn';
import CustomModal from '../components/CustomModal';
import { postRequest } from '../utils/HttpRequest';
import { OkAlert } from '../components/CustomAlerts';
import { store, get } from '../utils/storage';
import Loading from '../components/Loading';
import { hash } from '../utils/hashing';
import {androidHost} from '../utils/hosts';


function Login(props) {

    const { control, handleSubmit, errors } = useForm();
    const [display, setDisplay] = useState(false);
    const [loading, setLoading] = useState(false);
    const localHost = Platform.OS == 'ios' ? "localhost" : androidHost;
    const {toggleReloadFlag} = props;

    const onSubmit = async data => {
        setLoading(true);
        const url = `http:${localHost}:3030/student/log-in`;
        const twoVals = await hash(data.boleta, data.password);
        const finalData = { boleta: twoVals[0], password: twoVals[1] };

        postRequest(url, finalData)
            .then(async result => {
                setLoading(false);
                if (result.success) {
                    const jsonObj = JSON.stringify(result.user);
                    const stored = await store("user", jsonObj);
                    const storedFlags = await store("analysisFlags", JSON.stringify({ questSent: false, chatsSent: false }));
                    if (!stored && !storedFlags)
                        OkAlert({ title: "Error", message: "No se pudo guardar sesión, tendrás que iniciar nuevamente al cerrar la aplicación" });

                    OkAlert({ title: "Bienvenido", message: result.user.name },
                        () => { toggleReloadFlag();/*props.navigation.navigate('Inicio');*/ }
                    );
                }
                else {
                    let aMessage = "No se puede iniciar sesión en este momento.";
                    if (result.wrongPass)
                        aMessage = "Datos incorrectos";
                    else if (result.notFound)
                        aMessage = "Usuario no registrado";

                    OkAlert({ title: "Error", message: aMessage });
                }
            })
            .catch(err => {
                setLoading(false);
                OkAlert({ title: "Error", message: "No se pudo conectar con el servidor" });
                console.log(err);
            });
    };//onSubmit

    const displayRecover = () => {
        setDisplay(prevValue => !prevValue);
    }//displayRecover

    async function recoverPassword(data) {
        setLoading(true);
        const url = `http:${localHost}:3030/student/reset-pass`;
        const twoVals = await hash(data.boleta);
        const finalData = { boleta: twoVals[0] };
        console.log("finalData", finalData);
        postRequest(url, finalData)
            .then(response => {
                setLoading(false);
                displayRecover();
                if (response.success) {
                    OkAlert({ title: "Éxito", message: "Se envió un correo con las instrucciones para acceder" });
                } else {
                    let mess = "No se pudo recuperar contraseña";
                    if (response.boletaNotFound)
                        mess = "No se encontró la boleta ingresada";
                    if (response.mailNotSent)
                        mess = "No se pudo enviar el correo";
                    OkAlert({ title: "Error", message: mess });
                }
            })
            .catch(err => {
                setLoading(false);
                OkAlert({ title: "Error", message: "No se pudo conectar con el servidor" })
            })
    }//recoverPassword

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#120078",/*120078 120078 */
            flex: 1,
        },
        errorText: {
            fontSize: 14,
            marginTop: 5,
            marginHorizontal: 25,
        },
        hr: {
            borderBottomColor: "#f5f4f4",
            borderBottomWidth: 1,
            marginHorizontal: 20,
            marginVertical: 5,
        },
        input: {
            //box-sizing: border-box,
            borderRadius: 5,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "white",
            color: "#f5f4f4",
            fontSize: 18,
            marginHorizontal: 15,
            marginBottom: 5,
            padding: 10,
            //width: 300,
        },
        pressText: {
            color: "#dddddd",
            fontSize: 16,
            marginLeft: 30
        },
        row: {
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 5,
        },
        text: {
            color: "#f5f4f4",
            fontSize: 20,
            textAlign: "left",
            margin: 10,
        },
    });
    return (
        <ScrollView style={styles.container}>
            {loading && <Loading />}
            <View>
                <Text style={styles.text}>Boleta</Text>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            onBlur={onBlur}
                            keyboardType='numeric'
                            maxLength={10}
                            style={styles.input}
                            onChangeText={value => onChange(value)}
                            value={value}
                        />
                    )}
                    name="boleta"
                    rules={{ required: true, pattern: /^[0-9]{3,10}$/ }}
                    defaultValue=""
                />
                {errors.boleta && <Text style={[styles.text, styles.errorText]}>{errors.boleta.type == 'pattern' ? "Boleta inválida" : "Campo requerido"}</Text>}
            </View>
            <View>
                <Text style={styles.text}>Contraseña</Text>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            onBlur={onBlur}
                            style={styles.input}
                            onChangeText={value => onChange(value)}
                            secureTextEntry={true}
                            value={value}
                        />
                    )}
                    name="password"
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errors.password && <Text style={[styles.text, styles.errorText]}>Campo requerido</Text>}
            </View>
            <ActionBtn
                btnText={"Iniciar Sesión"}
                onPressFunc={handleSubmit(onSubmit)}
            />

            <TouchableOpacity
                onPress={displayRecover}
            >
                <Text style={[styles.text, styles.pressText]}>Olvidé mi contraseña</Text>
            </TouchableOpacity>
            <View style={styles.hr} />

            <ActionBtn
                btnText={"Crear Cuenta"}
                onPressFunc={() => { props.navigation.navigate('Datos Cuenta', { create: true }); }}
            />

            {display &&
                <CustomModal
                    input={true}
                    inputName={"boleta"}
                    numericInp={true}
                    onAcceptFunc={recoverPassword}
                    onCancelFunc={displayRecover}
                    text={"Ingresa la boleta con la que te registraste:"}
                />
            }
        </ScrollView>
    );
}//Login

export default Login;