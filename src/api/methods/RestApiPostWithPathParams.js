import {getServerPath} from '../../consts/ServerInfo';
import {statusHelper} from './utils';
import { getToken } from '../../helpers/utility';

const RestApiPostWithPathParams = {
    postData (resourcePath, data, params) {
        const token = getToken();
        if(params) {
            for (let key in params) {
                resourcePath = resourcePath.replace(":" + key, params[key])
            }
        }
        return fetch(getServerPath() + resourcePath + "?access_token=" + token, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(statusHelper)
            .then(response => response.json())
            /* .catch(error => {
                let status = error.status;
                if(status) {
                    return error.json().then(response => {
                        return {status, message: response.error}
                    })
                } else {
                    return {status : 500, message: "Server error"}
                }
            }) */
            .then(data => {
                if(data.status && data.status !== 200) {
                    throw new Error(data.message);
                }
                console.log(data) // The data does log!
                return data
            })
    }
}


export default RestApiPostWithPathParams;
