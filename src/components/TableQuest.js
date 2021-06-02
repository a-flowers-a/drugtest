import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import InfoModal from '../components/InfoModal';
import QuestMarkBtn from '../components/QuestMarkBtn';

function TableQuest(props) {

    const tableHead = ['Sustancia', 'Puntaje'];
    const tableTitle = ["Tabaco", "Alcohol", "Marihuana", "Cocaína", "Heroína", "Otras Drogas", "Análgesico", "Ansiolítico", "TDAH Meds"];
    const { values } = props;
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 1 }}>
                <Row data={tableHead} flexArr={[1, 1]} style={styles.head} textStyle={styles.text} />
                <TableWrapper style={styles.wrapper}>
                    <Col data={tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text} />
                    <Rows data={values} flexArr={[1]} style={styles.row} textStyle={styles.text} />
                </TableWrapper>
            </Table>
            <View style={[styles.rowDir]} >
                <QuestMarkBtn
                    onPressFunc={() => setModalVisible(!modalVisible)}
                    extraStyles={[styles.marginLeft]}
                />
                {modalVisible && <InfoModal
                    onAcceptFunc={() => setModalVisible(!modalVisible)}
                    text={questExplanation} />}
            </View>
        </View>
    );
}//TableQuest

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fefefe',
        borderRadius: 10,
        marginHorizontal: 20,
        shadowColor: "#120078",//#b0deff #5edfff #010a43 #000 #120078
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
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
    },
    rowDir: {
        flexDirection: "row",
    },
    marginLeft: {
        marginLeft: 340
    }
});

const questExplanation = "Se muestra una calificación para cada sustancia. Si el puntaje es mayor a dos para alcohol o tabaco, se recomienda acudir con un especialista ,mientras que para el resto de las sustancias, se recomienda acudir con el especialista desde el puntaje uno.";

export default TableQuest;