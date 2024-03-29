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
import { get } from './src/utils/storage';

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
  const [reloadAll, setReloadAll] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);

  function handleReloadLogged(reloadValue) {
    setReloadAll(reloadValue);
  }//handleReloadLogged

  async function getUser() {
    const fndUser = await get("user");
    if (fndUser != null) {

      const parsUsr = JSON.parse(fndUser);
      console.log("user found in appjs", parsUsr);
      setUser(true);
      if (parsUsr.admin) setAdmin(true);
      else setAdmin(false);
      setReloadAll(true);
    }
    else
      setAdmin(false);
  }//getUser

  const handleShare = useCallback((item: ?SharedItem) => {
    if (!item) {
      return;
    }

    const { mimeType, data } = item;

    setSharedData(data);
    setSharedMimeType(mimeType);
  }, []);

  useEffect(() => {
    ShareMenu.getInitialShare(handleShare);
    const listener = ShareMenu.addNewShareListener(handleShare);
    return () => listener.remove();
  }, []);

  useEffect(() => {
    getUser();
    getSharedChat();
  }, [sharedData, reloadAll]);

  const getSharedChat = async () => {
    if (sharedData) {
      let errMess = "";
      let success = true;
      const analysisFlags = await get("analysisFlags");
      if (analysisFlags) {
        setLoading(true);
        const idResFinal = JSON.parse(analysisFlags).idResFinal;
        console.log("idResFinal got from android in chat.js", idResFinal);
        if (!idResFinal) {
          success = false;
          errMess = "No se encontró un dato en el storage de tu dispositivo necesario para realizar el envío, realiza el cuestionario nuevamente.";
        }
        else {
          var chatURI = sharedData.toString();
          const ret = await handleChatURI(chatURI, idResFinal);
          if (!ret.success) {
            success = false;
            errMess = ret.message;
          }
          setSharedData('');
        }
        setLoading(false);
      }//analysisFlags
      else if (user) {
        console.log("no hay flags de analisis pero hay shared data y user");
        success = false;
        errMess = "No se encontró un dato en el storage de tu dispositivo necesario para realizar el envío, realiza el cuestionario nuevamente."
      }
      else {
        //there is no user or analysis flags
        console.log("no hay flags de analisis ni user pero hay shared data ");
        success = false;
      }
      if (success)
        OkAlert({ title: "Éxito", message: "Chat enviado correctamente." });
      else if (user && !success)
        OkAlert({ title: "Error", message: errMess });
      else
        setSharedData('');
    }
  }//getSharedChat
  /*-----------------------------End of get chat--------------- */



  return (
    <NavigationContainer key={reloadAll}>
      {loading && <Loading />}
      <Tabs.Navigator
        tabBarOptions={{
          activeTintColor: '#010101', //#fefefe #1db954 #120078
          inactiveTintColor: '#fefefe', //#fefefe
          style: {
            backgroundColor: "#aed1f5"/*#c0dcf7 #120078 #c0fefc*/
          },
          showLabel: false,
        }}

      >
        {!admin &&
          <Tabs.Screen
            name="Analysis"
            options={{
              tabBarVisible: reloadAll,
              tabBarIcon: ({ color }) => (
                <FontAwesomeIcon
                  icon={faDiceD20}
                  style={{ color: color }}
                  size={30}
                />
              )
            }}>
            {props => <AnalysisStack
              {...props}
              reloadLogged={handleReloadLogged}
              reloadValue={reloadAll}
            />}
          </Tabs.Screen>
        }
        {admin &&
          <Tabs.Screen
            name="Admin"
            options={{
              tabBarVisible: reloadAll,
              tabBarIcon: ({ color }) => (
                <FontAwesomeIcon
                  icon={faFeather /*faFilter faFeather*/}
                  style={{ color: color }}
                  size={30}
                />
              )
            }}
          >
            {props => <AdminStack
              {...props}
              reloadLogged={handleReloadLogged}
              reloadValue={reloadAll}
            />}
          </Tabs.Screen>
        }


        <Tabs.Screen
          name="Options"
          options={{
            tabBarVisible: reloadAll,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon
                icon={faBars}
                style={{ color: color }}
                size={30}
              />
            )
          }}>
          {props => <OptionsStack {...props} reloadLogged={handleReloadLogged} />}
        </Tabs.Screen>

      </Tabs.Navigator>
    </NavigationContainer>


  );
};


export default App;
