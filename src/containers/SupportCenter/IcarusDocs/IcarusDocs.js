import React, {useEffect} from 'react';
import {makeStyles} from "@mui/styles";
import {useState} from "react";
import {Paper} from "@mui/material";
import DocumentationEnhancedTableToolbar
    from "../../../components/support/icarusDocs/DocumentationEnhancedTableToolbar";
import IcarusDocumentationTable from "../../../components/support/icarusDocs/IcarusDocumentationTable";
import DialogDeleteWarning from "../../../components/core/Dialog/DialogDeleteWarning";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
import {cloneDeep} from "lodash";
import * as Protected from "../../../protectedAuth";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import DialogProgress from "../../../components/core/Dialog/DialogProgress";
import DialogNoCloseFrame from "../../../components/core/Dialog/DialogNoCloseFrame";
import DialogFormNewFolder from "../../../components/support/icarusDocs/DialogFormNewFolder";
import DialogFormFileRevisions from '../../../components/support/icarusDocs/DialogFormFileRevisions';
import DialogFormFileMove from "../../../components/support/icarusDocs/DialogFormFileMove";
import DialogFormFileHistory from '../../../components/support/icarusDocs/DialogFormFileHistory';
import * as userRoleActions from '../../../redux/user/role/userRoleActions';
import * as icarusDocumentationFileActions from '../../../redux/support/icarusDocs/file/icarusDocumentationFileActions';
import * as icarusDocumentationFolderActions from '../../../redux/support/icarusDocs/folder/icarusDocumentationFolderActions';
import * as userActions from '../../../redux/user/userActions';
import {icarusDocsDetailsNew, icarusDocsViewFile} from "../../../consts/routePaths"

