import { toast } from "react-toastify";

export function clearToken() {
  localStorage.removeItem("token");
}

export function getToken() {
  try {
    return localStorage.getItem("token");
  } catch (err) {
    clearToken();
    return null;
  }
}

export const handleNotify = (result) => {
  try {
    if (result?.code === "500") {
      toast.error(result?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (result?.code === "200") {
      toast.success(result?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error(result?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  } catch (error) {
    toast.error("An unexpected error occurred.", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
};

export const handleNotify2 = async (responsePromise) => {
  try {
    const response = await responsePromise;
    toast.success(result?.message, {
      position: toast.POSITION.TOP_CENTER,
    });
    return response;
  } catch (err) {
    console.log(err);
    toast.error("An unexpected error occurred.", {
      position: toast.POSITION.TOP_CENTER,
    });
    throw err;
  }
};
