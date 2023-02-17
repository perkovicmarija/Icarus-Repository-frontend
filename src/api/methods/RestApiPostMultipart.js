import * as serverPath from '../../consts/ServerInfo';
import * as ApiStatus from './RestApiStatus';
import { getToken } from '../../helpers/utility';

const RestApiPostMultipart = {
    postData (data, resourcePath) {
        const token = getToken();

        let formData = new FormData();

        for(var name in data) {
            formData.append(name, data[name]);
        }

        return fetch(serverPath.SERVER_PATH + resourcePath + '?access_token=' + token, {
            method: 'POST',
            body: formData
        })
            .then(ApiStatus.statusHelper)
            .then(response => response.json())
            .catch(error => error)
            .then(data => {
                console.log(data) // The data does log!
                return data
            })
    }
}


export default RestApiPostMultipart;
