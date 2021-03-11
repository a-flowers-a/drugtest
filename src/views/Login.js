import React, { useState } from 'react';
import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ScrollView } from 'react-native-gesture-handler';
import ActionBtn from '../components/ActionBtn';
import TopAlert from '../components/TopAlert';

function Login(){

    const { control:ctrlSignIn, handleSubmit:handleSignIn, errors:errorSI } = useForm();
    const { control:ctrlSignUp, handleSubmit:handleSignUp, errors:errorSU } = useForm();
    const [display, setDisplay] = useState(false);

    const onSubmit = data => {
        console.log(data);
        if(data.email)
        {
            console.log("it is a sign up");
        }
        else
        {
            console.log("it is a sign in");
        }
    };

    const displayRecover = () => {
        setDisplay(prevValue => !prevValue);
    }//displayRecover

    function recoverPassword(){
        console.log("se recuperará passw");
    }//recoverPassword
    
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#120078",/*120078 */
            flex: 1,
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
                    defaultValue="2017630041"
                />
                {errorSI.boleta && <Text style={styles.text}>This is required</Text>}
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
                {errorSI.password && <Text style={styles.text}>This is required</Text>}
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
                    defaultValue="Luci"
                />
                {errorSU.name && <Text style={styles.text}>This is required</Text>}
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
                    defaultValue="2017630111"
                />
                {errorSU.boleta && <Text style={styles.text}>This is required</Text>}
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
                    defaultValue="example@example.com"
                />
                {errorSU.email && <Text style={styles.text}>This is required</Text>}
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
                {errorSU.password && <Text style={styles.text}>This is required</Text>}
            </View>
            <ActionBtn
                btnText={"Crear Cuenta"}
                onPressFunc={handleSignUp(onSubmit)}
            />

            {(display && <TopAlert 
                onAcceptFunc={recoverPassword}
                onCancelFunc={displayRecover}
            />)}

        </ScrollView>
    );
}//Login

export default Login;