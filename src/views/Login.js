import React from 'react';
import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ScrollView } from 'react-native-gesture-handler';
import ActionBtn from '../components/ActionBtn';

function Login(){

    const { control, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
    
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#120078",/*120078 */
            flex: 1,
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
        text:{
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
                    defaultValue="2017630041"
                />
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
                    defaultValue=""
                />
            </View>
            <ActionBtn
                btnText={"Iniciar Sesión"}
                onPressFunc={handleSubmit(onSubmit)}
            />
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
                    defaultValue="Luci"
                />
                {errors.firstName && <Text style={styles.text}>This is required</Text>}
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
                    defaultValue="2017630111"
                />
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
                    defaultValue="example@example.com"
                />
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
                    defaultValue=""
                />
            </View>
            <ActionBtn
                btnText={"Crear Cuenta"}
                onPressFunc={handleSubmit(onSubmit)}
            />
        </ScrollView>
    );
}//Login

export default Login;