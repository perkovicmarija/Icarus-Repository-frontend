import { useLayoutEffect, useState } from "react";
import { Paper } from "@mui/material";
import IcarusDocumentationTable, {
  columnData,
} from "./IcarusDocumentationTable";
import DialogFormFrame from "../../components/core/Dialog/DialogFormFrame";
import DialogProgress from "../../components/core/Dialog/DialogProgress";
import DialogAddEditFolder from "./dialogs/DialogAddEditFolder";
import DialogFormFileHistory from "./dialogs/DialogFormFileHistory";
import * as icarusDocumentationFileActions from "../../redux/support/icarusDocs/file/icarusDocumentationFileActions";
import * as icarusDocumentationFolderActions from "../../redux/support/icarusDocs/folder/icarusDocumentationFolderActions";
import { icarusDocs } from "../../consts/routePaths";
import DocumentationFolderPath from "./DocumentationFolderPath";
import { DocumentationTableToolbar2 } from "./DocumentationTableToolbar2";
import { Route, Switch, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchArrayBufferFile, useSimpleGetAll } from "../../redux/utils";
import { Client, clientsActions } from "../../redux/setting/clientsSlice";
import DialogAddEditFile from "./dialogs/DialogAddEditFile";
import IcarusDocumentationFileApi from "../../api/IcarusDocumentationFileApi";
import DialogFileView from "./dialogs/DialogFileView";
import { FiltersType, icarusDocsActions } from "../../redux/icarusDocsSlice";
import { splitPathToPathAndName } from "../../api/methods/utils";

function IcarusDocs() {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [dialogAddEditFolder, setDialogAddEditFolder] = useState<any>();
  const [dialogAddEditFile, setDialogAddEditFile] = useState<any>();
  const [dialogHistory, setDialogHistory] = useState<any>();

  const icarusDocumentationFiles = useAppSelector(
    (state) => state.IcarusDocs.files
  );
  const icarusDocumentationFolders = useAppSelector(
    (state) => state.IcarusDocs.folders
  );
  const currentPath = useAppSelector((state) => state.IcarusDocs.currentPath);
  const filters = useAppSelector((state) => state.IcarusDocs.filters);

  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    setLoading(true);
    const loadPromise = Promise.all([
      dispatch(
        icarusDocsActions.getFilesData({
          path: currentPath,
        })
      ),
      dispatch(
        icarusDocsActions.getFoldersData({
          path: currentPath,
        })
      ),
    ]);
    loadPromise.finally(() => {
      setLoading(false);
    });
  }, [currentPath, filters]);

  //
  const clients: Client[] = useSimpleGetAll(clientsActions.getAll);
  //

  /* const updateFilesAndFoldersOPath = (icarusDocumentationFolderPath) => {
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
  }; */

  /* const handleSearchSubmit = ({ searchText }: { searchText: string }) => {
    if (!!searchText.trim()) {
      let icarusDocumentationFolderId;
      if (currentPath !== "/") {
        icarusDocumentationFolderId = currentFolder.icarusDocumentationFolderId;
      }
      let viewModel = {
        searchText,
        path: currentPath,
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
  }; */

  const handleSubmitFilters = (newFilters: Partial<FiltersType>) => {
    dispatch(icarusDocsActions.setFilters({ ...filters, ...newFilters }));
  };

  const [progress, setProgress] = useState<number | undefined>();
  const [abortController, setAbortController] = useState<
    AbortController | undefined
  >();

  const onNavigate = (path: string) =>
    dispatch(icarusDocsActions.setPath(path));

  return (
    <Paper>
      <DocumentationTableToolbar2
        onNewFileClick={setDialogAddEditFile}
        onNewFolderClick={setDialogAddEditFolder}
        clients={clients}
        onSearchSubmit={handleSubmitFilters}
        filters={filters}
        onFilterSubmit={handleSubmitFilters}
      />

      <DocumentationFolderPath
        currentPath={currentPath}
        onNavigate={onNavigate}
      />

      <IcarusDocumentationTable
        headerProps={{
          columnData,
        }}
        loading={loading}
        files={icarusDocumentationFiles}
        folders={icarusDocumentationFolders}
        currentPath={currentPath}
        onMove={(payload) => dispatch(icarusDocsActions.move(payload))}
        // FOLDER ACTIONS
        onNavigate={onNavigate}
        onDeleteFolder={(folder: any) =>
          dispatch(icarusDocsActions.deleteItem(folder))
        }
        onEditFolder={setDialogAddEditFolder}
        // FILE ACTIONS
        onDownloadFile={(icarusDocumentationFile: any) => {
          const abortController = new AbortController();
          setAbortController(abortController);
          dispatch(
            fetchArrayBufferFile(
              IcarusDocumentationFileApi.download2(
                {
                  icarusDocumentationFileId:
                    icarusDocumentationFile.icarusDocumentationFileId,
                  viewFile: false,
                  uncontrolledCopy: icarusDocumentationFile.uncontrolledCopy,
                },
                setProgress,
                abortController
              )
            )
          );
        }}
        onViewFile={(icarusDocumentationFile: any) =>
          history.push(
            icarusDocs + `/${icarusDocumentationFile.icarusDocumentationFileId}`
          )
        }
        onEditFile={setDialogAddEditFile}
        onDeleteFile={(item) => dispatch(icarusDocsActions.deleteItem(item))}
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
              path: currentPath,
              ...splitPathToPathAndName(currentPath),
              data: JSON.stringify({
                icarusDocumentationFile: { ...data, filename: files[0].path },
                selectedClients: data.clients,
              }),
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
              return dispatch(
                icarusDocsActions.updateFolder({
                  folder: { ...payload, path: currentPath },
                  selectedClients: payload.clients,
                })
              );
            } else {
              return dispatch(
                icarusDocsActions.createFolder({
                  folder: { ...payload, path: currentPath },
                  selectedClients: payload.clients,
                })
              );
            }
          }}
          clients={clients}
          folders={icarusDocumentationFolders!}
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

      <DialogProgress
        progress={progress}
        onClose={() => abortController!.abort()}
      />

      <Switch>
        <Route path={icarusDocs + "/:id"} component={DialogFileView} />
      </Switch>
    </Paper>
  );
}

export default IcarusDocs;
