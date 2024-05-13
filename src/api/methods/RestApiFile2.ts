import { getServerPath } from "../../consts/ServerInfo";
import axios from "axios";
import { getToken } from "../../helpers/utility";
import { downloadFile } from "./utils";

export const RestApiFile2 = {
  get(
    resourcePath: string,
    data: any,
    onProgress: (value: number | undefined) => void,
    abortController?: AbortController,
    signal?: AbortSignal
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
      signal: abortController?.signal ?? signal,
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
  upload(
    resourcePath: string,
    data: any,
    onProgress: (value: number | undefined) => void,
    abortController: AbortController
  ) {
    const token = getToken();

    const formData = new FormData();
    for (let name in data) {
      formData.append(name, data[name]);
    }

    return axios({
      url: getServerPath() + resourcePath + "?access_token=" + token,
      method: "POST",
      data: formData,
      onUploadProgress: (progressEvent) => {
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
  upload2(
    resourcePath: string,
    data: FormData,
    onProgress: (value: number | undefined) => void,
    signal: AbortSignal,
    method: "POST" | "PUT"
  ) {
    const token = getToken();

    return axios({
      url: getServerPath() + resourcePath + "?access_token=" + token,
      method,
      data,
      onUploadProgress: (progressEvent) => {
        let progress = progressEvent.total
          ? Math.floor((progressEvent.loaded * 100) / progressEvent.total)
          : 0;
        onProgress(progress);
      },
      signal,
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
  download2(
    resourcePath: string,
    data: any,
    onProgress: (value: number | undefined) => void,
    abortSignal: AbortSignal
  ) {
    const getPromise = this.get(
      resourcePath,
      data,
      onProgress,
      undefined,
      abortSignal
    );
    getPromise.then(downloadFile);
    return getPromise;
  },
};
