/**
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnalysisStack from 'drugtest/src/components/AnalysisStack';
import AdminStack from 'drugtest/src/components/AdminStack';
import OptionsStack from 'drugtest/src/components/OptionsStack';
import ShareMenu from 'react-native-share-menu';
import { handleChatURI } from "./src/Chats";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faDiceD20, faFeather } from '@fortawesome/free-solid-svg-icons';
import Loading from './src/components/Loading';
import { OkAlert } from './src/components/CustomAlerts';

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
  const [loading, setLoading] = useState(false);

  const handleShare = useCallback((item: ?SharedItem) => {
    if (!item) {
      return;
    }

    const { mimeType, data } = item;

    setSharedData(data);
    setSharedMimeType(mimeType);
  }, []);

  useEffect(() => {
    getSharedChat();
    ShareMenu.getInitialShare(handleShare);
    const listener = ShareMenu.addNewShareListener(handleShare);
    return () => listener.remove();
  }, [sharedData]);

  const getSharedChat = async () => {
    if (sharedMimeType) {
      setLoading(true);
      console.log("There is a MimeType: " + sharedMimeType);
      var chatURI = sharedData.toString();
      const ret = await handleChatURI(chatURI);
      setLoading(false);
      if (ret.success)
        OkAlert({ title: "Éxito", message: "Chat enviado correctamente." });
      else
        OkAlert({ title: "Error", message: ret.message });
    }
    else {
      console.log("there is nothing to share");
    }
  }
  /*-----------------------------End of get chat--------------- */



  return (

    <NavigationContainer>
      { loading && <Loading />}
      <Tabs.Navigator
        tabBarOptions={{
          //tintColor: "#fefefe",
          activeTintColor: '#1db954', //fefefe #1db954
          inactiveTintColor: '#fefefe', //fefefe 9A9F99
          style: {
            backgroundColor: "#120078"
          },
        }}

      >
        <Tabs.Screen
          component={AnalysisStack}
          name="Analysis"
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon
                icon={faDiceD20}
                style={{ color: color }}
                size={30}
              />
              /*<Image
                source={require('drugtest/src/assets/bank.png')}
                style={{ tintColor: color, width: size, height: size}}
              />*/
            )
          }}
        />

        <Tabs.Screen
          component={AdminStack}
          name="Admin"
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon
                icon={faFeather /*faFilter faFeather*/}
                style={{ color: color }}
                size={30}
              />
            )
          }}
        />

        <Tabs.Screen
          component={OptionsStack}
          name="Options"
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon
                icon={faBars}
                style={{ color: color }}
                size={30}
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
