import RNFetchBlob from 'rn-fetch-blob';
const dirs = RNFetchBlob.fs.dirs;
const docAppPath = `${dirs.DocumentDir}/Drugtest/temp.txt`;

export const iosStore = async (idResFinal) => {
    return await RNFetchBlob.fs.writeStream(
        docAppPath,
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
        console.log("iosStorage written in path", docAppPath);
        return true;
    })
    .catch(error => {
        console.error;
        return false;
    });
}//iosStore

export const iosGet = async () =>{
    let data = ''
    RNFetchBlob.fs.readStream(
        // file path
        docAppPath,
        // encoding, should be one of `base64`, `utf8`, `ascii`
        'utf8',
        // (optional) buffer size, default to 4096 (4095 for BASE64 encoded data)
        // when reading file in BASE64 encoding, buffer size must be multiples of 3.
        )
    .then((ifstream) => {
        ifstream.open()
        ifstream.onData((chunk) => {
          // when encoding is `ascii`, chunk will be an array contains numbers
          // otherwise it will be a string
          data += chunk;
        })
        ifstream.onError((err) => {
          console.log('error at ifsream in iosGet', err);
          return "";
        })
        ifstream.onEnd(() => {
            return data;
        })
    })
    .catch(error => {
        console.log('error at iosGet', err);
        return "";
    });
}//iosGet
