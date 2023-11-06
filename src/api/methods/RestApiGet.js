import { getServerPath } from "../../consts/ServerInfo";
import * as ApiStatus from "./RestApiStatus";
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
      .then(ApiStatus.statusHelper)
      .then((response) => response.json())
      .catch((error) => {
        let status = error.status;
        if (status) {
          return error.json().then((response) => {
            return { status, message: response.error };
          });
        } else {
          return { status: 500, message: "Server error" };
        }
      })
      .then((data) => {
        toastMessage && toast.dismiss(toastInProgress);
        if (data.status && data.status !== 200) {
          toast(`Error: ${data.message}`);
          throw new Error(data.message);
        }
        toastMessage && toast("Data fetched");
        console.log(data); // The data does log!
        return data;
      });
  },
};

export default RestApiGet;
