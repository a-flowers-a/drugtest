import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { Circle, Text as TextSVG } from "react-native-svg";

function ChatUpload(props) {
    const { hidden, numChats } = props;
    console.log("numChats en chatUpload", numChats);
    const [displayTut, setDisplayTut] = useState(false);

    const displayChatTutorial = () => {
        setDisplayTut(prevValue => !prevValue);
    }//displayChatTutorial

    const styles = StyleSheet.create({
        row: {
            display: "flex",
            flexDirection: "row",
        },
        text: {
            color: "#dddddd",
            fontSize: 20,
            textAlign: "left",
            margin: 10,
        },
        pressText: {
            color: "#dddddd",
            fontSize: 16,
        },
        chatSection: {
            alignItems: "center",
            marginTop: 10
        },
    });

    const green = "#1db954";
    const white = "white";

    return (
        <View >
            {hidden ? null :
                <TouchableOpacity onPress={displayChatTutorial} style={styles.chatSection}>
                    <View style={styles.hr} />
                    <View style={styles.row}>
                        <Svg width={40} height={30}>
                            <TextSVG stroke={numChats >= 1 ? green: white} fontSize="12" x={16} y={19} textAnchor="middle"> 1 </TextSVG>
                            <Circle stroke="#2162cc" fill="none" cx={15} cy={15} r={12} />
                        </Svg>
                        <Svg width={40} height={30}>
                            <TextSVG stroke={numChats >= 2 ? green: white} fontSize="12" x={15} y={19} textAnchor="middle"> 2 </TextSVG>
                            <Circle stroke="#2162cc" fill="none" cx={15} cy={15} r={12} />
                        </Svg>
                        <Svg width={40} height={30}>
                            <TextSVG stroke={numChats == 3 ? green: white} fontSize="12" x={15} y={19} textAnchor="middle"> 3 </TextSVG>
                            <Circle stroke="#2162cc" fill="none" cx={15} cy={15} r={12} />
                        </Svg>
                    </View>
                    <Text style={[styles.text, styles.pressText]}>¿Cómo exportar chats?</Text>
                    {displayTut && <View />}
                </TouchableOpacity>
            }
        </View>
    );
}//ChatUpload

export default ChatUpload;