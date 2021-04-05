import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { ShareMenuReactView } from 'react-native-share-menu';
import { saveChatReceived } from "./src/Chats";
import Loading from './src/components/Loading';

const Button = ({ onPress, title, style }) => (
  <Pressable onPress={onPress}>
    <Text style={[{ fontSize: 16, margin: 16 }, style]}>{title}</Text>
  </Pressable>
)

const Share = () => {
  const [sharedData, setSharedData] = useState('');
  const [sharedMimeType, setSharedMimeType] = useState('');
  const [sending, setSending] = useState(false);
  const [errorMes, setErrorMess] = useState(false);
  const [message, setMessage] = useState('¿Enviar Chat a Drugtest?');

  useEffect(() => {
    ShareMenuReactView.data().then(({ mimeType, data }) => {
      setSharedData(data);
      setSharedMimeType(mimeType);
    });
  }, []);

  /* This is the code we made to save the chat's URI inside a variable
  and then be able to fetch the chat */
  const getSharedChat = async () => {
    setSending(true);
    if (sharedMimeType) {
      //console.log("There is a MimeType: " + sharedMimeType);
      var chatURI = sharedData.toString();
      const ret = await saveChatReceived(chatURI);
      setSending(false);
      if(ret.success)
        return true;
      else
      {
        setErrorMess(true);
        setMessage(ret.message);
        return false;
      }
    }
    else {
      setSending(false);
      console.log("there is nothing to share iOS in SHare.js");
      return false;
    }
  }
//-------------------------------------------------
  return (
    <View style={styles.container}>
      {sending && <Loading/>}
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
          onPress={async () => {
            if(await getSharedChat())
              ShareMenuReactView.dismissExtension();
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
          <View style={styles.textContainer}>
            <Text style={[styles.centerText, errorMes && styles.destructive]}>
              {message}
            </Text>
          </View>
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
    textAlign: "center",
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
  textContainer:{
    marginHorizontal: 15,
  }
});

export default Share;