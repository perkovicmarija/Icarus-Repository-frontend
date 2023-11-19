import { getServerPath } from "../../consts/ServerInfo";
import axios from "axios";
import { getToken } from "../../helpers/utility";
import { downloadFile } from "./utils";

export const RestApiArrayBuffer2 = {
  get(
    resourcePath: string,
    data: any,
    onProgress: (value: number) => void,
    abortController?: AbortController
  ) {
    const token = getToken();

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
    }).then((response) => {
      return response;
    });
  },
  download(
    resourcePath: string,
    data: any,
    onProgress: (value: number) => void,
    abortController: AbortController
  ) {
    this.get(resourcePath, data, onProgress, abortController).then(
      downloadFile
    );
  },
};
