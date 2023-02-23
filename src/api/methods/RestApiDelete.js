import * as serverPath from '../../consts/ServerInfo';
import * as ApiStatus from './RestApiStatus';
import { getToken } from '../../helpers/utility';

const RestApiDelete = {
    deleteData (pathParams, resourcePath, requestParams) {
        const token = getToken();
        if(pathParams) {
            for (let key in pathParams) {
                resourcePath = resourcePath.replace(":" + key, pathParams[key])
            }
        }
        if(requestParams) {
            resourcePath += "?";
            for (let key in requestParams) {
                resourcePath += requestParams[key].name + "=" + requestParams[key].value + "&";
            }
        }

        return fetch(serverPath.SERVER_PATH + resourcePath + "?access_token=" + token, {
            method: 'DELETE',
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


export default RestApiDelete;
