import {getServerPath} from '../../../consts/ServerInfo';
import {getToken} from '../../../helpers/utility';
import axios from 'axios';
import {END, eventChannel} from 'redux-saga'

const RestApiPostViewAxios = {
    postData (data, resourcePath) {
        const token = getToken();
        const CancelToken = axios.CancelToken;
        let cancel;


        return eventChannel(emitter  => {
            emitter({openDialog: true});
            axios({
                url: getServerPath() + resourcePath + '?access_token=' + token,
                method: 'POST',
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                responseType: 'arraybuffer',
                //responseType: 'blob', // important
                onDownloadProgress: progressEvent => {
                    let progress = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                    emitter({progress});
                },
                cancelToken: new CancelToken(function executor(c) {
                    // An executor function receives a cancel function as a parameter
                    cancel = c;
                })
            })
                .then((response) => {
/*                    let len = response.data.length;
                    let bytes = new Uint8Array( len );
                    for (let i = 0; i < len; i++){
                        bytes[i] = response.data.charCodeAt(i);
                    }*/
                    emitter({success: true, data: response});
                    emitter(END);
                });
            // The returned method can be called to cancel the channel
            return () => {
                cancel();
            };

        });
    }
}

export default RestApiPostViewAxios;
