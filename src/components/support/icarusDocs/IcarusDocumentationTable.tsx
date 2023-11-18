import React, { useState } from "react";
import * as Protected from "../../../protectedAuth";
import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
} from "@mui/material";
import {
  ArrowBack,
  Delete,
  Edit,
  ExitToApp,
  Folder,
  History,
  InsertDriveFile,
  MoreHoriz,
  VerticalAlignBottom,
  Visibility,
} from "@mui/icons-material";
import IntlMessages from "../../core/IntlMessages";
import {
  TableContainer2,
  TableContainer2Props,
} from "../../core/Table/TableContainer2";
import { ColumnDefinition } from "../../core/Table/TableHeader";
import { DialogDelete2 } from "../../core/Dialog/DialogDelete2";

export const columnData: ColumnDefinition[] = [
  {
    id: "ext",
    label: "general.type",
    style: {
      width: "60px",
    },
  },
  {
    id: "name",
    label: "general.name",
    sortable: true,
  },
  {
    id: "userCreated",
    label: "general.createdBy",
    sortable: true,
  },
  {
    id: "size",
    label: "documentation.size",
    sortable: true,
  },
  {
    id: "actions",
    label: "general.actions",
    style: { textAlign: "center" },
  },
];

const IcarusDocumentationTable = ({
  headerProps,
  files,
  folders,
  icarusDocumentationFolderPath,
  //
  onFolderDoubleClick,
  onBackDoubleClick,
  //
  onDeleteFolder,
  onEditFolder,
  onMoveFolder,
  //
  onDownloadFile,
  onViewFile,
  onEditFile,
  onDeleteFile,
  onHistoryFile,
  onMoveFile,
}: {
  headerProps: TableContainer2Props["headerProps"];
  files: any[];
  folders: any[];
  icarusDocumentationFolderPath: any[];
  //
  onFolderDoubleClick: (folder: any) => void;
  onBackDoubleClick: () => void;
  //
  onDeleteFolder: (folder: any) => Promise<void>;
  onEditFolder: (folder: any) => void;
  onMoveFolder: (folder: any) => void;
  //
  onDownloadFile: (file: any) => void;
  onViewFile: (file: any) => void;
  onEditFile: (file: any) => void;
  onDeleteFile: (file: any) => Promise<void>;
  onHistoryFile: (file: any) => void;
  onMoveFile: (file: any) => void;
}) => {
  const [anchorElFile, setAnchorElFile] = useState(null);
  const [indexSelectedFile, setIndexSelectedFile] = useState(undefined);
  const [anchorElFolder, setAnchorElFolder] = useState(null);
  const [indexSelectedFolder, setIndexSelectedFolder] = useState(undefined);

  const [dialogFileDeleteWarning, setDialogFileDeleteWarning] = useState();
  const [dialogFolderDeleteWarning, setDialogFolderDeleteWarning] = useState();

  const handleFileActionClick = (index) => (event) => {
    setAnchorElFile(event.currentTarget);
    setIndexSelectedFile(index);
  };

  const handleFileActionClose = () => {
    setAnchorElFile(null);
    setIndexSelectedFile(undefined);
  };

  const handleFolderActionClick = (index) => (event) => {
    setAnchorElFolder(event.currentTarget);
    setIndexSelectedFolder(index);
  };

  const handleFolderActionClose = () => {
    setAnchorElFolder(null);
    setIndexSelectedFolder(undefined);
  };

  return (
    <>
      <TableContainer2 headerProps={headerProps}>
        {icarusDocumentationFolderPath?.length > 0 && (
          <TableRow
            style={{ cursor: "pointer" }}
            hover={true}
            onDoubleClick={onBackDoubleClick}
          >
            <TableCell>
              <ArrowBack />
            </TableCell>
            <TableCell>...</TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
        )}

        {folders.map((folder, index) => {
          return (
            <TableRow
              key={folder.icarusDocumentationFolderId}
              hover={true}
              onDoubleClick={(event) => onFolderDoubleClick(folder)}
              style={{ cursor: "pointer" }}
            >
              <TableCell>
                <Folder color="secondary" />
              </TableCell>
              <TableCell>{folder.folderName}</TableCell>
              <TableCell>{folder.userCreator.fullName}</TableCell>
              <TableCell />
              <TableCell>
                {Protected.protectedAuth(["PERM_SUPPORT_ADMIN"]) ? (
                  <div style={{ textAlign: "center" }}>
                    <IconButton
                      aria-label="More"
                      aria-owns={
                        indexSelectedFolder === index ? "long-menu" : undefined
                      }
                      aria-haspopup="true"
                      onClick={handleFolderActionClick(index)}
                    >
                      <MoreHoriz />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={
                        indexSelectedFolder === index
                          ? anchorElFolder
                          : undefined
                      }
                      open={indexSelectedFolder === index}
                      onClose={handleFolderActionClose}
                    >
                      <MenuItem
                        onClick={() => {
                          handleFolderActionClose();
                          onEditFolder(folder);
                        }}
                      >
                        <ListItemIcon>
                          <Edit />
                        </ListItemIcon>
                        <ListItemText
                          primary={<IntlMessages id="general.edit" />}
                        />
                      </MenuItem>
                      <MenuItem
                        value="delete"
                        onClick={() => {
                          handleFolderActionClose();
                          setDialogFolderDeleteWarning(folder);
                        }}
                      >
                        <ListItemIcon>
                          <Delete />
                        </ListItemIcon>
                        <ListItemText
                          primary={<IntlMessages id="general.delete" />}
                        />
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleFolderActionClose();
                          onMoveFolder(folder);
                        }}
                      >
                        <ListItemIcon>
                          <ExitToApp />
                        </ListItemIcon>
                        <ListItemText
                          primary={<IntlMessages id="general.move" />}
                        />
                      </MenuItem>
                    </Menu>
                  </div>
                ) : null}
              </TableCell>
            </TableRow>
          );
        })}

        {files.map((file, index) => {
          return (
            <TableRow key={file.icarusDocumentationFileId} hover={true}>
              <TableCell>
                <InsertDriveFile color="primary" />
              </TableCell>
              <TableCell>
                {file.fullPath ? (
                  <React.Fragment>
                    <Box>{file.name}</Box>
                    <Box pt={1} fontStyle="italic" fontSize="caption.fontSize">
                      {file.fullPath}
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>{file.name}</React.Fragment>
                )}
              </TableCell>
              <TableCell>{file.userCreator.fullName}</TableCell>
              <TableCell>{file.sizeFormatted}</TableCell>
              <TableCell style={{ textAlign: "center" }}>
                <IconButton
                  aria-label="More"
                  aria-owns={
                    indexSelectedFile === index ? "long-menu" : undefined
                  }
                  aria-haspopup="true"
                  onClick={handleFileActionClick(index)}
                >
                  <MoreHoriz />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={
                    indexSelectedFile === index ? anchorElFile : undefined
                  }
                  open={indexSelectedFile === index}
                  onClose={handleFileActionClose}
                >
                  {!file.protectedFile && (
                    <MenuItem
                      onClick={() => {
                        handleFileActionClose();
                        onDownloadFile(file);
                      }}
                    >
                      <ListItemIcon>
                        <VerticalAlignBottom />
                      </ListItemIcon>
                      <ListItemText
                        primary={<IntlMessages id="general.download" />}
                      />
                    </MenuItem>
                  )}

                  <MenuItem
                    onClick={() => {
                      handleFileActionClose();
                      onViewFile(file);
                    }}
                  >
                    <ListItemIcon>
                      <Visibility />
                    </ListItemIcon>
                    <ListItemText
                      primary={<IntlMessages id="general.view" />}
                    />
                  </MenuItem>
                  {Protected.protectedAuth(["PERM_SUPPORT_ADMIN"]) ? (
                    <div>
                      <MenuItem
                        onClick={() => {
                          handleFileActionClose();
                          onEditFile(file);
                        }}
                      >
                        <ListItemIcon>
                          <Edit />
                        </ListItemIcon>
                        <ListItemText
                          primary={<IntlMessages id="general.edit" />}
                        />
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleFileActionClose();
                          onMoveFile(file);
                        }}
                      >
                        <ListItemIcon>
                          <ExitToApp />
                        </ListItemIcon>
                        <ListItemText
                          primary={<IntlMessages id="general.move" />}
                        />
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleFileActionClose();
                          setDialogFileDeleteWarning(file);
                        }}
                      >
                        <ListItemIcon>
                          <Delete />
                        </ListItemIcon>
                        <ListItemText
                          primary={<IntlMessages id="general.delete" />}
                        />
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleFileActionClose();
                          onHistoryFile(file);
                        }}
                      >
                        <ListItemIcon>
                          <History />
                        </ListItemIcon>
                        <ListItemText
                          primary={<IntlMessages id="general.history" />}
                        />
                      </MenuItem>
                    </div>
                  ) : null}
                </Menu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableContainer2>

      <DialogDelete2
        data={dialogFileDeleteWarning}
        text="documentation.file.delete"
        onSubmit={onDeleteFile}
        onClose={() => setDialogFileDeleteWarning(undefined)}
      />

      <DialogDelete2
        data={dialogFolderDeleteWarning}
        text="documentation.folder.delete"
        onSubmit={onDeleteFolder}
        onClose={() => setDialogFolderDeleteWarning(undefined)}
      />
    </>
  );
};

export default IcarusDocumentationTable;
