import { getServerPath } from "../../consts/ServerInfo";
import axios, { Canceler } from "axios";
import { getToken } from "../../helpers/utility";

export const RestApiArrayBuffer2 = {
  postData(resourcePath: string, data: any, onProgress: any) {
    const token = getToken();
    const CancelToken = axios.CancelToken;
    let cancel: Canceler;

    const axiosPromise = axios({
      url: getServerPath() + resourcePath + "?access_token=" + token,
      method: "POST",
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "arraybuffer",
      //responseType: 'blob', // important
      onDownloadProgress: (progressEvent) => {
        let progress = Math.floor(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(progress);
      },
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      }),
    }).then((response) => {
      return response;
    });

    // The returned method can be called to cancel the request
    return {
      axiosPromise,
      cancel: () => {
        cancel();
      },
    };
  },
};
