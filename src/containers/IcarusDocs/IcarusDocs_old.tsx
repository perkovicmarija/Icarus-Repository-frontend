import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import IcarusDocumentationTable, {
  columnData,
} from "./IcarusDocumentationTable";
import DialogFormFrame from "../../components/core/Dialog/DialogFormFrame";
import DialogProgress from "../../components/core/Dialog/DialogProgress";
import DialogNoCloseFrame from "../../components/core/Dialog/DialogNoCloseFrame";
import DialogAddEditFolder from "./dialogs/DialogAddEditFolder";
import DialogFormFileHistory from "./dialogs/DialogFormFileHistory";
import * as icarusDocumentationFileActions from "../../redux/support/icarusDocs/file/icarusDocumentationFileActions";
import * as icarusDocumentationFolderActions from "../../redux/support/icarusDocs/folder/icarusDocumentationFolderActions";
import { icarusDocs } from "../../consts/routePaths";
import DocumentationFolderPath from "./DocumentationFolderPath";
import { DocumentationTableToolbar2 } from "./DocumentationTableToolbar2";
import { Route, Switch, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useSimpleGetAll } from "../../redux/utils";
import { Client, clientsActions } from "../../redux/setting/clientsSlice";
import DialogAddEditFile from "./dialogs/DialogAddEditFile";
import IcarusDocumentationFileApi from "../../api/IcarusDocumentationFileApi";
import DialogFileView from "./dialogs/DialogFileView";

const constructCurrentPath = (icarusDocumentationFolderPath: any[]) => {
  if (icarusDocumentationFolderPath.length === 0) {
    return "/";
  } else {
    const currentFolderData =
      icarusDocumentationFolderPath[icarusDocumentationFolderPath.length - 1];
    return currentFolderData.path + currentFolderData.folderName;
  }
};

