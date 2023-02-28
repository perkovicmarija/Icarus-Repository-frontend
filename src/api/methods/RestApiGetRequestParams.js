import {getServerPath} from '../../consts/ServerInfo';
import * as ApiStatus from './RestApiStatus';
import { getToken } from '../../helpers/utility';

const RestApiGetRequestParams = {
    getData (resourcePath, requestParams, addAccessToken = true) {
        const token = getToken();
        if(requestParams || addAccessToken) {
            resourcePath += "?";
        }
        if(requestParams) {
            for (let key in requestParams) {
                if(requestParams[key] && requestParams[key] !== null) {
                    if (requestParams[key] instanceof Array) {
                        let array = "";
                        for (let i = 0, length = requestParams[key].length; i < length; i++) {
                            array += requestParams[key][i];
                            if(i + 1 !== length) {
                                array += ","
                            }
                        }
                        resourcePath += key + "=" + encodeURIComponent(array) + "&";
                    } else {
                        resourcePath += key + "=" + requestParams[key] + "&";
                    }
                }
            }
        }

        if(addAccessToken) {
            resourcePath = resourcePath + "access_token=" + token;
        }

        return fetch(getServerPath() + resourcePath, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(ApiStatus.statusHelper)
            .then(response => response.json())
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
            .then(data => {
                if(data.status && data.status !== 200) {
                    throw new Error(data.message);
                }
                console.log(data); // The data does log!
                return data
            })
    }
}


export default RestApiGetRequestParams;
