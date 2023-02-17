import * as serverPath from '../../consts/ServerInfo';
import * as ApiStatus from './RestApiStatus';
import { getToken } from '../../helpers/utility';
import axios from 'axios';
import { eventChannel, END } from 'redux-saga'
import * as types from '../../redux/actionTypes';

const RestApiPostDownloadAxios = {
    postData (data, resourcePath) {
        const token = getToken();
        const CancelToken = axios.CancelToken;
        let cancel;


        return eventChannel(emitter  => {
            axios({
                url: serverPath.SERVER_PATH + resourcePath + '?access_token=' + token,
                method: 'POST',
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                responseType: 'blob', // important
                onDownloadProgress: progressEvent => {
                    emitter({
                        type: types.DOWNLOAD_FILE_PROGRESS_OPEN,
                        progressOpened: true,
                    });

                    let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                    emitter({
                        type: types.DOWNLOAD_FILE_PROGRESS,
                        progress: percentCompleted,
                    });
                },
                cancelToken: new CancelToken(function executor(c) {
                    // An executor function receives a cancel function as a parameter
                    cancel = c;
                })
            })
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;

                    let filename = "";
                    const disposition = response.headers['content-disposition'];
                    if (disposition && disposition.indexOf('attachment') !== -1) {
                        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                        const matches = filenameRegex.exec(disposition);
                        if (matches !== null && matches[1]) {
                            filename = matches[1].replace(/['"]/g, '');
                        }
                    }
                    filename = decodeURIComponent(filename);

                    link.setAttribute('download', filename);
                    document.body.appendChild(link);
                    link.click();
                    emitter(END);
                });
            // The returned method can be called to cancel the channel
            return () => {
                cancel();
            };

        });
    }
}

export default RestApiPostDownloadAxios;
