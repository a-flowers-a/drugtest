import React, { useState } from 'react';
import { Text, View, TextInput, Pressable, StyleSheet, Platform } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { useForm, Controller } from "react-hook-form";
import RadioBtn from '../components/RadioBtn';
import ActionBtn from '../components/ActionBtn';
import { postRequest } from '../utils/HttpRequest';
import { OkAlert } from '../components/CustomAlerts';
import { store } from '../utils/storage';
import Loading from '../components/Loading';
import { hash } from '../utils/hashing';

function AccountForm(props) {

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#120078",/*120078 */
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
        },
        text: {
            color: "#f5f4f4",
            fontSize: 20,
            textAlign: "left",
            margin: 10,
        },
    });
    const { create } = props.route.params;

    const [sex, setSex] = useState(true);
    const [shift, setShift] = useState(true);
    const { control, handleSubmit, errors } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async data => {
        setLoading(true);
        const localHost = Platform.OS == 'ios' ? "localhost" : "192.168.1.89";
        const url = create ? `http:${localHost}:3030/student/sign-up` : `http:${localHost}:3030/student/update-info`;
        console.log(url);
        const { boleta, password, newPass } = data;
        let HnewPass = "";
        if (!create) {
            HnewPass = await hash(newPass);
        }
        const twoVals = await hash(boleta, password);
        const finalData = { ...data, sex, shift, boleta: twoVals[0], password: twoVals[1], newPass: HnewPass[0] };
        postRequest(url, finalData)
            .then(async result => {
                setLoading(false);
                if (result.success) {
                    const jsonObj = JSON.stringify(result.user);
                    const stored = await store("user", jsonObj);
                    if (!stored)
                        OkAlert({ title: "Error", message: "No se pudo guardar sesión, tendrás que iniciar nuevamente al cerrar la aplicación" });

                    let titl = "Datos modificados exitósamente";
                    if (create && result.new)
                        titl = "Registro exitoso"
                    else if (create && !result.new)
                        titl = "Boleta ya registrada"

                    OkAlert(
                        {
                            title: titl,
                            message: result.message
                        },
                        () => { props.navigation.navigate('Inicio'); }
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
                    console.log(result.message);
                }
            })
            .catch(err => {
                setLoading(false);
                OkAlert({ title: "Error", message: "No se pudo conectar con el servidor." });
            });
    };// onSubmit

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
                    rules={{ required: true, pattern: /^[A-Za-z]+$/i }}
                    defaultValue=""
                />
                {errors.name && <Text style={[styles.text, styles.errorText]}>{errors.name.type == 'pattern' ? "Nombre inválido" : "Campo requerido"}</Text>}
            </View>

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
                    rules={{ required: true, pattern: /^[0-9]{2,10}$/ }}
                    defaultValue=""
                />
                {errors.boleta && <Text style={[styles.text, styles.errorText]}>{errors.boleta.type == 'pattern' ? "Boleta inválida" : "Campo requerido"}</Text>}
            </View>

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
                        onPressFunc={handleRadios}
                    />
                    <RadioBtn
                        name="Mujer"
                        selected={!sex}
                        onPressFunc={handleRadios}
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
                            maxLength={1}
                            style={styles.input}
                            onChangeText={value => onChange(value)}
                            value={value}
                        />
                    )}
                    name="semester"
                    rules={{ required: true }}
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
                        onPressFunc={handleShift}
                    />
                    <RadioBtn
                        name="Vespertino"
                        selected={!shift}
                        onPressFunc={handleShift}
                    />
                </View>
            </View>


            <View>
                <Text style={styles.text}>Contraseña {!create && 'actual'} </Text>
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
                        rules={{ required: true, pattern: /.{3,12}/ }}
                        defaultValue=""
                    />
                    {errors.password && <Text style={[styles.text, styles.errorText]}>{errors.password.type == 'pattern' ? "La contraseña es muy corta" : "Campo requerido"}</Text>}
                </View>
            }


            <ActionBtn
                btnText={create ? "Crear cuenta" : "Actualizar datos"}
                onPressFunc={handleSubmit(onSubmit)}
            />

        </ScrollView>
    );
}//AccountForm

export default AccountForm;