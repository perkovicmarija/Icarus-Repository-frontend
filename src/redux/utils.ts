import {
  //AsyncThunkAction,
  AsyncThunkPayloadCreator,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./store";
import { toast } from "react-toastify";

export const createAsyncThunk2 = (
  url: string,
  method: AsyncThunkPayloadCreator<unknown, any>
) => {
  const enhancedMethod = async (viewModel: any, thunkAPI: any) => {
    let response;
    try {
      response = (await method(viewModel, thunkAPI)) as any;
      if (
        String(response.status) !== "200" &&
        String(response.code) !== "200"
      ) {
        throw {
          status: response.status ?? response.code,
          message: response.message ?? response.error,
        };
      }
      return response as any;
    } catch (e: any) {
      console.log("rafa", e);

      /* toast(`Error: ${data.message}`, {
        autoClose: false,
        type: "error",
      }); */

      toast(
        `Error:\n${
          typeof e === "object" ? JSON.stringify(e, undefined, 2) : e
        }`,
        {
          autoClose: false,
          type: "error",
        }
      );

      if (e.status === 401) {
        thunkAPI.dispatch({ type: "LOGOUT" });
      }
      throw e;
    }
  };

  return createAsyncThunk(url, enhancedMethod);
};

export const useSimpleGetAll = (
  method: any /* AsyncThunkAction<any, any, any> */
) => {
  const dispatch = useAppDispatch();
  const [responseData, setResponseData] = useState<any[]>([]);
  useEffect(() => {
    dispatch(method()).then((response: { error?: any; payload: any }) => {
      if (response.error) {
        return;
      }
      setResponseData(response.payload.data);
    });
  }, []);

  return responseData;
};
