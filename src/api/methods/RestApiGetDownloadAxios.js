import axios from 'axios';
import {getServerPath} from '../../consts/ServerInfo';
import { getToken } from '../../helpers/utility';
import {END, eventChannel} from "redux-saga";
import * as types from "../../redux/actionTypes";

const RestApiGetDownloadAxios = {
    getData (resourcePath, data) {
        const token = getToken();
        const CancelToken = axios.CancelToken;
        let cancel;

        let query = "";
        if(data) {
            query = Object.keys(data)
                .map(k => data[k])
                .join('/')
        }

        return eventChannel(emitter  => {
            axios({
                url: getServerPath() + resourcePath + query + '?access_token=' + token,
                method: 'GET',
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
                .catch(error => {
                    let status = error.status;
                    if(status) {
                        return error.json().then(response => {
                            return {status, message: response.error}
                        })
                    } else {
                        return {status : 500, message: "Server error"}
                    }
                })
                .then((response) => {
                    if(response.status && response.status !== 200) {
                        emitter(new Error(response.message));
                        emitter(END)
                        return;
                    }

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

export default RestApiGetDownloadAxios;