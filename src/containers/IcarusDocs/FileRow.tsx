import {
  Delete,
  Edit,
  ExitToApp,
  History,
  InsertDriveFile,
  MoreHoriz,
  VerticalAlignBottom,
  Visibility,
} from "@mui/icons-material";
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
import { FormattedMessage } from "react-intl";
import { protectedAuth } from "../../protectedAuth";
import { useState } from "react";

export const FileRow = ({
  file,
  onDownloadFile,
  onViewFile,
  onEditFile,
  onMoveFile,
  onDeleteFile,
  onHistoryFile,
}: any) => {
  const [anchorElFile, setAnchorElFile] = useState<
    HTMLButtonElement | undefined
  >();

  const menuOptions = [
    !file.protectedFile && {
      label: "general.download",
      Icon: VerticalAlignBottom,
      onClick: onDownloadFile,
    },
    {
      label: "general.view",
      Icon: Visibility,
      onClick: onViewFile,
    },
    protectedAuth(["PERM_SUPPORT_ADMIN"]) && {
      label: "general.edit",
      Icon: Edit,
      onClick: onEditFile,
    },
    protectedAuth(["PERM_SUPPORT_ADMIN"]) && {
      label: "general.move",
      Icon: ExitToApp,
      onClick: onMoveFile,
    },
    protectedAuth(["PERM_SUPPORT_ADMIN"]) && {
      label: "general.delete",
      Icon: Delete,
      onClick: onDeleteFile,
    },
    protectedAuth(["PERM_SUPPORT_ADMIN"]) && {
      label: "general.history",
      Icon: History,
      onClick: onHistoryFile,
    },
  ];

  return (
    <TableRow key={file.icarusDocumentationFileId} hover={true}>
      <TableCell>
        <InsertDriveFile color="primary" />
      </TableCell>
      <TableCell>
        {file.fullPath ? (
          <>
            <Box>{file.name}</Box>
            <Box pt={1} fontStyle="italic" fontSize="caption.fontSize">
              {file.fullPath}
            </Box>
          </>
        ) : (
          file.name
        )}
      </TableCell>
      <TableCell>{file.userCreator.fullName}</TableCell>
      <TableCell>{file.sizeFormatted}</TableCell>
      <TableCell style={{ textAlign: "center" }}>
        <IconButton
          aria-label="More"
          aria-owns={anchorElFile ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={(e) => setAnchorElFile(e.currentTarget)}
        >
          <MoreHoriz />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorElFile}
          open={Boolean(anchorElFile)}
          onClose={() => setAnchorElFile(undefined)}
        >
          {menuOptions
            .filter((i) => i)
            .map(
              (
                {
                  label,
                  Icon,
                  onClick,
                }: any /* Exclude<(typeof menuOptions)[number], boolean> */
              ) => (
                <MenuItem
                  key={label}
                  onClick={() => {
                    setAnchorElFile(undefined);
                    onClick(file);
                  }}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={<FormattedMessage id={label} />} />
                </MenuItem>
              )
            )}
        </Menu>
      </TableCell>
    </TableRow>
  );
};
