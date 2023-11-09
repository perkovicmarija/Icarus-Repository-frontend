import { useState } from "react";
import { TableCell, TableRow } from "@mui/material";
import { TableContainer2 } from "../../../components/core/Table/TableContainer2";
import TableToolbar2, {
  TableToolbar2Props,
} from "../../../components/core/Table/TableToolbar2";
import { ColumnDefinition } from "../../../components/core/Table/TableHeader";
import { TablePagination2Props } from "../../../components/core/Table/TablePagination2";
//import { TableActions2 } from "../../../components/core/Table/TableActions2";
//import { Delete, Edit } from "@mui/icons-material";
import { DialogDelete2 } from "../../../components/core/Dialog/DialogDelete2";
//
import { protectedAuth } from "../../../protectedAuth";
import { initFilters } from "../../../redux/support/supportRequests/supportRequestsSlice";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  statusNeedReview: {
    color: "#FF0000",
    fontWeight: "bold",
  },
  statusInProgress: {
    color: "#c3922e",
    fontWeight: "bold",
  },
  statusFinished: {
    color: "#2ECC71",
    fontWeight: "bold",
  },
  statusNone: {
    color: "#000000",
    fontWeight: "bold",
  },
  statusPending: {
    color: "#043076",
    fontWeight: "bold",
  },
  levelLow: {
    color: "green",
  },
  levelHigh: {
    color: "#E26363",
  },
  levelMedium: {
    color: "orange",
  },
  levelUrgent: {
    color: "red",
    fontWeight: "bold",
  },
  levelNone: {
    color: "#000000",
  },
}));

const columnData: ColumnDefinition[] = [
  { id: "id", numeric: false, disablePadding: false, label: "general.id" },
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "general.title",
  },
  {
    id: "module",
    numeric: false,
    disablePadding: false,
    label: "general.module",
  },
  {
    id: "createdBy",
    numeric: false,
    disablePadding: false,
    label: "general.createdBy",
  },
  {
    id: "severity",
    numeric: false,
    disablePadding: false,
    label: "general.severity",
  },
  { id: "date", numeric: false, disablePadding: false, label: "general.date" },
  {
    id: "dueDate",
    numeric: false,
    disablePadding: false,
    label: "general.dueDate",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "general.status",
  },
];

const SupportRequestsList = <T,>({
  data,
  onEdit,
  onDelete,
  //
  toolbarProps,
  paginationProps,
  loading,
}: {
  toolbarProps: TableToolbar2Props;
  paginationProps: TablePagination2Props;
  data: T[] | undefined;
  onEdit: (item: T) => any;
  onDelete: (item: T) => any;
  loading: boolean;
}) => {
  const classes = useStyles();

  const [dialogWarning, setDialogWarning] = useState<T | undefined>();

  const changeValueOnStatus = (value: any) => {
    if (value === "in-progress") {
      return classes.statusInProgress;
    }
    if (value === "review") {
      return classes.statusNeedReview;
    }
    if (value === "completed") {
      return classes.statusFinished;
    }
    if (value === "cancelled") {
      return classes.statusNone;
    }
    return classes.statusPending;
  };

  const changeValueOnLevel = (value: any, status: any) => {
    if (status === "completed" || status === "cancelled") {
      return classes.levelNone;
    }

    if (value === "urgent") {
      return classes.levelUrgent;
    }
    if (value === "medium") {
      return classes.levelMedium;
    }

    if (value === "high") {
      return classes.levelHigh;
    }
    if (value === "low") {
      return classes.levelLow;
    }
    return classes.levelNone;
  };

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
                key={item.supportBugIdSign}
                onClick={() => onEdit(item)}
                hover={true}
              >
                <TableCell>{item.supportBugIdSign}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.module.name}</TableCell>
                <TableCell>{item.userAuthor.fullName}</TableCell>
                <TableCell
                  className={changeValueOnLevel(
                    item.level.code,
                    item.status.code
                  )}
                >
                  {item.level.level}
                </TableCell>
                <TableCell>{item.created}</TableCell>
                <TableCell>{item.dueDate}</TableCell>
                <TableCell className={changeValueOnStatus(item.status.code)}>
                  {item.status.status}
                </TableCell>
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

export default SupportRequestsList;
