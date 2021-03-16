import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ActionBtn from '../components/ActionBtn';
import CustomModal from '../components/CustomModal';
import { postRequest } from '../utils/HttpRequest';
import {OkAlert} from '../components/CustomAlerts';

function Login(props){

    const { control, handleSubmit, errors } = useForm();
    const [display, setDisplay] = useState(false);
    
    const onSubmit = data => {
        const url = "http:localhost:3030/student/log-in";
        postRequest(url, data)
        .then(result => {
            if (result.success)
            {
                OkAlert({title: "Bienvenido", message: result.message||result.name},
                    () => {props.navigation.navigate('Home');}
                );
            }
            else
            {
                let aMessage = "No se puede iniciar sesión en este momento.";
                if(result.wrongPass)
                    aMessage = "Datos incorrectos";
                else if(result.notFound)
                    aMessage = "Usuario no registrado";

                OkAlert({title:"Error", message: aMessage },
                        () => {});
            }
        })
        .catch(err => {
            OkAlert({title:"Error", message:"No se pudo conectar con el servidor"});
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
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errors.boleta && <Text style={[styles.text, styles.errorText]}>Campo requerido</Text>}
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
                onPressFunc={() => {props.navigation.navigate('Datos Cuenta');}}
            />

        {display &&
            <CustomModal 
                onAcceptFunc={recoverPassword}
                onCancelFunc={displayRecover}
                text={"Ingresa la boleta con la que te registraste:"}
                input={true}
            />
        }
        </ScrollView>
    );
}//Login

export default Login;