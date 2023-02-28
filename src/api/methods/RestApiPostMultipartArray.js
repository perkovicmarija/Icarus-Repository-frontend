import {getServerPath} from '../../consts/ServerInfo';
import * as ApiStatus from './RestApiStatus';
import { getToken } from '../../helpers/utility';

const RestApiPostMultipartArray = {
    postData (data, resourcePath) {
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

        return fetch(getServerPath() + resourcePath + '?access_token=' + token, {
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


export default RestApiPostMultipartArray;
