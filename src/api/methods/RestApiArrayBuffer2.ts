import { getServerPath } from "../../consts/ServerInfo";
import axios from "axios";
import { getToken } from "../../helpers/utility";
import { downloadFile } from "./utils";

export const RestApiArrayBuffer2 = {
  get(
    resourcePath: string,
    data: any,
    onProgress: (value: number | undefined) => void,
    abortController?: AbortController
  ) {
    const token = getToken();

    onProgress(0);

    return axios({
      url: getServerPath() + resourcePath + "?access_token=" + token,
      method: "POST",
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "arraybuffer",
      //responseType: 'blob', // important
      onDownloadProgress: (progressEvent) => {
        let progress = progressEvent.total
          ? Math.floor((progressEvent.loaded * 100) / progressEvent.total)
          : 0;
        onProgress(progress);
      },
      signal: abortController?.signal,
    })
      .then((response) => {
        console.log(response);
        onProgress(undefined);
        return response;
      })
      .catch((e) => {
        console.log("error", e);
        onProgress(undefined);
        throw e;
      });
  },
  download(
    resourcePath: string,
    data: any,
    onProgress: (value: number | undefined) => void,
    abortController: AbortController
  ) {
    const getPromise = this.get(
      resourcePath,
      data,
      onProgress,
      abortController
    );
    getPromise.then(downloadFile);
    return getPromise;
  },
};
