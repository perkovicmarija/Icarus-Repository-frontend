import { useState } from "react";
import { Box, TableCell, TableRow } from "@mui/material";
import { TableContainer2 } from "../../components/core/Table/TableContainer2";
import TableToolbar2, {
  TableToolbar2Props,
} from "../../components/core/Table/TableToolbar2";
import { ColumnDefinition } from "../../components/core/Table/TableHeader";
import { TablePagination2Props } from "../../components/core/Table/TablePagination2";
import { TableActions2 } from "../../components/core/Table/TableActions2";
import { Delete, Edit, Add, List } from "@mui/icons-material";
import { DialogDelete2 } from "../../components/core/Dialog/DialogDelete2";
import { protectedAuth } from "../../protectedAuth";
//

const columnData: ColumnDefinition[] = [
  { id: "id", numeric: false, disablePadding: false, label: "general.id" },
  {
    id: "domain",
    numeric: false,
    disablePadding: false,
    label: "qms.checklist.domain",
  },
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "general.title",
  },
  {
    id: "version",
    numeric: false,
    disablePadding: false,
    label: "qms.checklist.versionMobile",
  },
  {
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "general.type",
  },
  {
    id: "effective",
    numeric: false,
    disablePadding: false,
    label: "qms.checklist.effectiveDate",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "general.status",
  },
  {
    id: "actions",
    label: "general.actions",
    style: { textAlign: "center" },
  },
];

const AuditChecklistsList = <T,>({
  data,
  toolbarProps,
  paginationProps,
  loading,
  //
  onItemClick,
  onNewVersion,
  onShowRevisions,
  onEdit,
  onDelete,
}: {
  toolbarProps: TableToolbar2Props;
  paginationProps: TablePagination2Props;
  data: T[] | undefined;
  loading: boolean;
  //
  onEdit: (item: T) => void;
  onDelete: (item: T) => Promise<any>;
  onItemClick: (item: T) => void;
  onNewVersion: (item: T) => void;
  onShowRevisions: (item: T) => void;
}) => {
  const [dialogWarning, setDialogWarning] = useState<T | undefined>();

  return (
    <>
      <TableToolbar2 {...toolbarProps} />

      <TableContainer2
        headerProps={{
          columnData,
        }}
        paginationProps={paginationProps}
        loading={loading}
      >
        {data &&
          data.map((item: any) => {
            return (
              <TableRow
                style={{ cursor: "pointer" }}
                key={item.auditChecklistId}
                hover={true}
                onClick={() => onItemClick(item.auditChecklistId)}
              >
                <TableCell>{item.abbreviation}</TableCell>
                <TableCell>
                  {item.domain !== null ? item.domain.name : "-"}
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.version}</TableCell>
                <TableCell>
                  {item.auditChecklistType ? item.auditChecklistType.name : ""}
                </TableCell>
                <TableCell>{item.effectiveDate}</TableCell>
                <TableCell>
                  {item.published ? (
                    <Box
                      sx={{
                        fontWeight: "bold",
                        color: "green",
                      }}
                    >
                      PUBLISHED
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      DRAFT
                    </Box>
                  )}
                </TableCell>
                {protectedAuth(["PERM_AUDIT_CRUD"]) && (
                  <TableCell
                    className="nostretch"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <TableActions2
                      actions={[
                        {
                          label: "general.edit",
                          Icon: Edit,
                          onClick: () => onEdit(item),
                        },
                        {
                          label: "general.newRevision",
                          Icon: Add,
                          onClick: () => onNewVersion(item),
                        },
                        {
                          label: "general.revisions",
                          Icon: List,
                          onClick: () => onShowRevisions(item),
                        },
                        {
                          label: "general.delete",
                          Icon: Delete,
                          onClick: () => setDialogWarning(item),
                        },
                      ]}
                    />
                  </TableCell>
                )}
              </TableRow>
            );
          })}
      </TableContainer2>

      <DialogDelete2
        data={dialogWarning}
        onSubmit={onDelete}
        onClose={() => setDialogWarning(undefined)}
      />
    </>
  );
};

export default AuditChecklistsList;
