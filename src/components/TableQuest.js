import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

function TableQuest(props) {

    const tableHead = ['Sustancia', 'Puntaje'];
    const tableTitle = ["Tabaco", "Alcohol", "Marihuana", "Cocaína", "Heroína", "Otras Drogas", "Análgesico", "Ansiolítico", "TDAH Meds"];
    const { values } = props;

    return (
        <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 1 }}>
                <Row data={tableHead} flexArr={[1, 1]} style={styles.head} textStyle={styles.text} />
                <TableWrapper style={styles.wrapper}>
                    <Col data={tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text} />
                    <Rows data={values} flexArr={[1]} style={styles.row} textStyle={styles.text} />
                </TableWrapper>
            </Table>
        </View>
    );
}//TableQuest

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    wrapper: {
        flexDirection: 'row'
    },
    title: {
        flex: 1,
        backgroundColor: '#f6f8fa'
    },
    row: {
        height: 28
    },
    text: {
        textAlign: 'center'
    }
});

export default TableQuest;