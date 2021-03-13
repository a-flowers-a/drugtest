import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ResultItem from '../components/ResultItem';

function PrevResultsScreen(){
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#120078",/*120078 */
            flex: 1,
            paddingVertical: 10,
        },
    });

    return(
        <ScrollView style={styles.container}>
            <ResultItem />
            <ResultItem />
            <ResultItem />
        </ScrollView>
    );
}//PrevResultsScreen

export default PrevResultsScreen;