const useStyles = makeStyles(theme => ({
    rootDiv: {
        //height: '80vh',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    },
    root: {
        flexGrow: 1,
        margin: theme.spacing(3)
    },
}));

function IcarusDocs(props) {
    const classes = useStyles();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [searchValue, setSearchValue] = useState("");
    const [dialogFileDeleteWarningOpen, setDialogFileDeleteWarningOpen] = useState(false);
    const [dialogFolderDeleteWarningOpen, setDialogFolderDeleteWarningOpen] = useState(false);
    const [documentationFolder, setDocumentationFolder] = useState({
        folderName: undefined,
        documentationFolderUserRoleJoined: []
    })
    const [documentationFileForMove, setDocumentationFileForMove] = useState(undefined);
    const [documentationFolderForMove, setDocumentationFolderForMove] = useState(undefined);
    const [documentationFolderDestinationMove, setDocumentationFolderDestinationMove] = useState(undefined);

    const [documentationFileIdForDelete, setDocumentationFileIdForDelete] = useState(undefined);
    const [documentationFolderIdForDelete, setDocumentationFolderIdForDelete] = useState(undefined);
    const [dialogNewFolderOpen, setDialogNewFolderOpen] = useState(false);
    const [dialogRevisionsOpen, setDialogRevisionsOpen] = useState(false);
    const [dialogHistoryOpen, setDialogHistoryOpen] = useState(false);
    const [dialogMoveFileOpen, setDialogMoveFileOpen] = useState(false);
    const [dialogMoveFolderOpen, setDialogMoveFolderOpen] = useState(false);

    let clickTimer = null;

    useEffect(() => {
        updateFilesAndFoldersOPath(props.documentationFolderPath);

        props.userRoleActions.loadAll();
    }, [])

    useEffect(() => {
        updateFilesAndFoldersOPath(props.documentationFolderPath);
    }, [props.documentationFolderPath.length])

    const updateFilesAndFoldersOPath = (documentationFolderPath) => {
        let viewModel = {
            documentationFolderId: undefined,
            path: "/"
        };
        if (documentationFolderPath.length > 0) {
            let currentFolder = documentationFolderPath.slice(-1)[0];
            viewModel = {
                documentationFolderId: currentFolder.icarusDocumentationFolderId,
                path: currentFolder.path + currentFolder.folderName + "/"
            }
        }
        props.icarusDocumentationFolderActions.loadOnPath(viewModel);
        props.icarusDocumentationFileActions.loadInFolder(viewModel);
    }

    const handleNewFileClick = () => {
        props.history.push(icarusDocsDetailsNew);
    }

    const handleNewFolderClick = () => {
        setDocumentationFolder({
            folderName: undefined,
            documentationFolderUserRoleJoined: []
        })
        setDialogNewFolderOpen(true);
    }

    const handleFolderDetailsClose = (event) => {
        setDialogNewFolderOpen(false);
    }

    const handleRevisionsClose = (event) => {
        setDialogRevisionsOpen(false);
    }

    const handleHistoryClose = (event) => {
        setDialogHistoryOpen(false);
    }

    const handleMoveFileClose = (event) => {
        setDialogMoveFileOpen(false);
    }

    const handleMoveFolderClose = (event) => {
        setDialogMoveFolderOpen(false);
    }

    const handleMoveFileSubmit = (event) => {
        setDialogMoveFileOpen(false);
        let viewModel = {
            documentationFile: documentationFileForMove,
            documentationFolder: documentationFolderDestinationMove
        };
        props.icarusDocumentationFileActions.move(viewModel);
    }

    const handleMoveFolderSubmit = (event) => {
        setDialogMoveFolderOpen(false);
        let viewModel = {
            documentationFolder: documentationFolderForMove,
            documentationFolderDest: documentationFolderDestinationMove
        };
        props.icarusDocumentationFolderActions.move(viewModel);
    }

    const handleRequestSort = (event, property) => {
        props.icarusDocumentationFileActions.reverseOrder(property);
        props.icarusDocumentationFolderActions.reverseOrder(property);
        if (order === 'desc') {
            setOrder('asc');
        } else {
            setOrder('desc');
        }
    }

    const handleDeleteFileClose = (event) => {
        setDialogFileDeleteWarningOpen(false);
    }

    const handleDeleteFolderClose = (event) => {
        setDialogFolderDeleteWarningOpen(false);
    }

    const handleDeleteFile = (event, documentationFile) => {
        setDialogFileDeleteWarningOpen(true);
        setDocumentationFileIdForDelete(documentationFile.icarusDocumentationFileId);
    }

    const handleDeleteFolder = (event, documentationFolder) => {
        setDialogFolderDeleteWarningOpen(true);
        setDocumentationFolderIdForDelete(documentationFolder.icarusDocumentationFolderId)
    }

    const handleDeleteFileConfirmed = () => {
        let viewModel = {
            id: documentationFileIdForDelete
        }
        props.icarusDocumentationFileActions.deleteAction(viewModel);
        setDialogFileDeleteWarningOpen(false);
    }

    const handleDeleteFolderConfirmed = () => {
        let viewModel = {
            id: documentationFolderIdForDelete
        }
        props.icarusDocumentationFolderActions.deleteAction(viewModel);
        setDialogFolderDeleteWarningOpen(false);
    }

    const handlePermissionFolderSelectChange = (event) => {
        let selectedUserRoles = [];
        let lastSelected = event.target.value[event.target.value.length - 1];
        if (lastSelected === "SelectAll") {
            props.userRoles.forEach(userRole => {
                selectedUserRoles.push({
                    userRole
                });
            });
        } else if (lastSelected === "DeselectAll") {
            selectedUserRoles = [];
        } else {
            const selectedUserRoleIds = event.target.value;
            for (let i = 0, l = selectedUserRoleIds.length; i < l; i++) {
                const userRoleObject = props.userRoles.find(userRole => userRole.userRoleId === selectedUserRoleIds[i]);
                selectedUserRoles.push({
                    userRole: userRoleObject
                });
            }
        }
        let documentationFolderClone = cloneDeep(documentationFolder);
        documentationFolderClone.documentationFolderUserRoleJoined = selectedUserRoles;
        setDocumentationFolder(documentationFolderClone);
    }

    const handleInputFolderChange = name => event => {
        let documentationFolderClone = cloneDeep(documentationFolder);
        documentationFolderClone[name] = event.target.value;
        setDocumentationFolder(documentationFolderClone);
    };

    const handleFolderSubmit = () => {
        setDialogNewFolderOpen(false);

        let documentationFolderClone = cloneDeep(documentationFolder);

        if (documentationFolderClone.icarusDocumentationFolderId) {
            props.icarusDocumentationFolderActions.update(documentationFolderClone);
        } else {
            documentationFolderClone.path = "/";
            if (props.documentationFolderPath.length > 0) {
                let currentFolder = props.documentationFolderPath.slice(-1)[0];
                documentationFolderClone.path = currentFolder.path + currentFolder.folderName + "/"
            }
            props.icarusDocumentationFolderActions.create(documentationFolderClone);
        }
    }

    const handleEditFolder = (event, documentationFolder) => {
        setDocumentationFolder(documentationFolder);
        setDialogNewFolderOpen(true);
    }

    const handleFolderDoubleClick = (event, documentationFolder) => {
        event.preventDefault();
        props.icarusDocumentationFolderActions.enterFolder(documentationFolder);
    }

    const handleFolderDoubleTap = (event, documentationFolder) => {
        if (clickTimer === null) {
            clickTimer = setTimeout(function () {
                clickTimer = null;
            }, 300)
        } else {
            event.preventDefault();
            clearTimeout(clickTimer);
            clickTimer = null;
            props.icarusDocumentationFolderActions.enterFolder(documentationFolder);
        }
    }

    const handleBackDoubleClick = (event) => {
        event.preventDefault();
        props.icarusDocumentationFolderActions.exitFolder();
    }

    const handleBackDoubleTap = (event) => {
        if (clickTimer === null) {
            clickTimer = setTimeout(function () {
                clickTimer = null;
            }, 300)
        } else {
            event.preventDefault();
            clearTimeout(clickTimer);
            clickTimer = null;
            props.icarusDocumentationFolderActions.exitFolder();
        }
    }

    const handleDownloadFile = (event, documentationFile) => {
        let viewModel = {
            documentationFileId: documentationFile.icarusDocumentationFileId,
            viewFile: false
        }

        props.icarusDocumentationFileActions.download(viewModel)
    }

    const handleViewFile = (event, documentationFile) => {
        props.history.push(icarusDocsViewFile + documentationFile.icarusDocumentationFileId);
    }

    const handleReviseFile = (event, documentationFile) => {
        props.icarusDocumentationFileActions.passFile(documentationFile);
        props.history.push('/dashboard/icarusDocumentation/details/revision');
    }

    const handleEditFile = (event, documentationFile) => {
        props.icarusDocumentationFileActions.passFile(documentationFile);
        props.history.push('/dashboard/icarusDocumentation/details/edit');
    }

    const handleRevisionsFile = (event, documentationFile) => {
        props.icarusDocumentationFileActions.loadRevisions(documentationFile);
        setDialogRevisionsOpen(true);
    }

    const handleHistoryFile = (event, documentationFile) => {
        props.icarusDocumentationFileActions.loadHistory(documentationFile);
        setDialogHistoryOpen(true);
    }

    const handleMoveFile = (event, documentationFile) => {
        props.icarusDocumentationFolderActions.loadTree();
        setDocumentationFileForMove(documentationFile);
        setDialogMoveFileOpen(true);
        setDocumentationFolderDestinationMove(undefined);
    }

    const handleMoveFolder = (event, documentationFolder) => {
        props.icarusDocumentationFolderActions.loadTree();
        setDocumentationFolderForMove(documentationFolder);
        setDialogMoveFolderOpen(true);
        setDocumentationFolderDestinationMove(undefined);
    }

    const handleFolderMoveSelected = (event, documentationFolder) => {
        setDocumentationFolderDestinationMove(documentationFolder);
    }

    const handleDocumentationFolderPathClick = (documentationFolder) => {
        props.icarusDocumentationFolderActions.goBackToFolder(documentationFolder);
    }

    const handleDocumentationFolderRootClick = () => {
        props.icarusDocumentationFolderActions.goBackToRootFolder();
    }

    const checkUserRoleInArray = (userRoleId) => {
        for (let i = 0, l = documentationFolder.documentationFolderUserRoleJoined.length; i < l; i++) {
            if (documentationFolder.documentationFolderUserRoleJoined[i].userRole.userRoleId === userRoleId) {
                return true;
            }
        }
        return false;
    }

    const handleCancelClick = () => {
        props.icarusDocumentationFileActions.cancelDownload();
    }

    const handleInputSearchChange = (event) => {
        setSearchValue(event.target.value);
    }

    const handleSearchSubmit = () => {
        if (!!searchValue.trim()) {
            let path;
            let documentationFolderId;
            if (documentationFolderPath.length > 0) {
                let currentFolder = documentationFolderPath.slice(-1)[0];
                path = currentFolder.path + currentFolder.folderName
                documentationFolderId = currentFolder.icarusDocumentationFolderId;
            }
            let viewModel = {
                searchText: searchValue,
                path,
                documentationFolderId
            }
            props.icarusDocumentationFileActions.loadBySearch(viewModel);
            props.icarusDocumentationFolderActions.clearFolder();
        } else {
            updateFilesAndFoldersOPath(props.documentationFolderPath);
        }

    };

    const handlePermissionRolesFolderSelectChange = (event) => {
        let selectedUserRoles = [];
        let lastSelected = event.target.value[event.target.value.length - 1];
        if (lastSelected === "SelectAll") {
            props.userRoles.forEach(userRole => {
                selectedUserRoles.push({
                    userRole
                });
            });
        } else if (lastSelected === "DeselectAll") {
            selectedUserRoles = [];
        } else {
            const selectedUserRoleIds = event.target.value;
            for (let i = 0, l = selectedUserRoleIds.length; i < l; i++) {
                const userRoleObject = props.userRoles.find(userRole => userRole.userRoleId === selectedUserRoleIds[i]);
                selectedUserRoles.push({
                    userRole: userRoleObject
                });
            }
        }
        let documentationFolderClone = cloneDeep(documentationFolder);
        documentationFolderClone.documentationFolderUserRoleJoined = selectedUserRoles;
        setDocumentationFolder(documentationFolderClone);
    }

    const handlePermissionUserGroupsFolderSelectChange = (event) => {
        let selectedUserGroups = [];
        let lastSelected = event.target.value[event.target.value.length - 1];
        if (lastSelected === "SelectAll") {
            props.userGroups.forEach(userGroup => {
                selectedUserGroups.push({
                    userGroup
                });
            });
        } else if (lastSelected === "DeselectAll") {
            selectedUserGroups = [];
        } else {
            const selectedUserGroupIds = event.target.value;
            for (let i = 0, l = selectedUserGroupIds.length; i < l; i++) {
                const userGroupObject = props.userGroups.find(userGroup => userGroup.userGroupId === selectedUserGroupIds[i]);
                selectedUserGroups.push({
                    userGroup: userGroupObject
                });
            }
        }
        let documentationFolderClone = cloneDeep(documentationFolder);
        documentationFolderClone.documentationFolderUserGroupJoined = selectedUserGroups;
        setDocumentationFolder(documentationFolderClone);
    }

    const handlePermissionDepartmentFolderSelectChange = (event) => {
        let selectedDepartments = [];
        let lastSelected = event.target.value[event.target.value.length - 1];
        if (lastSelected === "SelectAll") {
            props.departments.forEach(department => {
                selectedDepartments.push({
                    department
                });
            });
        } else if (lastSelected === "DeselectAll") {
            selectedDepartments = [];
        } else {
            const selectedDepartmentIds = event.target.value;
            for (let i = 0, l = selectedDepartmentIds.length; i < l; i++) {
                const userRoleObject = props.departments.find(department => department.departmentId === selectedDepartmentIds[i]);
                selectedDepartments.push({
                    department: userRoleObject
                });
            }
        }
        let documentationFolderClone = cloneDeep(documentationFolder);
        documentationFolderClone.documentationFolderDepartmentJoined = selectedDepartments;
        setDocumentationFolder(documentationFolderClone);
    };

    const handleRadioButtonChange = (event, value) => {
        let documentationFolderClone = cloneDeep(documentationFolder);
        documentationFolderClone[event.target.name] = value;
        if(event.target.name === "permissionType"){
            documentationFolderClone.documentationFolderUserRoleJoined = [];
            documentationFolderClone.documentationFolderUserGroupJoined = [];
            documentationFolderClone.documentationFolderDepartmentJoined = [];
        }

        setDocumentationFolder(documentationFolderClone);
    };


    const {
        documentationFiles,
        documentationFolders,
        userRoles,
        documentationFolderPath,
        documentationFileHistory,
        documentationFileRevisions,
        documentationFolderTree,
        progress,
        progressBarOpened
    } = props;

    return (
        <div className={classes.root}>
            <Paper>
                <div className={classes.rootDiv}>
                    <DocumentationEnhancedTableToolbar
                        onNewFileClick={handleNewFileClick}
                        onNewFolderClick={handleNewFolderClick}
                        searchValue={searchValue}
                        onInputSearchChange={handleInputSearchChange}
                        onSearchSubmit={handleSearchSubmit}
                        searchPlaceholder="general.search.files.name"
                        titleLabel="support.icarusDocs"
                        showAddNew={Protected.protectedAuth(['PERM_SUPPORT_ADMIN'])}
                    />

                    <IcarusDocumentationTable
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        files={documentationFiles}
                        folders={documentationFolders}
                        onDeleteFile={handleDeleteFile}
                        onDeleteFolder={handleDeleteFolder}
                        documentationFolderPath={documentationFolderPath}
                        onFolderDoubleClick={handleFolderDoubleClick}
                        onFolderDoubleTap={handleFolderDoubleTap}
                        onBackDoubleClick={handleBackDoubleClick}
                        onBackDoubleTap={handleBackDoubleTap}
                        onEditFolder={handleEditFolder}
                        onDownloadFile={handleDownloadFile}
                        onViewFile={handleViewFile}
                        onReviseFile={handleReviseFile}
                        onEditFile={handleEditFile}
                        onRevisionsFile={handleRevisionsFile}
                        onHistoryFile={handleHistoryFile}
                        onMoveFile={handleMoveFile}
                        onMoveFolder={handleMoveFolder}
                    />
                    <DialogDeleteWarning
                        open={dialogFileDeleteWarningOpen}
                        text="documentation.file.delete"
                        onDelete={handleDeleteFileConfirmed}
                        onClose={handleDeleteFileClose}/>

                    <DialogDeleteWarning
                        open={dialogFolderDeleteWarningOpen}
                        text="documentation.folder.delete"
                        onDelete={handleDeleteFolderConfirmed}
                        onClose={handleDeleteFolderClose}/>

                    <DialogFormFrame
                        onClose={handleFolderDetailsClose}
                        title="documentation.folder.details"
                        open={dialogNewFolderOpen}
                        formComponent={
                            <DialogFormNewFolder
                                onClose={handleFolderDetailsClose}
                                onSubmit={handleFolderSubmit}
                                onInputChange={handleInputFolderChange}
                                onRadioButtonChange={handleRadioButtonChange}
                                onMultiSelectChange={handlePermissionFolderSelectChange}
                                onMultiSelectUserRoleChange={handlePermissionRolesFolderSelectChange}
                                onMultiSelectUserGroupChange={handlePermissionUserGroupsFolderSelectChange}
                                onMultiSelectDepartmentChange={handlePermissionDepartmentFolderSelectChange}
                                checkFolderDetailsRoleInArray={checkUserRoleInArray}
                                documentationFolder={documentationFolder}
                                userRoles={userRoles}/>
                        }/>
                    <DialogFormFrame
                        onClose={handleRevisionsClose}
                        title="documentation.file.revisions"
                        open={dialogRevisionsOpen}
                        formComponent={
                            <DialogFormFileRevisions
                                onClose={handleRevisionsClose}
                                documentationFileRevisions={documentationFileRevisions}/>
                        }/>
                    <DialogFormFrame
                        onClose={handleHistoryClose}
                        title="documentation.file.history"
                        open={dialogHistoryOpen}
                        formComponent={
                            <DialogFormFileHistory
                                onClose={handleHistoryClose}
                                documentationFileHistory={documentationFileHistory}/>
                        }/>
                    <DialogFormFrame
                        onClose={handleMoveFileClose}
                        title="documentation.file.move"
                        open={dialogMoveFileOpen}
                        formComponent={
                            <DialogFormFileMove
                                onClose={handleMoveFileClose}
                                onSubmit={handleMoveFileSubmit}
                                documentationFolderTree={documentationFolderTree}
                                documentationFolderDestinationMove={documentationFolderDestinationMove}
                                onFolderSelected={handleFolderMoveSelected}
                            />
                        }/>
                    <DialogFormFrame
                        onClose={handleMoveFolderClose}
                        title="documentation.folder.move"
                        open={dialogMoveFolderOpen}
                        formComponent={
                            <DialogFormFileMove
                                onClose={handleMoveFolderClose}
                                onSubmit={handleMoveFolderSubmit}
                                documentationFolderTree={documentationFolderTree}
                                documentationFolderDestinationMove={documentationFolderDestinationMove}
                                onFolderSelected={handleFolderMoveSelected}
                            />
                        }/>

                    <DialogNoCloseFrame
                        title="general.downloading"
                        open={progressBarOpened}
                        formComponent={
                            <DialogProgress
                                showCancel
                                onCancelClick={handleCancelClick}
                                progress={progress}/>
                        }/>

                </div>
            </Paper>
        </div>
    );
}

IcarusDocs.propTypes = {
    //myProp: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        documentationFiles: state.IcarusDocumentationFile.documentationFiles,
        documentationFileHistory: state.IcarusDocumentationFile.documentationFileHistory,
        documentationFileRevisions: state.IcarusDocumentationFile.documentationFileRevisions,
        documentationFolders: state.IcarusDocumentationFolder.documentationFolders,
        documentationFolderPath: state.IcarusDocumentationFolder.documentationFolderPath,
        documentationFolderTree: state.IcarusDocumentationFolder.documentationFolderTree,
        storageInfo: state.IcarusDocumentationFolder.storageInfo,
        userRoles: state.UserRole.userRoles,
        users: state.User.usersSimple,
        progress: state.Progress.progress,
        progressBarOpened: state.Progress.progressOpened
    }
}

function mapDispatchToProps(dispatch) {
    return {
        icarusDocumentationFileActions: bindActionCreators(icarusDocumentationFileActions, dispatch),
        icarusDocumentationFolderActions: bindActionCreators(icarusDocumentationFolderActions, dispatch),
        userRoleActions: bindActionCreators(userRoleActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(IcarusDocs);