import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk2 } from "../utils";
import IcarusDocumentationFolderApi from "../../api/IcarusDocumentationFolderApi";
import IcarusDocumentationFileApi from "../../api/IcarusDocumentationFileApi";
import { splitPathToPathAndName } from "../../api/methods/utils";

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
    const pathSplit = splitPathToPathAndName(meta.path);
    return await IcarusDocumentationFileApi.getAllInFolder({
      ...meta,
      ...pathSplit,
    });
  }
);

const downloadFile = createAsyncThunk2(
  "icarusDocs/downloadFile",
  async (payload) => {
    return await IcarusDocumentationFileApi.download2(payload, () => {});
  }
);

const deleteItem = createAsyncThunk2(
  "icarusDocs/deleteItem",
  async (item: any) => {
    if (item.icarusDocumentationFileId) {
      return await IcarusDocumentationFileApi.delete({
        id: item.icarusDocumentationFileId,
      });
    } else {
      return await IcarusDocumentationFolderApi.delete({
        id: item.icarusDocumentationFolderId,
      });
    }
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
    return await IcarusDocumentationFolderApi.update(payload);
  }
);

const move = createAsyncThunk2("icarusDocs/move", async (payload: any) => {
  console.log(payload);
  if ("icarusDocumentationFolderId" in payload.source) {
    return await IcarusDocumentationFolderApi.moveFolder({
      icarusDocumentationFolder: payload.source,
      icarusDocumentationFolderDest: payload.destination,
    });
  } else {
    return await IcarusDocumentationFileApi.moveFile({
      icarusDocumentationFile: payload.source,
      icarusDocumentationFolder: payload.destination,
    });
  }
});

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
    setPath(state, action) {
      state.currentPath = action.payload;
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
      })
      .addCase(updateFolder.fulfilled, (state, action) => {
        console.log(action);
        state.folders = action.payload.data;
      })
      .addCase(move.fulfilled, (state, action) => {
        const payload = action.meta.arg;
        if ("icarusDocumentationFolderId" in payload.source) {
          state.folders = action.payload.data;
        } else {
          state.files = action.payload.data;
        }
      });
  },
});

export const icarusDocsActions = {
  ...icarusDocsSlice.actions,
  getFilesData,
  getFoldersData,
  downloadFile,
  // addEditItem,
  deleteItem,
  createFolder,
  updateFolder,
  move,
};
export default icarusDocsSlice;
