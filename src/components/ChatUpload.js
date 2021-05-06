import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { Circle, Text as TextSVG } from "react-native-svg";

function ChatUpload(props) {
    const { numChats } = props;

    const lightBlue = "#0070f3";
    const white = "white";
    const filledBlue = "#aed1f5";

    return (
        <View style={styles.chatSection}>
            <View style={styles.row}>
                <Text style={styles.text}>Chats enviados</Text>
            </View>
            <View style={styles.row}>
                <Svg width={40} height={30}>
                    <Circle stroke={numChats >= 1 ? "none" : lightBlue} fill={numChats >= 1 ? filledBlue : "none"} cx={15} cy={15} r={12} />
                    <TextSVG stroke={numChats >= 1 ? white : lightBlue} fontSize="12" x={16} y={19} textAnchor="middle"> 1 </TextSVG>
                </Svg>
                <Svg width={40} height={30}>
                    <Circle stroke={numChats >= 2 ? "none" : lightBlue} fill={numChats >= 2 ? filledBlue : "none"} cx={15} cy={15} r={12} />
                    <TextSVG stroke={numChats >= 2 ? white : lightBlue} fontSize="12" x={15} y={19} textAnchor="middle"> 2 </TextSVG>
                </Svg>
                <Svg width={40} height={30}>
                    <Circle stroke={numChats == 3 ? "none" : lightBlue} fill={numChats == 3 ? filledBlue : "none"} cx={15} cy={15} r={12} />
                    <TextSVG stroke={numChats == 3 ? white : lightBlue} fontSize="12" x={15} y={19} textAnchor="middle"> 3 </TextSVG>
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
        color: "#0070f3",//#150e56 #0070f3
        fontSize: 20,
        textAlign: "left",
        margin: 10,
    },
    chatSection: {
        alignItems: "center",
        backgroundColor: "#fefefe",
        borderRadius: 10,
        marginHorizontal: 20,
        padding: 10,
        width: 300,
    },
});

export default ChatUpload;