import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { Circle, Text as TextSVG } from "react-native-svg";

function ChatUploadSection(props) {
    const { hidden } = props;
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
            color: "#f5f4f4",
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
            marginBottom: 10
        },
        hr: {
            borderBottomColor: "#f5f4f4",
            borderBottomWidth: 1,
            paddingBottom: 5
        },
    });

    return (
        <View >
            {hidden ? null :
                <TouchableOpacity onPress={displayChatTutorial} style={styles.chatSection}>
                    <Text style={[styles.text, styles.pressText, styles.hr ]}>¿Cómo exportar chats?</Text>
                    <View style={styles.hr} />
                    <View style={styles.row}>
                        <Svg width={40} height={40}>
                            <TextSVG stroke="white" fontSize="12" x={16} y={19} textAnchor="middle"> 1 </TextSVG>
                            <Circle stroke="#2162cc" fill="none" cx={15} cy={15} r={12} />
                        </Svg>
                        <Svg width={40} height={40}>
                            <TextSVG stroke="white" fontSize="12" x={15} y={19} textAnchor="middle"> 2 </TextSVG>
                            <Circle stroke="#2162cc" fill="none" cx={15} cy={15} r={12} />
                        </Svg>
                        <Svg width={40} height={40}>
                            <TextSVG stroke="white" fontSize="12" x={15} y={19} textAnchor="middle"> 3 </TextSVG>
                            <Circle stroke="#2162cc" fill="none" cx={15} cy={15} r={12} />
                        </Svg>
                    </View>
                    {displayTut && <View />}
                </TouchableOpacity>
            }
        </View>
    );
}//ChatUploadSection

export default ChatUploadSection;