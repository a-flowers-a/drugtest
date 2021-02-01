import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
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
      console.log("There is a MimeType: " + sharedMimeType);
      var chatURI = sharedData.toString();
      saveChatReceived(chatURI);
    }
    else {
      console.log("there is nothing to share");
    }
  }
//-------------------------------------------------
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          title="Dismiss"
          onPress={() => {
            ShareMenuReactView.dismissExtension();
          }}
          style={styles.destructive}
        />
        <Button
          title={sending ? "Sending..." : 'Send'}
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
      {sharedMimeType === 'text/plain' && <Text>{sharedData}</Text>}

      <View style={styles.buttonGroup}>
        <Button
          title="Dismiss with Error"
          onPress={() => {
            ShareMenuReactView.dismissExtension('Dismissed with error');
          }}
          style={styles.destructive}
        />
        <Button
          title="Continue In App"
          onPress={() => {
            ShareMenuReactView.continueInApp();
          }}
        />
        <Button
          title="Continue In App With Extra Data"
          onPress={() => {
            ShareMenuReactView.continueInApp({ hello: 'from the other side' });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  destructive: {
    color: 'red',
  },
  send: {
    color: 'blue',
  },
  sending: {
    color: 'grey',
  },
  image: {
    width: '100%',
    height: 200,
  },
  buttonGroup: {
    alignItems: 'center',
  },
});

export default Share;