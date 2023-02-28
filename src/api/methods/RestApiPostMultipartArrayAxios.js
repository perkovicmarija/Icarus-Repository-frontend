import {getServerPath} from '../../consts/ServerInfo';
import * as ApiStatus from './RestApiStatus';
import { getToken } from '../../helpers/utility';
import axios from 'axios';
import { eventChannel, END } from 'redux-saga'

const RestApiPostMultipartArray = {
    postData (data, resourcePath) {
        debugger;
        const token = getToken();

        let formData = new FormData();
        for (let file of data.files) {
            formData.append('files',file)
        }
        for(let name in data) {
            if(name !== "files") {
                formData.append(name, data[name]);
            }
        }

        const CancelToken = axios.CancelToken;
        let cancel;

        return eventChannel(emitter  => {
            emitter({openDialog: true});
            axios({
                url: getServerPath() + resourcePath + '?access_token=' + token,
                method: 'POST',
                data: formData,
                onUploadProgress: progressEvent => {
                    let progress = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                    emitter({progress});
                },
                cancelToken: new CancelToken(function executor(c) {
                    // An executor function receives a cancel function as a parameter
                    cancel = c;
                })
            })
                .then(ApiStatus.statusHelper)
                .catch(error => error)
                .then(response => {
                    emitter({success: true, data: response.data});
                    emitter(END);
                })
            // The returned method can be called to cancel the channel
            return () => {
                cancel();
            };

        });
    }
}


export default RestApiPostMultipartArray;
