import React, { useState } from 'react';
import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { useForm, Controller } from "react-hook-form";
import RadioBtn from '../components/RadioBtn';
import ActionBtn from '../components/ActionBtn';
import { postRequest } from '../utils/HttpRequest';
import {OkAlert} from '../components/CustomAlerts';


function AccountForm(props){
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
    const [sex, setSex] = useState(true);
    const [shift, setShift] = useState(true);
    const { control, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        const finalData = {...data, sex, shift};
        console.log(finalData);
        const url = "http:localhost:3030/student/sign-up";
        postRequest(url, finalData)
        .then(result => {
            if (result.success)
            {                    
                /*let aTitle = ;
                if(!result.new)
                    aTitle = ;*/
                
                OkAlert(
                    {
                        title: result.new ? "Registro exitoso" : "Boleta ya registrada", 
                        message: result.message
                    },
                    () => {props.navigation.navigate('Home');}
                );
            }
            else
            {
                OkAlert({title:"Error", message:"No se pudo realizar el registro, inténtalo más tarde."});
                console.log(result.message);
            }
        })
        .catch(err => {
            OkAlert({title:"Error", message:"No se pudo conectar con el servidor."});
            console.log("error at postRequest");
            console.log(err);
        });
    };// onSubmit

    function handleRadios(name){
        if(name === "Hombre")
            setSex(true);
        else
            setSex(false);
    }//handleRadios

    function handleShift(name){
        if(name === "Matutino")
            setShift(true);
        else
            setShift(false);
    }//handleShift


    return(
        <ScrollView style={styles.container}>
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
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errors.name && <Text style={[styles.text, styles.errorText]}>Campo requerido</Text>}
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
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errors.boleta && <Text style={[styles.text, styles.errorText]}>Campo requerido</Text>}
            </View>

            <View>
                <Text style={styles.text}>E-mail</Text>
                <Controller
                    control={control}
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
                {errors.email && <Text style={[styles.text, styles.errorText]}>Campo requerido</Text>}
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
                btnText={"Crear Cuenta"}
                onPressFunc={handleSubmit(onSubmit)}
            />

        </ScrollView>
    );
}//AccountForm

export default AccountForm;