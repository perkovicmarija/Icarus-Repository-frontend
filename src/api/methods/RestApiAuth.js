import {getServerPath} from '../../consts/ServerInfo';

const RestApiAuth = {
    auth (data, resourcePath) {
        return fetch(getServerPath() + resourcePath, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Basic bXlhcHA6c2VjcmV0',
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: 'username=' + data.username + '&password=' + data.password + '&grant_type=password'
        })
            //.then(ApiStatus.statusHelper)
            .then(response => response.json())
            .catch(error => error)
            .then(data => {
                console.log(data) // The data does log!
                return data
            })
    }
}


export default RestApiAuth;
