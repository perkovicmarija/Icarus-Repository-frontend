import {getServerPath} from '../../consts/ServerInfo';
import {statusHelper} from './utils';
import { getToken } from '../../helpers/utility';

const RestApiGetWithParams = {
    getData (data, resourcePath) {
        const token = getToken()
        let query = "?";
        if(data) {
            query += Object.keys(data)
                .map(k => k + "=" + data[k])
                .join('&')
        }
        return fetch(getServerPath() + resourcePath + query + "&access_token=" + token, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(statusHelper)
            .then(response => response.json())
            .catch(error => error)
            .then(data => {
                console.log(data); // The data does log!
                return data
            })
    }
}

export default RestApiGetWithParams;