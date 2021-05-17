import React, { useCallback } from 'react';
import { Text, Linking, StyleSheet, View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

function UrlButton() {

    const handlePress = useCallback(async () => {
        try {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile           
            await Linking.openURL("https://drive.google.com/file/d/1BuI14oZzVkHpydanS_IJ9TrO08AOHWdA/view?usp=sharing");
        } catch (error) {
            console.log("URL can't be handled");
        }
    }, []);

    return (
        <TouchableOpacity  onPress={handlePress}>
            <Text style={styles.url}>Aviso de Privacidad</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
   
    url: {
        fontSize: 16,
        textAlign: 'center',
        color: "#949494",
        textDecorationLine: 'underline',
    }
})

export default UrlButton;