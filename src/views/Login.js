import React, { useState } from 'react';
import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ScrollView } from 'react-native-gesture-handler';
import ActionBtn from '../components/ActionBtn';
import TopAlert from '../components/TopAlert';
import { postRequest } from '../utils/HttpRequest';
import RadioBtn from '../components/RadioBtn';
import {SuccessAlert} from '../components/CustomAlerts';

function Login(props){

    const { control:ctrlSignIn, handleSubmit:handleSignIn, errors:errorSI } = useForm();
    const { control:ctrlSignUp, handleSubmit:handleSignUp, errors:errorSU } = useForm();
    const [display, setDisplay] = useState(false);
    const [sex, setSex] = useState(true);
    
    function handleRadios(name){
        if(name === "Hombre")
            setSex(true);
        else
            setSex(false);
    }//handleRadios

    const onSubmit = data => {
        const finalData = {...data, sex};
        console.log(finalData);
        let option = "log-in";
        if(data.email)
            option = "sign-up";

        const url = "http:localhost:3030/student/"+option;
        postRequest(url, data)
        .then(result => {
            if (result.success)
            {
                SuccessAlert();
                //props.navigation.navigate('Home');
            }
            else
                console.log(result.message);
        })
        .catch(err => {
            console.log("error at postRequest");
            console.log(err);
        });
    };//onSubmit

    const displayRecover = () => {
        setDisplay(prevValue => !prevValue);
    }//displayRecover

    function recoverPassword(data){
        console.log("se recuperará passw con");
        console.log(data);
    }//recoverPassword
    
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
        row:{
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
    return(
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.text}>Boleta</Text>
                <Controller
                    control={ctrlSignIn}
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
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errorSI.boleta && <Text style={[styles.text, styles.errorText]}>Campo requerido</Text>}
            </View>
            <View>
                <Text style={styles.text}>Contraseña</Text>
                <Controller
                    control={ctrlSignIn}
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
                {errorSI.password && <Text style={[styles.text, styles.errorText]}>Campo requerido</Text>}
            </View>
            <ActionBtn
                btnText={"Iniciar Sesión"}
                onPressFunc={handleSignIn(onSubmit)}
            />

            <Pressable
                onPress={displayRecover}
            >
                <Text style={[styles.text, styles.pressText]}>Olvidé mi contraseña</Text>
            </Pressable>
            <View style={styles.hr} />

            <View>
                <Text style={styles.text}>Nombre</Text>
                <Controller
                    control={ctrlSignUp}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                        />
                    )}
                    name="name"
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errorSU.name && <Text style={[styles.text, styles.errorText]}>Campo requerido</Text>}
            </View>
            
            <View>
                <Text style={styles.text}>Boleta</Text>
                <Controller
                    control={ctrlSignUp}
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
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errorSU.boleta && <Text style={[styles.text, styles.errorText]}>Campo requerido</Text>}
            </View>

            <View>
                <Text style={styles.text}>E-mail</Text>
                <Controller
                    control={ctrlSignUp}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            autoCapitalize = "none"
                            onBlur={onBlur}
                            style={styles.input}
                            onChangeText={value => onChange(value)}
                            value={value}
                        />
                    )}
                    name="email"
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errorSU.email && <Text style={[styles.text, styles.errorText]}>Campo requerido</Text>}
            </View>
            
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

            <View>
                <Text style={styles.text}>Contraseña</Text>
                <Controller
                    control={ctrlSignUp}
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
                {errorSU.password && <Text style={[styles.text, styles.errorText]}>Campo requerido</Text>}
            </View>
            <ActionBtn
                btnText={"Crear Cuenta"}
                onPressFunc={handleSignUp(onSubmit)}
            />

            {(display && <TopAlert 
                onAcceptFunc={recoverPassword}
                onCancelFunc={displayRecover}
                text={"Ingresa la boleta con la que te registraste:"}
                input={true}
            />)}

        </ScrollView>
    );
}//Login

export default Login;