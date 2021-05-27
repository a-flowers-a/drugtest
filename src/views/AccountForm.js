import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, StyleSheet, Platform } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { useForm, Controller } from "react-hook-form";
import RadioBtn from '../components/RadioBtn';
import ActionBtn from '../components/ActionBtn';
import { postRequest } from '../utils/HttpRequest';
import { OkAlert } from '../components/CustomAlerts';
import { get, store } from '../utils/storage';
import Loading from '../components/Loading';
import { hash } from '../utils/hashing';
import { androidHost } from '../utils/hosts';

function AccountForm(props) {

    const localHost = Platform.OS == 'ios' ? "localhost" : androidHost;

    const { create } = props.route.params;
    const [sex, setSex] = useState(true);
    const [shift, setShift] = useState(true);
    const { control, handleSubmit, reset, errors } = useForm();
    const [loading, setLoading] = useState(false);
    const [stBoleta, setStBoleta] = useState("");
    const { reloadLogged } = props;

    const onSubmit = async data => {
        setLoading(true);
        const url = create ? `http:${localHost}:3030/student/sign-up` : `http:${localHost}:3030/student/update-info`;
        let newAndPass = ["", ""];
        let bolAndPass = ["", ""];
        if (!create) {
            const { newPass, password } = data;
            newAndPass = await hash(newPass, password);
            if (newPass === "")
                newAndPass[0] = null;

            bolAndPass[0] = stBoleta;
            bolAndPass[1] = newAndPass[1];
        }
        else {
            const { boleta, password } = data;
            bolAndPass = await hash(boleta, password);
        }
        const finalData = { ...data, sex, shift, boleta: bolAndPass[0], password: bolAndPass[1], newPass: newAndPass[0] };
        console.log("finalData to submit signup/update account", finalData);
        postRequest(url, finalData)
            .then(async result => {
                setLoading(false);
                if (result.success) {
                    const jsonObj = JSON.stringify(result.user);
                    const stored = await store("user", jsonObj);
                    if (!stored)
                        OkAlert({ title: "Error", message: "No se pudo guardar sesión, tendrás que iniciar nuevamente al cerrar la aplicación" });

                    let titl = "Datos modificados exitósamente";
                    if (create && result.new) {
                        titl = "Registro exitoso"
                        const analysisFlags = await store("analysisFlags", JSON.stringify({ questSent: false, chatsSent: false }));
                        analysisFlags ? console.log("Se crearon las banderas de análisis al crear la cuenta") : console.log("No se pudieron crear las banderas al crear la cuenta");
                    }
                    else if (create && !result.new)
                        titl = "Boleta ya registrada"

                    OkAlert(
                        {
                            title: titl,
                            message: result.message
                        },
                        () => { result.new ? reloadLogged(true) : props.navigation.navigate("Opciones", { refreshOS: true }); }
                    );
                }
                else {
                    let mess = "No se pudo realizar el registro, inténtalo más tarde.";
                    if (result.wrongPass) {
                        mess = "Contraseña actual incorrecta";
                    }
                    if (result.notExist)
                        mess = "La boleta es incorrecta";

                    OkAlert({ title: "Error", message: mess });
                }
            })
            .catch(err => {
                setLoading(false);
                OkAlert({ title: "Error", message: "No se pudo conectar con el servidor." });
            });
    };// onSubmit

    async function getStorage() {
        const userObj = await get("user");
        if (userObj !== null) {
            const parsedUser = JSON.parse(userObj);
            setStBoleta(parsedUser.boleta);
            reset({
                email: parsedUser.email,
                name: parsedUser.name,
                semester: (parsedUser.semester).toString(),
            });
            /*setValue("email", parsedUser.email);
            setValue("name", parsedUser.name);
            setValue("semester", (parsedUser.semester).toString());*/
            setSex(parsedUser.sex);
            setShift(parsedUser.shift);
        }
        else
            console.log("error, user iin storage is null");
    }//getStorage

    function handleRadios(name) {
        if (name === "Hombre")
            setSex(true);
        else
            setSex(false);
    }//handleRadios

    function handleShift(name) {
        if (name === "Matutino")
            setShift(true);
        else
            setShift(false);
    }//handleShift

    useEffect(() => {
        if (!create)
            getStorage();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {loading && <Loading />}
            <View>
                <Text style={styles.text}>Nombre</Text>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}

                        />
                    )}
                    name="name"
                    rules={{ required: true, pattern: /^[A-Za-zÀ-ú ]+$/i }}
                    defaultValue=""
                />
                {errors.name && <Text style={[styles.text, styles.errorText]}>{errors.name.type == 'pattern' ? "Nombre inválido" : "Campo requerido"}</Text>}
            </View>

            {create && (
                <View>
                    <Text style={styles.text}>Boleta</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <TextInput
                                onBlur={onBlur}
                                maxLength={15}
                                style={styles.input}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="boleta"
                        rules={{ required: true, pattern: /^[A-Z-a-z0-9]{2,15}$/ }}
                        defaultValue=""
                    />
                    {errors.boleta && <Text style={[styles.text, styles.errorText]}>{errors.boleta.type == 'pattern' ? "Boleta inválida" : "Campo requerido"}</Text>}
                </View>
            )}

            <View>
                <Text style={styles.text}>E-mail</Text>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            autoCapitalize="none"
                            onBlur={onBlur}
                            style={styles.input}
                            onChangeText={value => onChange(value)}
                            value={value}
                        />
                    )}
                    name="email"
                    rules={{ required: true, pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ }}
                    defaultValue=""
                />
                {errors.email && <Text style={[styles.text, styles.errorText]}>{errors.email.type == 'pattern' ? "Correo inválido" : "Campo requerido"}</Text>}
            </View>
            <View>
                <Text style={styles.text}>Sexo</Text>
                <View style={styles.row}>
                    <RadioBtn
                        name="Hombre"
                        selected={sex}
                        onPressFunc={() => handleRadios("Hombre")}
                    />
                    <RadioBtn
                        name="Mujer"
                        selected={!sex}
                        onPressFunc={() => handleRadios("Mujer")}
                    />
                </View>
            </View>

            <View>
                <Text style={styles.text}>Semestre</Text>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            onBlur={onBlur}
                            keyboardType='numeric'
                            maxLength={2}
                            style={styles.input}
                            onChangeText={value => onChange(value)}
                            value={value}
                        />
                    )}
                    name="semester"
                    rules={{ required: true, pattern: /^[0-9]+$/ }}
                    defaultValue=""
                />
                {errors.semester && <Text style={[styles.text, styles.errorText]}>Campo requerido</Text>}
            </View>

            <View>
                <Text style={styles.text}>Turno</Text>
                <View style={styles.row}>
                    <RadioBtn
                        name="Matutino"
                        selected={shift}
                        onPressFunc={() => handleShift("Matutino")}
                    />
                    <RadioBtn
                        name="Vespertino"
                        selected={!shift}
                        onPressFunc={() => handleShift("Vespertino")}
                    />
                </View>
            </View>


            <View>
                <Text style={styles.text}>Contraseña {!create && 'actual'} </Text>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            autoCapitalize={"none"}
                            onBlur={onBlur}
                            style={styles.input}
                            onChangeText={value => onChange(value)}
                            secureTextEntry={true}
                            value={value}
                        />
                    )}
                    name="password"
                    rules={{ required: true, pattern: /.{3,12}/ }}
                    defaultValue=""
                />
                {errors.password && <Text style={[styles.text, styles.errorText]}>{errors.password.type == 'pattern' ? "La contraseña es muy corta" : "Campo requerido"}</Text>}
            </View>

            {!create &&
                <View>
                    <Text style={styles.text}>Nueva contraseña</Text>
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
                        name="newPass"
                        rules={{ pattern: /.{3,12}/ }}
                        defaultValue=""
                    />
                    {errors.newPass && <Text style={[styles.text, styles.errorText]}>La contraseña es muy corta</Text>}
                </View>
            }


            <ActionBtn
                btnText={create ? "Crear cuenta" : "Actualizar datos"}
                onPressFunc={handleSubmit(onSubmit)}
            />

        </ScrollView>
    );
}//AccountForm

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#aed1f5",/*120078 */
        flex: 1,
    },
    errorText: {
        fontSize: 14,
        marginTop: 5,
        marginHorizontal: 25,
    },
    input: {
        //box-sizing: border-box,
        borderRadius: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "white",
        color: "black",//#f5f4f4
        fontSize: 18,
        marginHorizontal: 15,
        marginBottom: 5,
        padding: 10,
        //width: 300,
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
    },
    text: {
        color: "#150e56",//#150e56 #f5f4f4
        fontSize: 20,
        textAlign: "left",
        margin: 10,
    },
});

export default AccountForm;