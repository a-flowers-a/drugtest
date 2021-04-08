import RNFetchBlob from 'rn-fetch-blob';
/*const dirs = RNFetchBlob.fs.dirs;
const docAppPath = `${dirs.DocumentDir}/Drugtest/temp.txt`;*/
/*el Documents es diferente para cada Applicación. Intentar acceder a una desde la otra
/Users/alejandro/Library/Developer/CoreSimulator/Devices/851B0417-46DF-4207-9281-C08865C4220F/data/Containers/Data/Application/DAB1FAC3-996B-4978-9B61-D91773008478/Documents/Drugtest/temp.txt
/Users/alejandro/Library/Developer/CoreSimulator/Devices/851B0417-46DF-4207-9281-C08865C4220F/data/Containers/Data/PluginKitPlugin/364E5842-3128-4BFC-A87E-DC3A760AFF12/Documents/Drugtest/temp.txt*/
const lastPartPath = "Data/Drugtest/temp.txt";;

export const iosStore = async (idResFinal) => {
    const dirs = RNFetchBlob.fs.dirs;
    const docDir = dirs.DocumentDir;
    const upToContainers = docDir.split('Data')[0];
    const finalPath = upToContainers + lastPartPath;
    return await RNFetchBlob.fs.writeStream(
        finalPath,
        // encoding, should be one of `base64`, `utf8`, `ascii`
        'utf8',
        // should data append to existing content ?
        false
    )
    .then(stream => Promise.all([
        stream.write(idResFinal),
    ]))
    // Use array destructuring to get the stream object from the first item of the array we get from Promise.all()
    .then(([stream]) => {
        stream.close();
        console.log("iosStorage written in path", finalPath);
        return true;
    })
    .catch(error => {
        console.log("erro al guardar iosStorage",error);
        console.error;
        return false;
    });
}//iosStore

export const iosGet = async () =>{
    const dirs = RNFetchBlob.fs.dirs;
    const docDir = dirs.DocumentDir;
    const upToContainers = docDir.split('Data')[0];
    const finalPath = upToContainers + lastPartPath;
    let data = '';
    return await RNFetchBlob.fs.readStream(
        // file path
        finalPath,
        // encoding, should be one of `base64`, `utf8`, `ascii`
        'utf8',
        // (optional) buffer size, default to 4096 (4095 for BASE64 encoded data)
        // when reading file in BASE64 encoding, buffer size must be multiples of 3.
        4095)
    .then((ifstream) => {
        ifstream.open()
        ifstream.onData((chunk) => {
          // when encoding is `ascii`, chunk will be an array contains numbers
          // otherwise it will be a string
          data += chunk;
          console.log("chunk found", chunk);
        })
        ifstream.onError((err) => {
          console.log('error at ifsream in iosGet', err);
          return "";
        })
        ifstream.onEnd(() => {
            console.log("onEnd", data);
            return data;
        })
    })
    .catch(error => {
        console.log('error at iosGet', err);
        return "";
    });
}//iosGet
