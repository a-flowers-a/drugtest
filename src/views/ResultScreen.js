import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
//import { Icon } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/MaterialIcons'
//Icon.loadFont();
import * as Progress from 'react-native-progress';

function ResultScreen() {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#120078",/*120078 */
            flex: 1,
        },
        contentContainer:{
            alignItems: "center",
        },
        row:{
            flexDirection: "row",
            justifyContent: 'center'
        },
        subtitle:{
            fontSize: 25,
        },
        text:{
            color: "#f5f4f4",
            padding: 20,
        },
        title:{
            fontSize: 30,
        },
    });


    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            <Text style={[styles.text, styles.title]}>Resultado</Text>
            <View style={styles.row}>
                <Progress.Bar progress={0.6} width={300} />
            </View>
            <Text style={[styles.text, styles.subtitle]}>Análisis Chats</Text>
            <Text style={[styles.text, styles.subtitle]}>Análisis de Sentimientos</Text>
            <View style={styles.row}>
                {/*<Icon
                    name='meh'
                    type='font-awesome'
                    color='#517fa4'
                    size={55}
                />*/}
            </View>
            <Text style={[styles.text, styles.subtitle]}>Resultado Cuestionario</Text>        
        </ScrollView>
    );
}//ResultScreen

export default ResultScreen;