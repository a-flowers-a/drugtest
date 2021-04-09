import RNFetchBlob from 'rn-fetch-blob';

const lastPartPath = "Data/Drugtest/temp.txt";
const dirs = RNFetchBlob.fs.dirs;
const docDir = dirs.DocumentDir;
const upToContainers = docDir.split('Data')[0];
const finalPath = upToContainers + lastPartPath;

export const iosStore = async (idResFinal) => {
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
    return await RNFetchBlob.fs.readFile(finalPath, 'utf8')
    .then((data) => {
        return data;
    })
    .catch(error => {
        console.log('error at iosGet', error);
        return "";
    });
}//iosGet
