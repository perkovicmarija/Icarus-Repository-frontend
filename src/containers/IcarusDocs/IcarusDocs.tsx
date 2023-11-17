import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import DocumentationEnhancedTableToolbar from "../../components/support/icarusDocs/DocumentationEnhancedTableToolbar";
import IcarusDocumentationTable from "../../components/support/icarusDocs/IcarusDocumentationTable";
import DialogDeleteWarning from "../../components/core/Dialog/DialogDeleteWarning";
import DialogFormFrame from "../../components/core/Dialog/DialogFormFrame";
import { cloneDeep } from "lodash";
import * as Protected from "../../protectedAuth";
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
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const [dialogFileDeleteWarningOpen, setDialogFileDeleteWarningOpen] =
    useState(false);
  const [dialogFolderDeleteWarningOpen, setDialogFolderDeleteWarningOpen] =
    useState(false);
  const [icarusDocumentationFolder, setIcarusDocumentationFolder] = useState({
    folderName: undefined,
    icarusDocumentationFolderUserRoleJoined: [],
  });
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
  const [
    icarusDocumentationFileHistorySelected,
    setIcarusDocumentationFileHistorySelected,
  ] = useState(false);
  const [icarusDocumentationFilters, setIcarusDocumentationFilters] =
    useState(initFilters);

  const [
    icarusDocumentationFileIdForDelete,
    setIcarusDocumentationFileIdForDelete,
  ] = useState(undefined);
  const [
    icarusDocumentationFolderIdForDelete,
    setIcarusDocumentationFolderIdForDelete,
  ] = useState(undefined);
  const [dialogAddEditFolder, setDialogAddEditFolder] = useState();
  const [dialogHistoryOpen, setDialogHistoryOpen] = useState(false);
  const [dialogMoveFileOpen, setDialogMoveFileOpen] = useState(false);
  const [dialogMoveFolderOpen, setDialogMoveFolderOpen] = useState(false);

  const [selectedClients, setSelectedClients] = useState([]);

  let clickTimer = null;

  useEffect(() => {
    updateFilesAndFoldersOPath(props.icarusDocumentationFolderPath);
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
    setSelectedClients([]);
  };

  const handleNewFileClick = () => {
    props.history.push(icarusDocsDetailsNew);
  };

  const handleHistoryClose = (event) => {
    setDialogHistoryOpen(false);
    setIcarusDocumentationFileHistorySelected(undefined);
  };

  const handleMoveFileClose = (event) => {
    setDialogMoveFileOpen(false);
  };

  const handleMoveFolderClose = (event) => {
    setDialogMoveFolderOpen(false);
  };

  const handleMoveFileSubmit = (event) => {
    setDialogMoveFileOpen(false);
    let viewModel = {
      icarusDocumentationFile: icarusDocumentationFileForMove,
      icarusDocumentationFolder: icarusDocumentationFolderDestinationMove,
    };
    props.icarusDocumentationFileActions.move(viewModel);
  };

  const handleMoveFolderSubmit = (event) => {
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

  const handleDeleteFileClose = (event) => {
    setDialogFileDeleteWarningOpen(false);
  };

  const handleDeleteFolderClose = (event) => {
    setDialogFolderDeleteWarningOpen(false);
  };

  const handleDeleteFile = (event, icarusDocumentationFile) => {
    setDialogFileDeleteWarningOpen(true);
    setIcarusDocumentationFileIdForDelete(
      icarusDocumentationFile.icarusDocumentationFileId
    );
  };

  const handleDeleteFolder = (event, icarusDocumentationFolder) => {
    setDialogFolderDeleteWarningOpen(true);
    setIcarusDocumentationFolderIdForDelete(
      icarusDocumentationFolder.icarusDocumentationFolderId
    );
  };

  const handleDeleteFileConfirmed = () => {
    let viewModel = {
      id: icarusDocumentationFileIdForDelete,
    };
    props.icarusDocumentationFileActions.deleteAction(viewModel);
    setDialogFileDeleteWarningOpen(false);
  };

  const handleDeleteFolderConfirmed = () => {
    let viewModel = {
      id: icarusDocumentationFolderIdForDelete,
    };
    props.icarusDocumentationFolderActions.deleteAction(viewModel);
    setDialogFolderDeleteWarningOpen(false);
  };

  const handleFolderSubmit = (payload) => {
    let icarusDocumentationFolderClone = cloneDeep(icarusDocumentationFolder);

    let viewModel = {
      folder: icarusDocumentationFolderClone,
      selectedClients,
    };

    if (icarusDocumentationFolderClone.icarusDocumentationFolderId) {
      props.icarusDocumentationFolderActions.update(viewModel);
    } else {
      icarusDocumentationFolderClone.path = "/";
      if (props.icarusDocumentationFolderPath.length > 0) {
        let currentFolder = props.icarusDocumentationFolderPath.slice(-1)[0];
        icarusDocumentationFolderClone.path =
          currentFolder.path + currentFolder.folderName + "/";
      }
      props.icarusDocumentationFolderActions.create(viewModel);
    }
  };

  const handleFolderDoubleClick = (event, icarusDocumentationFolder) => {
    event.preventDefault();
    props.icarusDocumentationFolderActions.enterFolder(
      icarusDocumentationFolder
    );
  };

  const handleFolderDoubleTap = (event, icarusDocumentationFolder) => {
    if (clickTimer === null) {
      clickTimer = setTimeout(function () {
        clickTimer = null;
      }, 300);
    } else {
      event.preventDefault();
      clearTimeout(clickTimer);
      clickTimer = null;
      props.icarusDocumentationFolderActions.enterFolder(
        icarusDocumentationFolder
      );
    }
  };

  const handleBackDoubleClick = (event) => {
    event.preventDefault();
    props.icarusDocumentationFolderActions.exitFolder();
  };

  const handleBackDoubleTap = (event) => {
    if (clickTimer === null) {
      clickTimer = setTimeout(function () {
        clickTimer = null;
      }, 300);
    } else {
      event.preventDefault();
      clearTimeout(clickTimer);
      clickTimer = null;
      props.icarusDocumentationFolderActions.exitFolder();
    }
  };

  const handleDownloadFile = (event, icarusDocumentationFile) => {
    let viewModel = {
      icarusDocumentationFileId:
        icarusDocumentationFile.icarusDocumentationFileId,
      viewFile: false,
      uncontrolledCopy: icarusDocumentationFile.uncontrolledCopy,
    };

    props.icarusDocumentationFileActions.download(viewModel);
  };

  const handleViewFile = (event, icarusDocumentationFile) => {
    props.history.push(
      icarusDocsViewFile + icarusDocumentationFile.icarusDocumentationFileId
    );
  };

  const handleEditFile = (event, icarusDocumentationFile) => {
    props.icarusDocumentationFileActions.passFile(icarusDocumentationFile);
    props.history.push(icarusDocsEditFile);
  };

  const handleHistoryFile = (event, icarusDocumentationFile) => {
    props.icarusDocumentationFileActions.loadHistory({
      icarusDocumentationFileDownloadId:
        icarusDocumentationFile.icarusDocumentationFileId,
    });
    setDialogHistoryOpen(true);
    setIcarusDocumentationFileHistorySelected(icarusDocumentationFile);
  };

  const handleMoveFile = (event, icarusDocumentationFile) => {
    props.icarusDocumentationFolderActions.loadTree();
    setIcarusDocumentationFileForMove(icarusDocumentationFile);
    setDialogMoveFileOpen(true);
    setIcarusDocumentationFolderDestinationMove(undefined);
  };

  const handleMoveFolder = (event, icarusDocumentationFolder) => {
    props.icarusDocumentationFolderActions.loadTree();
    setIcarusDocumentationFolderForMove(icarusDocumentationFolder);
    setDialogMoveFolderOpen(true);
    setIcarusDocumentationFolderDestinationMove(undefined);
  };

  const handleFolderMoveSelected = (event, icarusDocumentationFolder) => {
    setIcarusDocumentationFolderDestinationMove(icarusDocumentationFolder);
  };

  const handleDocumentationFolderPathClick = (icarusDocumentationFolder) => {
    props.icarusDocumentationFolderActions.goBackToFolder(
      icarusDocumentationFolder
    );
  };

  const handleDocumentationFolderRootClick = () => {
    props.icarusDocumentationFolderActions.goBackToRootFolder();
  };

  const handleCancelClick = () => {
    props.icarusDocumentationFileActions.cancelDownload();
  };

  const handleInputSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (!!searchValue.trim()) {
      let path;
      let icarusDocumentationFolderId;
      if (icarusDocumentationFolderPath.length > 0) {
        let currentFolder = icarusDocumentationFolderPath.slice(-1)[0];
        path = currentFolder.path + currentFolder.folderName;
        icarusDocumentationFolderId = currentFolder.icarusDocumentationFolderId;
      }
      let viewModel = {
        searchText: searchValue,
        path,
        icarusDocumentationFolderId,
      };
      props.icarusDocumentationFileActions.loadBySearch(viewModel);
      props.icarusDocumentationFolderActions.clearFolder();
    } else {
      updateFilesAndFoldersOPath(props.icarusDocumentationFolderPath);
    }
  };

  const handleExportClick = () => {
    let viewModel = {
      icarusDocumentationFileId:
        icarusDocumentationFileHistorySelected.icarusDocumentationFileId,
    };
    props.icarusDocumentationFileActions.exportToExcel(viewModel);
  };

  /* const handleFilterSubmit = () => {
    if (icarusDocumentationFilters.selectedClients.length > 0) {
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
        selectedClients: icarusDocumentationFilters.selectedClients,
      };
      props.icarusDocumentationFileActions.loadByFilter(viewModel);
      props.icarusDocumentationFolderActions.clearFolder();
    } else {
      updateFilesAndFoldersOPath(props.icarusDocumentationFolderPath);
    }
  }; */

  const {
    icarusDocumentationFiles,
    icarusDocumentationFolders,
    icarusDocumentationFolderPath,
    icarusDocumentationFileHistory,
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
      />

      <DocumentationEnhancedTableToolbar
        onNewFileClick={handleNewFileClick}
        searchValue={searchValue}
        onInputSearchChange={handleInputSearchChange}
        onSearchSubmit={handleSearchSubmit}
        searchPlaceholder="general.search.files.name"
        titleLabel="support.icarusDocs"
        showAddNew={Protected.protectedAuth(["PERM_SUPPORT_ADMIN"])}
        filtersActive={icarusDocumentationFilters.selectedClients.length > 0}
      />
      <DocumentationFolderPath
        documentationFolderPath={icarusDocumentationFolderPath}
        onDocumentationFolderPathClick={handleDocumentationFolderPathClick}
        onDocumentationFolderRootClick={handleDocumentationFolderRootClick}
      />

      <IcarusDocumentationTable
        order={order}
        orderBy={orderBy}
        onRequestSort={onRequestSort}
        files={icarusDocumentationFiles}
        folders={icarusDocumentationFolders}
        onDeleteFile={handleDeleteFile}
        onDeleteFolder={handleDeleteFolder}
        icarusDocumentationFolderPath={icarusDocumentationFolderPath}
        onFolderDoubleClick={handleFolderDoubleClick}
        onFolderDoubleTap={handleFolderDoubleTap}
        onBackDoubleClick={handleBackDoubleClick}
        onBackDoubleTap={handleBackDoubleTap}
        onEditFolder={setDialogAddEditFolder}
        onDownloadFile={handleDownloadFile}
        onViewFile={handleViewFile}
        onEditFile={handleEditFile}
        onHistoryFile={handleHistoryFile}
        onMoveFile={handleMoveFile}
        onMoveFolder={handleMoveFolder}
      />

      <DialogDeleteWarning
        open={dialogFileDeleteWarningOpen}
        text="documentation.file.delete"
        onDelete={handleDeleteFileConfirmed}
        onClose={handleDeleteFileClose}
      />

      <DialogDeleteWarning
        open={dialogFolderDeleteWarningOpen}
        text="documentation.folder.delete"
        onDelete={handleDeleteFolderConfirmed}
        onClose={handleDeleteFolderClose}
      />

      <DialogFormFrame
        onClose={() => setDialogAddEditFolder(undefined)}
        title="documentation.folder.details"
        open={dialogAddEditFolder}
      >
        <DialogFormNewFolder
          onClose={() => setDialogAddEditFolder(undefined)}
          onSubmit={handleFolderSubmit}
          initialData={dialogAddEditFolder}
          clients={clients}
        />
      </DialogFormFrame>

      <DialogFormFrame
        onClose={handleHistoryClose}
        title="documentation.file.history"
        open={dialogHistoryOpen}
      >
        <DialogFormFileHistory
          onClose={handleHistoryClose}
          icarusDocumentationFileHistory={icarusDocumentationFileHistory}
          onExportClick={handleExportClick}
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
            onCancelClick={handleCancelClick}
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
