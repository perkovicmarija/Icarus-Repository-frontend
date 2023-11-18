import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import DocumentationEnhancedTableToolbar from "../../components/support/icarusDocs/DocumentationEnhancedTableToolbar";
import IcarusDocumentationTable, {
  columnData,
} from "../../components/support/icarusDocs/IcarusDocumentationTable";
import DialogDeleteWarning from "../../components/core/Dialog/DialogDeleteWarning";
import DialogFormFrame from "../../components/core/Dialog/DialogFormFrame";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DialogProgress from "../../components/core/Dialog/DialogProgress";
import DialogNoCloseFrame from "../../components/core/Dialog/DialogNoCloseFrame";
import DialogFormNewFolder from "../../components/support/icarusDocs/DialogFormNewFolder";
import DialogFormFileMove from "../../components/support/icarusDocs/DialogFormFileMove";
import DialogFormFileHistory from "../../components/support/icarusDocs/DialogFormFileHistory";
import * as icarusDocumentationFileActions from "../../redux/support/icarusDocs/file/icarusDocumentationFileActions";
import * as icarusDocumentationFolderActions from "../../redux/support/icarusDocs/folder/icarusDocumentationFolderActions";
import * as userActions from "../../redux/user/userActions";
import {
  icarusDocsDetailsNew,
  icarusDocsEditFile,
  icarusDocsViewFile,
} from "../../consts/routePaths";
import * as clientActions from "../../redux/setting/client/clientActions";
import DocumentationFolderPath from "../../components/support/icarusDocs/DocumentationFolderPath";
import { DocumentationTableToolbar2 } from "./DocumentationTableToolbar2";

const initFilters = {
  selectedClients: [],
};

