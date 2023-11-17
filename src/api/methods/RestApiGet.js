import { getServerPath } from "../../consts/ServerInfo";
import {statusHelper} from "./utils";
import { getToken } from "../../helpers/utility";
import { toast } from "react-toastify";

const RestApiGet = {
  getData(resourcePath, pathParams, requestParams, toastMessage) {
    const token = getToken();
    if (pathParams) {
      for (let key in pathParams) {
        resourcePath = resourcePath.replace(":" + key, pathParams[key]);
      }
    }
    if (requestParams) {
      resourcePath += "?";
      for (let key in requestParams) {
        resourcePath +=
          requestParams[key].name + "=" + requestParams[key].value + "&";
      }
    }

    const toastInProgress = toastMessage && toast("Fetching data");
    return fetch(getServerPath() + resourcePath + "?access_token=" + token, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(statusHelper)
      .then((response) => response.json());
  },
};

export default RestApiGet;
