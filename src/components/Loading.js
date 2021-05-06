import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

function Loading(props){
    const styles = StyleSheet.create({
        inModalContainer:{
            alignItems: "center",
            justifyContent: 'center',
            backgroundColor:"rgba(2, 6, 28, 0.7)",
            flex:1,
        },
    });
    return(
        <Modal
            transparent={true}
            visible={true}>
            <View
                style={styles.inModalContainer}>
                <ActivityIndicator
                    size="large"
                    color="#fefefe"/*#f1f1f1 #f8f4e1 #edffec #f6c065 #79d70f*/
                />
            </View>
        </Modal>
    );
}//Loading

export default Loading;