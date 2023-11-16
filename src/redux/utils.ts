import { AsyncThunkPayloadCreator, createAsyncThunk } from "@reduxjs/toolkit";

export const createAsyncThunk2 = (
  url: string,
  method: AsyncThunkPayloadCreator<unknown, any>
) => {
  const enhancedMethod = async (viewModel: any, thunkAPI: any) => {
    let response;
    try {
      response = await method(viewModel, thunkAPI);
      return response as any;
    } catch (e) {
      if (e === "Unauthorized") {
        thunkAPI.dispatch({ type: "LOGOUT" });
      }
      throw e;
    }
  };

  return createAsyncThunk(url, enhancedMethod);
};