function IcarusDocs() {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const icarusDocumentationFiles = useAppSelector(
    (state) => state.IcarusDocumentationFile.icarusDocumentationFiles
  );
  const icarusDocumentationFolders = useAppSelector(
    (state) => state.IcarusDocumentationFolder.icarusDocumentationFolders
  );
  const icarusDocumentationFolderPath = useAppSelector(
    (state) => state.IcarusDocumentationFolder.icarusDocumentationFolderPath
  );

  const [dialogAddEditFolder, setDialogAddEditFolder] = useState<any>();
  const [dialogAddEditFile, setDialogAddEditFile] = useState<any>();
  const [dialogHistory, setDialogHistory] = useState<any>();

  const clients: Client[] = useSimpleGetAll(clientsActions.getAll);

  useEffect(() => {
    updateFilesAndFoldersOPath(icarusDocumentationFolderPath);
  }, [icarusDocumentationFolderPath.length]);

  const updateFilesAndFoldersOPath = (icarusDocumentationFolderPath) => {
    let viewModel = {
      icarusDocumentationFolderId: undefined,
      path: "/",
    };
    if (icarusDocumentationFolderPath.length > 0) {
      let currentFolder = icarusDocumentationFolderPath.slice(-1)[0];
      viewModel = {
        icarusDocumentationFolderId: currentFolder.icarusDocumentationFolderId,
        path: currentFolder.path + currentFolder.folderName + "/",
      };
    }
    dispatch(icarusDocumentationFolderActions.loadOnPath(viewModel));
    dispatch(icarusDocumentationFileActions.loadInFolder(viewModel));
  };

  const onDownloadFile = (icarusDocumentationFile: any) => {
    let viewModel = {
      icarusDocumentationFileId:
        icarusDocumentationFile.icarusDocumentationFileId,
      viewFile: false,
      uncontrolledCopy: icarusDocumentationFile.uncontrolledCopy,
    };
    dispatch(icarusDocumentationFileActions.download(viewModel));
  };

  const handleDocumentationFolderPathClick = (
    icarusDocumentationFolder: any
  ) => {
    dispatch(
      icarusDocumentationFolderActions.goBackToFolder(icarusDocumentationFolder)
    );
  };

  const handleDocumentationFolderRootClick = () => {
    dispatch(icarusDocumentationFolderActions.goBackToRootFolder());
  };

  const handleSearchSubmit = ({ searchText }: { searchText: string }) => {
    if (!!searchText.trim()) {
      let path;
      let icarusDocumentationFolderId;
      if (icarusDocumentationFolderPath.length > 0) {
        let currentFolder = icarusDocumentationFolderPath.slice(-1)[0];
        path = currentFolder.path + currentFolder.folderName;
        icarusDocumentationFolderId = currentFolder.icarusDocumentationFolderId;
      }
      let viewModel = {
        searchText,
        path,
        icarusDocumentationFolderId,
      };
      dispatch(icarusDocumentationFileActions.loadBySearch(viewModel));
      dispatch(icarusDocumentationFolderActions.clearFolder());
    } else {
      updateFilesAndFoldersOPath(icarusDocumentationFolderPath);
    }
  };

  const onFilterSubmit = (newFilters: any) => {
    if (newFilters.selectedClients.length > 0) {
      let path;
      let icarusDocumentationFolderId;
      if (icarusDocumentationFolderPath.length > 0) {
        let currentFolder = icarusDocumentationFolderPath.slice(-1)[0];
        path = currentFolder.path + currentFolder.folderName;
        icarusDocumentationFolderId = currentFolder.icarusDocumentationFolderId;
      }
      let viewModel = {
        path,
        icarusDocumentationFolderId,
        selectedClients: newFilters.selectedClients,
      };
      dispatch(icarusDocumentationFileActions.loadByFilter(viewModel));
      dispatch(icarusDocumentationFolderActions.clearFolder());
    } else {
      updateFilesAndFoldersOPath(icarusDocumentationFolderPath);
    }
  };

  const progress = useAppSelector((state) => state.Progress.progress);
  const progressBarOpened = useAppSelector(
    (state) => state.Progress.progressOpened
  );

  return (
    <Paper>
      <DocumentationTableToolbar2
        onNewFileClick={setDialogAddEditFile}
        onNewFolderClick={setDialogAddEditFolder}
        clients={clients}
        onSearchSubmit={handleSearchSubmit}
        onFilterSubmit={onFilterSubmit}
      />

      <DocumentationFolderPath
        documentationFolderPath={icarusDocumentationFolderPath}
        onDocumentationFolderPathClick={handleDocumentationFolderPathClick}
        onDocumentationFolderRootClick={handleDocumentationFolderRootClick}
      />

      <IcarusDocumentationTable
        headerProps={{
          columnData,
        }}
        files={icarusDocumentationFiles}
        folders={icarusDocumentationFolders}
        icarusDocumentationFolderPath={icarusDocumentationFolderPath}
        // BACK NAVIGATION
        onBackNavigation={() =>
          dispatch(icarusDocumentationFolderActions.exitFolder())
        }
        // FOLDER ACTIONS
        onEnterFolder={(icarusDocumentationFolder: any) =>
          dispatch(
            icarusDocumentationFolderActions.enterFolder(
              icarusDocumentationFolder
            )
          )
        }
        onDeleteFolder={(folder: any) => {
          dispatch(
            icarusDocumentationFolderActions.deleteAction({
              id: folder.icarusDocumentationFolderId,
            })
          );
          return Promise.resolve();
        }}
        onEditFolder={setDialogAddEditFolder}
        onMove={(payload) => {
          if ("icarusDocumentationFileId" in payload) {
            let viewModel = {
              icarusDocumentationFile: payload.source,
              icarusDocumentationFolder: payload.destination,
            };
            dispatch(icarusDocumentationFileActions.move(viewModel));
          } else {
            let viewModel = {
              icarusDocumentationFolder: payload.source,
              icarusDocumentationFolderDest: payload.destination,
            };
            dispatch(icarusDocumentationFolderActions.move(viewModel));
          }
        }}
        // FILE ACTIONS
        onDownloadFile={onDownloadFile}
        onViewFile={(icarusDocumentationFile: any) =>
          history.push(
            icarusDocs + `/${icarusDocumentationFile.icarusDocumentationFileId}`
          )
        }
        onEditFile={setDialogAddEditFile}
        onDeleteFile={(file: any) => {
          dispatch(
            icarusDocumentationFileActions.deleteAction({
              id: file.icarusDocumentationFileId,
            })
          );
          return Promise.resolve();
        }}
        onHistoryFile={(file) => setDialogHistory(file)}
      />

      <DialogFormFrame
        onClose={() => setDialogAddEditFile(undefined)}
        title="documentation.file.details"
        open={dialogAddEditFile}
        maxWidth="sm"
      >
        <DialogAddEditFile
          initialData={dialogAddEditFile}
          onClose={() => setDialogAddEditFile(undefined)}
          onSubmit={(payload: any) => {
            console.log(payload);
            const { files, ...data } = payload;
            const networkModel = {
              file: files[0],
              path: constructCurrentPath(icarusDocumentationFolderPath),
              data: JSON.stringify(data),
            };
            if ("icarusDocumentationFileId" in dialogAddEditFile) {
              return IcarusDocumentationFileApi.edit(networkModel);
            } else {
              return IcarusDocumentationFileApi.uploadFile(networkModel);
            }
          }}
          clients={clients}
        />
      </DialogFormFrame>

      <DialogFormFrame
        onClose={() => setDialogAddEditFolder(undefined)}
        title="documentation.folder.details"
        open={dialogAddEditFolder}
      >
        <DialogAddEditFolder
          initialData={dialogAddEditFolder}
          onClose={() => setDialogAddEditFolder(undefined)}
          onSubmit={(payload) => {
            if (payload.icarusDocumentationFolderId) {
              dispatch(icarusDocumentationFolderActions.update(payload));
            } else {
              let path = "/";
              if (icarusDocumentationFolderPath.length > 0) {
                let currentFolder = icarusDocumentationFolderPath.slice(-1)[0];
                path = currentFolder.path + currentFolder.folderName + "/";
              }
              dispatch(
                icarusDocumentationFolderActions.create({
                  ...payload,
                  path,
                })
              );
            }
          }}
          clients={clients}
        />
      </DialogFormFrame>

      <DialogFormFrame
        onClose={() => setDialogHistory(undefined)}
        title="documentation.file.history"
        open={dialogHistory}
      >
        <DialogFormFileHistory
          file={dialogHistory}
          onClose={() => setDialogHistory(undefined)}
          onExportClick={(item: any) => {
            dispatch(
              icarusDocumentationFileActions.exportToExcel({
                icarusDocumentationFileId: item.icarusDocumentationFileId,
              })
            );
          }}
        />
      </DialogFormFrame>

      <DialogNoCloseFrame title="general.downloading" open={progressBarOpened}>
        <DialogProgress progress={progress} />
      </DialogNoCloseFrame>

      <Switch>
        <Route path={icarusDocs + "/:id"} component={DialogFileView} />
      </Switch>
    </Paper>
  );
}

export default IcarusDocs;
