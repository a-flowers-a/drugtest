import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { ShareMenuReactView } from 'react-native-share-menu';
import { saveChatReceived } from "./src/Chats";

const Button = ({ onPress, title, style }) => (
  <Pressable onPress={onPress}>
    <Text style={[{ fontSize: 16, margin: 16 }, style]}>{title}</Text>
  </Pressable>
)

const Share = () => {
  const [sharedData, setSharedData] = useState('');
  const [sharedMimeType, setSharedMimeType] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    ShareMenuReactView.data().then(({ mimeType, data }) => {
      setSharedData(data);
      setSharedMimeType(mimeType);
    });
  }, []);

  /* This is the code we made to save the chat's URI inside a variable
  and then be able to fetch the chat */
  var getSharedChat = () => {
    if (sharedMimeType) {
      //console.log("There is a MimeType: " + sharedMimeType);
      var chatURI = sharedData.toString();
      saveChatReceived(chatURI);
    }
    else {
      console.log("there is nothing to share iOS");
    }
  }
//-------------------------------------------------
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          title="Cancelar"
          onPress={() => {
            ShareMenuReactView.dismissExtension();
          }}
          style={styles.destructive}
        />
        <Button
          title={sending ? "Enviando..." : 'Enviar'}
          onPress={() => {
            setSending(true);

            setTimeout(() => {
              ShareMenuReactView.dismissExtension();
            }, 3000);

            getSharedChat();
          }}
          disabled={sending}
          style={sending ? styles.sending : styles.send}
        />
      </View>

      <View style={styles.centerContent}>
          <Image 
            source={require('drugtest/src/assets/capsules.png')}
            style={styles.icon}
          />
        <Text style={styles.centerText}>¿Enviar Chat a Drugtest?</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContent: {
    alignItems: 'center',
  },
  centerText:{
    color: 'grey',
    fontSize: 20,
  },
  container: {
    flex:1,
  },
  destructive: {
    color: 'red',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon:{
    borderRadius: 40,
    margin: 20,
    width: 130,
    height: 130,
  },
  send: {
    color: 'blue',
  },
  sending: {
    color: 'grey',
  },
});

export default Share;