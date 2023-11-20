import {
  Delete,
  Edit,
  ExitToApp,
  Folder,
  MoreHoriz,
} from "@mui/icons-material";
import {
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

export const FolderRow = ({
  folder,
  onEditFolder,
  onMoveFolder,
  onDeleteFolder,
  //
  onNavigate,
}: any) => {
  const [anchorElFile, setAnchorElFile] = useState<
    HTMLButtonElement | undefined
  >();

  const menuOptions = [
    protectedAuth(["PERM_SUPPORT_ADMIN"]) && {
      label: "general.edit",
      Icon: Edit,
      onClick: onEditFolder,
    },
    protectedAuth(["PERM_SUPPORT_ADMIN"]) && {
      label: "general.move",
      Icon: ExitToApp,
      onClick: onMoveFolder,
    },
    protectedAuth(["PERM_SUPPORT_ADMIN"]) && {
      label: "general.delete",
      Icon: Delete,
      onClick: onDeleteFolder,
    },
  ];

  return (
    <TableRow
      key={folder.icarusDocumentationFolderId}
      hover={true}
      onDoubleClick={() => onNavigate(folder.path + folder.folderName + "/")}
      style={{ cursor: "pointer" }}
    >
      <TableCell>
        <Folder color="secondary" />
      </TableCell>
      <TableCell>{folder.folderName}</TableCell>
      <TableCell>{folder.userCreator.fullName}</TableCell>
      <TableCell />
      <TableCell style={{ textAlign: "center" }}>
        {protectedAuth(["PERM_SUPPORT_ADMIN"]) && (
          <>
            <IconButton
              aria-label="More"
              aria-owns={anchorElFile ? "simple-menu" : undefined}
              aria-haspopup="true"
              onClick={(e) => setAnchorElFile(e.currentTarget)}
              onDoubleClick={(e) => e.stopPropagation()}
            >
              <MoreHoriz />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorElFile}
              open={Boolean(anchorElFile)}
              onClose={() => setAnchorElFile(undefined)}
              onDoubleClick={
                (e) => e.stopPropagation()
                /* need to stop propagation here also because on menu click opens this menu and triggers parent row doubleclick */
              }
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
                        onClick(folder);
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
          </>
        )}
      </TableCell>
    </TableRow>
  );
};
