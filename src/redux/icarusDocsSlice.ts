import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk2 } from "./utils";
import IcarusDocumentationFolderApi from "../api/IcarusDocumentationFolderApi";
import IcarusDocumentationFileApi from "../api/IcarusDocumentationFileApi";

export const initFilters = {
  companies: [],
};

const initialState = {
  files: undefined as any[] | undefined,
  folders: undefined as any[] | undefined,
  currentPath: "/" as string,
  storageInfo: undefined as
    | {
        documentSizeReadable: string;
        attachmentSizeReadable: string;
        totalStorageTakenReadable: string;
        totalStorageTakenPercentage: string;
      }
    | undefined,
  filters: { ...initFilters, searchText: "" },
};

export type FiltersType = (typeof initialState)["filters"];

const getFoldersData = createAsyncThunk2(
  "icarusDocs/getFoldersData",
  async (meta: { path: string }) => {
    return await IcarusDocumentationFolderApi.getOnPath(meta);
  }
);

const getFilesData = createAsyncThunk2(
  "icarusDocs/getFilesData",
  async (meta: { path: string }) => {
    return await IcarusDocumentationFileApi.getAllInFolder(meta);
  }
);

const deleteItem = createAsyncThunk2(
  "icarusDocs/deleteItem",
  async (file: any) => {
    return await IcarusDocumentationFileApi.delete({
      id: file.icarusDocumentationFileId,
    });
  }
);

const createFolder = createAsyncThunk2(
  "icarusDocs/createFolder",
  async (payload: any) => {
    return await IcarusDocumentationFolderApi.create(payload);
  }
);

const updateFolder = createAsyncThunk2(
  "icarusDocs/updateFolder",
  async (payload: any) => {
    //TODO
    return await IcarusDocumentationFolderApi.create(payload);
  }
);

/* const addEditItem = createAsyncThunk2(
  "icarusDocs/addEditItem",
  async ({ payload, meta }: { payload: User; meta: any }, thunkAPI) => {
    return await (payload.userId ? IcarusDo.update : IcarusDo.create)(payload);
  }
); */

const icarusDocsSlice = createSlice({
  name: "icarusDocs",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
    },
    enterFolder(state, action) {
      state.currentPath = action.payload.path + action.payload.folderName;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilesData.fulfilled, (state, action) => {
        console.log(action);
        state.files = action.payload.data;
      })
      .addCase(getFoldersData.fulfilled, (state, action) => {
        console.log(action);
        state.folders = action.payload.data;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        const deletedObject = action.meta.arg;
        console.log(deletedObject);
        if (deletedObject.icarusDocumentationFileId) {
          state.files = state.files?.filter(
            (item) =>
              item.icarusDocumentationFileId !==
              deletedObject.icarusDocumentationFileId
          );
        } else {
          state.folders = state.folders?.filter(
            (item) =>
              item.icarusDocumentationFolderId !==
              deletedObject.icarusDocumentationFolderId
          );
        }
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        console.log(action);
        state.folders = action.payload.data;
      });
  },
});

export const icarusDocsActions = {
  ...icarusDocsSlice.actions,
  getFilesData,
  getFoldersData,
  // addEditItem,
  deleteItem,
  createFolder,
  updateFolder,
};
export default icarusDocsSlice;
