import React, { useCallback } from 'react';
import { Text, Linking, StyleSheet } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

function UrlButton() {

    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL("https://drive.google.com/file/d/1BuI14oZzVkHpydanS_IJ9TrO08AOHWdA/view?usp=sharing");

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL("https://drive.google.com/file/d/1BuI14oZzVkHpydanS_IJ9TrO08AOHWdA/view?usp=sharing");
        } else {
            console.log("URL can't be handled");
        }
    }, []);

    return (
        <TouchableOpacity
            onPress={handlePress}>
            <Text style={[styles.text, styles.pressText, styles.url]}>Aviso de Privacidad</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    pressText: {
        color: "#f2f2f2",
        fontSize: 16,
        marginLeft: 30
    }, text: {
        color: "#150e56",
        fontSize: 20,
        textAlign: "left",
        margin: 10,
    },
    url: {
        textAlign: 'center',
        paddingTop: '65%',
        color: "#949494",
        textDecorationLine: 'underline',
    }
})

export default UrlButton;