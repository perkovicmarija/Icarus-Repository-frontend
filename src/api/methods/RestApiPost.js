import { getServerPath } from "../../consts/ServerInfo";
import { statusHelper } from "./utils";
import { getToken } from "../../helpers/utility";
import { toast } from "react-toastify";

const RestApiPost = {
  postData(resourcePath, data, toastMessage) {
    const token = getToken();
    const toastInProgress =
      toastMessage &&
      toast(toastMessage === "fetching" ? "Fetching data" : "Submitting data", {
        delay: 100,
        autoClose: false,
        type: "info",
      });
    return fetch(getServerPath() + resourcePath + "?access_token=" + token, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(statusHelper)
      .then((response) => response.json());

    /* then((data) => {
        if (data.status && data.status !== 200) {
          toastInProgress
            ? toast.update(toastInProgress, {
                render: () => `Error: ${data.message}`,
                autoClose: false,
                type: "error",
              })
            : toast(`Error: ${data.message}`, {
                autoClose: false,
                type: "error",
              });
          throw new Error(data.message);
        }
        toastMessage &&
          toast.update(toastInProgress, {
            render: () =>
              toastMessage === "fetching" ? "Data fetched" : "Data submitted",
            autoClose: 2000,
            type: "success",
          });
        console.log(data); // The data does log!
        return data;
      }); 
      */
  },
};

export default RestApiPost;
