/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, Text, View, SafeAreaView, PermissionsAndroid, Button } from "react-native";
import AnalysisStack from 'drugtest/src/components/AnalysisStack';
import ShareMenu from 'react-native-share-menu';
import RNFetchBlob from 'react-native-fetch-blob';

const Tabs = createBottomTabNavigator();

/*----------------Get chat functionality------------------*/
type SharedItem = {
  mimeType: string,
  data: string,
};

const App: () => React$Node = () => {
  /*This is to receive the file(chat) */
  const [sharedData, setSharedData] = useState('');
  const [sharedMimeType, setSharedMimeType] = useState('');
  const [sharedExtraData, setSharedExtraData] = useState(null);

  const handleShare = useCallback((item: ?SharedItem) => {
    if (!item) {
      return;
    }

    const { mimeType, data, extraData } = item;

    setSharedData(data);
    setSharedExtraData(extraData);
    setSharedMimeType(mimeType);

  }, []);

  useEffect(() => {
    ShareMenu.getInitialShare(handleShare);
  }, []);

  useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare);

    return () => {
      listener.remove();
    };
  }, []);

  var getSharedChat = () => {
    if (sharedMimeType) {
      console.log("There is a MimeType: " + sharedMimeType);
      var chatURI = sharedData.toString();
      console.log(chatURI);//This retrieves the URI of the chat


      //for Android up to 6.0 version ask the user for permission
      if (requestStoragePermission()) {
        //Fetch chat by using its URI

        RNFetchBlob.fs.readStream(chatURI, 'utf8')
          .then((stream) => {
            console.log("Abriendo version completa del chat");
            let data = ''
            stream.open()
            stream.onData((chunk) => {
              data += chunk
            })
            stream.onEnd(() => {
              console.log(data)
            })
          })
      }


    }
    else {
      console.log("there is nothing to share");
    }
  }

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.READ_EXTERNAL_STORAGE,
        {
          title: "Drugtest App External storage permission",
          message:
            "Drugtest App needs access to your local files " +
            "so you can do all the tests.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        return true;
      } else {
        console.log("Camera permission denied");
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  };
  /*-----------------------------End of get chat--------------- */

  getSharedChat();

  return (

    <NavigationContainer>

      <Tabs.Navigator
        tabBarOptions={{
          tintColor: "#fefefe",
          style: {
            backgroundColor: "#010101"
          },
        }}

      >
        <Tabs.Screen
          component={AnalysisStack}
          name="Analysis"
          options={{
            tabBarIcon: ({ size, color }) => (
              <Image
                source={require('drugtest/src/assets/bank.png')}
                style={{ tintColor: color, width: size, height: size }}
              />
            )
          }}
        />

        {/*<Tabs.Screen
          component={nameOfTheStackComponent}
          name="Name which it will be used to be referenced"
          options={{
            tabBarIcon: ({size, color}) => (
              <Image
                source={require('drugtest/src/assets/image.png')}
                style={{ tintColor: color, width: size, height: size}}
              />
            )
          }}
        />*/}

      </Tabs.Navigator>
    </NavigationContainer>


  );
};


export default App;
