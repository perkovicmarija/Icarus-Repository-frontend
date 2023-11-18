import { useState } from "react";
import { TableCell, TableRow } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import {
  TableContainer2,
  TableContainer2Props,
} from "../../components/core/Table/TableContainer2";
import { ColumnDefinition } from "../../components/core/Table/TableHeader";
import { DialogDelete2 } from "../../components/core/Dialog/DialogDelete2";
import DialogFormFrame from "../../components/core/Dialog/DialogFormFrame";
//
import DialogFormMove from "./dialogs/DialogFormMove";
import { FileRow } from "./FileRow";
import { FolderRow } from "./FolderRow";

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
  },
  {
    id: "userCreated",
    label: "general.createdBy",
  },
  {
    id: "size",
    label: "documentation.size",
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
  currentPath,
  //
  onEnterFolder,
  onBackNavigation,
  onMove,
  //
  onDeleteFolder,
  onEditFolder,
  //
  onDownloadFile,
  onViewFile,
  onEditFile,
  onDeleteFile,
  onHistoryFile,
}: {
  headerProps: TableContainer2Props["headerProps"];
  files: any[] | undefined;
  folders: any[] | undefined;
  currentPath: string;
  //
  onEnterFolder: (folder: any) => void;
  onBackNavigation: () => void;
  onMove: (file: any) => void;
  //
  onDeleteFolder: (folder: any) => Promise<void>;
  onEditFolder: (folder: any) => void;
  //
  onDownloadFile: (file: any) => void;
  onViewFile: (file: any) => void;
  onEditFile: (file: any) => void;
  onDeleteFile: (file: any) => Promise<any>;
  onHistoryFile: (file: any) => void;
}) => {
  const [dialogFileDeleteWarning, setDialogFileDeleteWarning] = useState();
  const [dialogFolderDeleteWarning, setDialogFolderDeleteWarning] = useState();

  const [dialogMove, setDialogMove] = useState();

  return (
    <>
      <TableContainer2 headerProps={headerProps} loading={!files || !folders}>
        {files && folders && (
          <>
            {currentPath !== "/" && (
              <TableRow
                style={{ cursor: "pointer" }}
                hover={true}
                onDoubleClick={onBackNavigation}
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

            {folders.map((folder) => (
              <FolderRow
                key={folder.icarusDocumentationFolderId}
                folder={folder}
                onEditFolder={onEditFolder}
                onMoveFolder={setDialogMove}
                onDeleteFolder={setDialogFolderDeleteWarning}
                //
                onEnterFolder={onEnterFolder}
              />
            ))}

            {files.map((file) => (
              <FileRow
                key={file.icarusDocumentationFileId}
                file={file}
                onDownloadFile={onDownloadFile}
                onViewFile={onViewFile}
                onEditFile={onEditFile}
                onMoveFile={setDialogMove}
                onDeleteFile={setDialogFileDeleteWarning}
                onHistoryFile={onHistoryFile}
              />
            ))}
          </>
        )}
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

      <DialogFormFrame
        onClose={() => setDialogMove(undefined)}
        title="documentation.file.move" /* "documentation.folder.move" */
        open={dialogMove}
      >
        <DialogFormMove
          initialData={dialogMove!}
          onClose={() => setDialogMove(undefined)}
          onSubmit={onMove}
        />
      </DialogFormFrame>
    </>
  );
};

export default IcarusDocumentationTable;
