import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { Circle, Text as TextSVG } from "react-native-svg";

function ChatUpload(props) {
    const { numChats } = props;

    const lightBlue = "#0070f3";
    const white = "white";
    const circunference = "#120078";

    return (
        <View style={styles.chatSection}>
            <View style={styles.row}>
                <Text style={styles.text}>Chats enviados</Text>
            </View>
            <View style={styles.row}>
                <Svg width={40} height={30}>
                    <TextSVG stroke={numChats >= 1 ? lightBlue : white} fontSize="12" x={16} y={19} textAnchor="middle"> 1 </TextSVG>
                    <Circle stroke={circunference} fill="none" cx={15} cy={15} r={12} />
                </Svg>
                <Svg width={40} height={30}>
                    <TextSVG stroke={numChats >= 2 ? lightBlue : white} fontSize="12" x={15} y={19} textAnchor="middle"> 2 </TextSVG>
                    <Circle stroke={circunference} fill="none" cx={15} cy={15} r={12} />
                </Svg>
                <Svg width={40} height={30}>
                    <TextSVG stroke={numChats == 3 ? lightBlue : white} fontSize="12" x={15} y={19} textAnchor="middle"> 3 </TextSVG>
                    <Circle stroke={circunference} fill="none" cx={15} cy={15} r={12} />
                </Svg>
            </View>
        </View>
    );
}//ChatUpload

const styles = StyleSheet.create({
    row: {
        display: "flex",
        flexDirection: "row",
    },
    text: {
        color: "#0070f3",
        fontSize: 20,
        textAlign: "left",
        margin: 10,
    },
    pressText: {
        color: "#dddddd",
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    chatSection: {
        alignItems: "center",
        marginTop: 5
    },
});

export default ChatUpload;