function IcarusDocs(props) {
  const [order, setOrder] = useState<"desc" | "asc" | undefined>("asc");
  const [orderBy, setOrderBy] = useState("name");

  const [icarusDocumentationFileForMove, setIcarusDocumentationFileForMove] =
    useState(undefined);
  const [
    icarusDocumentationFolderForMove,
    setIcarusDocumentationFolderForMove,
  ] = useState(undefined);
  const [
    icarusDocumentationFolderDestinationMove,
    setIcarusDocumentationFolderDestinationMove,
  ] = useState(undefined);

  const [dialogAddEditFolder, setDialogAddEditFolder] = useState();
  const [dialogHistory, setDialogHistory] = useState<any>();
  const [dialogMoveFileOpen, setDialogMoveFileOpen] = useState(false);
  const [dialogMoveFolderOpen, setDialogMoveFolderOpen] = useState(false);

  useEffect(() => {
    if (props.clients.length === 0) {
      props.clientActions.loadAllClients();
    }
  }, []);

  useEffect(() => {
    updateFilesAndFoldersOPath(props.icarusDocumentationFolderPath);
  }, [props.icarusDocumentationFolderPath.length]);

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
    props.icarusDocumentationFolderActions.loadOnPath(viewModel);
    props.icarusDocumentationFileActions.loadInFolder(viewModel);
  };

  const handleNewFileClick = () => {
    props.history.push(icarusDocsDetailsNew);
  };

  const handleMoveFileClose = () => {
    setDialogMoveFileOpen(false);
  };

  const handleMoveFolderClose = () => {
    setDialogMoveFolderOpen(false);
  };

  const handleMoveFileSubmit = () => {
    setDialogMoveFileOpen(false);
    let viewModel = {
      icarusDocumentationFile: icarusDocumentationFileForMove,
      icarusDocumentationFolder: icarusDocumentationFolderDestinationMove,
    };
    props.icarusDocumentationFileActions.move(viewModel);
  };

  const handleMoveFolderSubmit = () => {
    setDialogMoveFolderOpen(false);
    let viewModel = {
      icarusDocumentationFolder: icarusDocumentationFolderForMove,
      icarusDocumentationFolderDest: icarusDocumentationFolderDestinationMove,
    };
    props.icarusDocumentationFolderActions.move(viewModel);
  };

  const onRequestSort = (event, property) => {
    props.icarusDocumentationFileActions.reverseOrder(property);
    props.icarusDocumentationFolderActions.reverseOrder(property);
    if (order === "desc") {
      setOrder("asc");
    } else {
      setOrder("desc");
    }
  };

  const onDeleteFile = (file: any) => {
    props.icarusDocumentationFileActions.deleteAction({
      id: file.icarusDocumentationFileId,
    });
    return Promise.resolve();
  };

  const onDeleteFolder = (folder: any) => {
    props.icarusDocumentationFolderActions.deleteAction({
      id: folder.icarusDocumentationFolderId,
    });
    return Promise.resolve();
  };

  const handleFolderDoubleClick = (icarusDocumentationFolder: any) => {
    props.icarusDocumentationFolderActions.enterFolder(
      icarusDocumentationFolder
    );
  };

  const handleDownloadFile = (icarusDocumentationFile: any) => {
    let viewModel = {
      icarusDocumentationFileId:
        icarusDocumentationFile.icarusDocumentationFileId,
      viewFile: false,
      uncontrolledCopy: icarusDocumentationFile.uncontrolledCopy,
    };
    props.icarusDocumentationFileActions.download(viewModel);
  };

  const handleViewFile = (icarusDocumentationFile: any) => {
    props.history.push(
      icarusDocsViewFile + icarusDocumentationFile.icarusDocumentationFileId
    );
  };

  const handleEditFile = (icarusDocumentationFile: any) => {
    props.icarusDocumentationFileActions.passFile(icarusDocumentationFile);
    props.history.push(icarusDocsEditFile);
  };

  const handleMoveFile = (icarusDocumentationFile: any) => {
    props.icarusDocumentationFolderActions.loadTree();
    setIcarusDocumentationFileForMove(icarusDocumentationFile);
    setDialogMoveFileOpen(true);
    setIcarusDocumentationFolderDestinationMove(undefined);
  };

  const handleMoveFolder = (icarusDocumentationFolder: any) => {
    props.icarusDocumentationFolderActions.loadTree();
    setIcarusDocumentationFolderForMove(icarusDocumentationFolder);
    setDialogMoveFolderOpen(true);
    setIcarusDocumentationFolderDestinationMove(undefined);
  };

  const handleFolderMoveSelected = (icarusDocumentationFolder: any) => {
    setIcarusDocumentationFolderDestinationMove(icarusDocumentationFolder);
  };

  const handleDocumentationFolderPathClick = (
    icarusDocumentationFolder: any
  ) => {
    props.icarusDocumentationFolderActions.goBackToFolder(
      icarusDocumentationFolder
    );
  };

  const handleDocumentationFolderRootClick = () => {
    props.icarusDocumentationFolderActions.goBackToRootFolder();
  };

  const handleSearchSubmit = ({ searchText }: { searchText: string }) => {
    if (!!searchText.trim()) {
      let path;
      let icarusDocumentationFolderId;
      if (props.icarusDocumentationFolderPath.length > 0) {
        let currentFolder = props.icarusDocumentationFolderPath.slice(-1)[0];
        path = currentFolder.path + currentFolder.folderName;
        icarusDocumentationFolderId = currentFolder.icarusDocumentationFolderId;
      }
      let viewModel = {
        searchText,
        path,
        icarusDocumentationFolderId,
      };
      props.icarusDocumentationFileActions.loadBySearch(viewModel);
      props.icarusDocumentationFolderActions.clearFolder();
    } else {
      updateFilesAndFoldersOPath(props.icarusDocumentationFolderPath);
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
      props.icarusDocumentationFileActions.loadByFilter(viewModel);
      props.icarusDocumentationFolderActions.clearFolder();
    } else {
      updateFilesAndFoldersOPath(props.icarusDocumentationFolderPath);
    }
  };

  const {
    icarusDocumentationFiles,
    icarusDocumentationFolders,
    icarusDocumentationFolderPath,
    icarusDocumentationFolderTree,
    progress,
    progressBarOpened,
    clients,
  } = props;

  return (
    <Paper>
      <DocumentationTableToolbar2
        onNewFileClick={handleNewFileClick}
        onNewFolderClick={setDialogAddEditFolder}
        clients={clients}
        onSearchSubmit={handleSearchSubmit}
        onFilterSubmit={onFilterSubmit}
      />

      {/* <DocumentationEnhancedTableToolbar
        onNewFileClick={handleNewFileClick}
        searchValue={searchValue}
        onSearchSubmit={handleSearchSubmit}
        searchPlaceholder="general.search.files.name"
        titleLabel="support.icarusDocs"
        showAddNew={Protected.protectedAuth(["PERM_SUPPORT_ADMIN"])}
      /> */}

      <DocumentationFolderPath
        documentationFolderPath={icarusDocumentationFolderPath}
        onDocumentationFolderPathClick={handleDocumentationFolderPathClick}
        onDocumentationFolderRootClick={handleDocumentationFolderRootClick}
      />

      <IcarusDocumentationTable
        headerProps={{
          columnData,
          order,
          orderBy,
          onRequestSort,
        }}
        files={icarusDocumentationFiles}
        folders={icarusDocumentationFolders}
        icarusDocumentationFolderPath={icarusDocumentationFolderPath}
        //
        onFolderDoubleClick={handleFolderDoubleClick}
        onBackDoubleClick={() =>
          props.icarusDocumentationFolderActions.exitFolder()
        }
        //
        onDeleteFolder={onDeleteFolder}
        onEditFolder={setDialogAddEditFolder}
        onDownloadFile={handleDownloadFile}
        onViewFile={handleViewFile}
        onEditFile={handleEditFile}
        onDeleteFile={onDeleteFile}
        onHistoryFile={(file) => setDialogHistory(file)}
        onMoveFile={handleMoveFile}
        onMoveFolder={handleMoveFolder}
      />

      <DialogFormFrame
        onClose={() => setDialogAddEditFolder(undefined)}
        title="documentation.folder.details"
        open={dialogAddEditFolder}
      >
        <DialogFormNewFolder
          onClose={() => setDialogAddEditFolder(undefined)}
          onSubmit={(payload) => {
            if (payload.icarusDocumentationFolderId) {
              props.icarusDocumentationFolderActions.update(payload);
            } else {
              let path = "/";
              if (props.icarusDocumentationFolderPath.length > 0) {
                let currentFolder =
                  props.icarusDocumentationFolderPath.slice(-1)[0];
                path = currentFolder.path + currentFolder.folderName + "/";
              }
              props.icarusDocumentationFolderActions.create({
                ...payload,
                path,
              });
            }
          }}
          initialData={dialogAddEditFolder}
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
            props.icarusDocumentationFileActions.exportToExcel({
              icarusDocumentationFileId: item.icarusDocumentationFileId,
            });
          }}
        />
      </DialogFormFrame>

      <DialogFormFrame
        onClose={handleMoveFileClose}
        title="documentation.file.move"
        open={dialogMoveFileOpen}
      >
        <DialogFormFileMove
          onClose={handleMoveFileClose}
          onSubmit={handleMoveFileSubmit}
          icarusDocumentationFolderTree={icarusDocumentationFolderTree}
          icarusDocumentationFolderDestinationMove={
            icarusDocumentationFolderDestinationMove
          }
          onFolderSelected={handleFolderMoveSelected}
        />
      </DialogFormFrame>

      <DialogFormFrame
        onClose={handleMoveFolderClose}
        title="documentation.folder.move"
        open={dialogMoveFolderOpen}
      >
        <DialogFormFileMove
          onClose={handleMoveFolderClose}
          onSubmit={handleMoveFolderSubmit}
          icarusDocumentationFolderTree={icarusDocumentationFolderTree}
          icarusDocumentationFolderDestinationMove={
            icarusDocumentationFolderDestinationMove
          }
          onFolderSelected={handleFolderMoveSelected}
        />
      </DialogFormFrame>

      <DialogNoCloseFrame
        title="general.downloading"
        open={progressBarOpened}
        formComponent={
          <DialogProgress
            showCancel
            onCancelClick={() =>
              props.icarusDocumentationFileActions.cancelDownload()
            }
            progress={progress}
          />
        }
      />
    </Paper>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    icarusDocumentationFiles:
      state.IcarusDocumentationFile.icarusDocumentationFiles,
    icarusDocumentationFileHistory:
      state.IcarusDocumentationFile.icarusDocumentationFileHistory,
    icarusDocumentationFolders:
      state.IcarusDocumentationFolder.icarusDocumentationFolders,
    icarusDocumentationFolderPath:
      state.IcarusDocumentationFolder.icarusDocumentationFolderPath,
    icarusDocumentationFolderTree:
      state.IcarusDocumentationFolder.icarusDocumentationFolderTree,
    users: state.User.usersSimple,
    progress: state.Progress.progress,
    progressBarOpened: state.Progress.progressOpened,
    clients: state.Client.clients,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    icarusDocumentationFileActions: bindActionCreators(
      icarusDocumentationFileActions,
      dispatch
    ),
    icarusDocumentationFolderActions: bindActionCreators(
      icarusDocumentationFolderActions,
      dispatch
    ),
    userActions: bindActionCreators(userActions, dispatch),
    clientActions: bindActionCreators(clientActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IcarusDocs);
