import { get, store } from '../utils/storage';

/* Looks for the analysisFlags in storage
returns: an object with the success and a message if not succeedded or the flags if did*/
export const getAnalFlags = async () => {
  const foundFlags = await get("analysisFlags");
  if (!foundFlags)
  {
    console.log("ERROR, cant get counterChat from analysisFlags in storageFlags");
    return {success: false, message: "No se encontró análisis comenzado en el storage del dispositivo, se debe iniciar uno nuevo"};
  }
  else
  {
    const parsedFlags = JSON.parse(foundFlags);
    if(!parsedFlags.questSent)//quest not done
    {
        return {success: false, message: "No se encontró análisis comenzado en el storage del dispositivo, se debe iniciar un cuestionario"};
    }
    else
      return {success: true, flags: parsedFlags};
  }
}//getAnalFlags


export const saveChatCount = async (chatCounter) => {
    const analFlags = {questSent: true, chatsSent: chatCounter}
    const storedCount = await store("analysisFlags", JSON.stringify(analFlags));
    if(!storedCount)
    {
      return {success: false, message: "No se ha podido guardar el contador de chats en el dispositivo. No te preocupes, en el servidor ya se encuentran los chats que hayas mandado."};
    }
    else
      return {success: true};
  }//saveChatCount