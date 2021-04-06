import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { ShareMenuReactView } from 'react-native-share-menu';
import { handleChatURI } from "drugtest/src/Chats.js";
import Loading from 'drugtest/src/components/Loading';
import { get, store } from '../utils/storage';

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

  async function getAnalFlags() {
    const foundFlags = await get("analysisFlags");
    if (!foundFlags)
    {
      console.log("ERROR, cant get counterChat from analysisFlags in share.js, reseting them to 1");
      setErrorMess(true);
      setMessage("No se encontró análisis comenzado en el storage del dispositivo, se debe iniciar uno nuevo");
      return false;
    }
    else
    {
      const parsedFlags = JSON.parse(foundFlags);
      if(!parsedFlags.questSent)//quest not done
      {
        setErrorMess(true);
        setMessage("No se encontró análisis comenzado en el storage del dispositivo, se debe iniciar un cuestionario");
        return false;
      }
      else
        return parsedFlags;
    }
  }//getAnalFlags

  async function saveChatCount(chatCounter){
    const analFlags = {questSent: true, chatsSent: chatCounter}
    const storedCount = await store("analysisFlags", JSON.stringify(analFlags));
    if(!storedCount)
    {
      setErrorMess(true);
      setMessage("No se ha podido guardar el contador de chats en el dispositivo. No te preocupes, en el servidor ya se encuentran los chats que hayas mandado.");
      return false;
    }
    else
      return true;
  }//saveChatCount

  /* This is the code we made to save the chat's URI inside a variable
  and then be able to fetch the chat */
  const handleSharing = async () => {
    if (sharedMimeType)
    {
      const existingFlags = await getAnalFlags();
      if(existingFlags)
      {
        setSending(true);
        const {chatsSent} = existingFlags;
        var chatURI = sharedData.toString();
        const ret = await handleChatURI(chatURI);
        setSending(false);
        if(ret.success)
        {
          return await saveChatCount(ret.chatCounter);
        }
        else
        {
          setErrorMess(true);
          setMessage(ret.message);
          return false;
        }
      }//existingFlags
      else
        return false;
    }
    else {
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
              if(await handleSharing())
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