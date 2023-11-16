import {getServerPath} from '../../../consts/ServerInfo';
import {statusHelper} from '../utils';
import {getToken} from '../../../helpers/utility';
import axios from 'axios';
import {END, eventChannel} from 'redux-saga'

const RestApiPostMultipart = {
    postData (data, resourcePath) {
        const token = getToken();

        let formData = new FormData();

        for(let name in data) {
            formData.append(name, data[name]);
        }

        const CancelToken = axios.CancelToken;
        let cancel;

        return eventChannel(emitter  => {
            axios({
                url: getServerPath() + resourcePath + '?access_token=' + token,
                method: 'POST',
                data: formData,
                onUploadProgress: progressEvent => {

                    emitter({openDialog: true});

                    let progress = Math.floor((progressEvent.loaded * 100) / progressEvent.total);

                    emitter({progress});
                },
                cancelToken: new CancelToken(function executor(c) {
                    // An executor function receives a cancel function as a parameter
                    cancel = c;
                })
            })
                .then(statusHelper)
                //.catch(error => error)
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


export default RestApiPostMultipart;
