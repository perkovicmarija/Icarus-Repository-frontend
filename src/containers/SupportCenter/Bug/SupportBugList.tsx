import { TableCell, TableRow } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { TableContainer2 } from "../../../components/core/Table/TableContainer2";
import TableToolbar2, {
  TableToolbar2Props,
} from "../../../components/core/Table/TableToolbar2";
import { protectedAuth } from "../../../protectedAuth";
import { TableHeaderProps } from "../../../components/core/Table/TableHeader";
import { TablePagination2Props } from "../../../components/core/Table/TablePagination2";

const useStyles = makeStyles((theme: any) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  tableRow: {
    cursor: "pointer",
  },
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

const columnData = [
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

function SupportBugList({
  data,
  totalCount,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  onEdit,
  onFilterClick,
  filters,
  onAddClick,
}: Omit<TableToolbar2Props, "title"> &
  Omit<TableHeaderProps, "columnData"> &
  TablePagination2Props & {
    data: any[];
    onEdit: any;
  }) {
  const classes = useStyles();

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
    <div className={classes.root}>
      <TableToolbar2
        title="support.bug.list"
        //
        onAddClick={
          protectedAuth([
            "PERM_SUPPORT_BASIC",
            "PERM_SUPPORT_CRUD",
            "PERM_SUPPORT_ADMIN",
          ]) && onAddClick
        }
        //
        filters={filters}
        onFilterClick={onFilterClick}
      />

      <TableContainer2
        headerProps={{
          columnData,
        }}
        paginationProps={{
          totalCount,
          rowsPerPage,
          page,
          onChangePage,
          onChangeRowsPerPage,
        }}
      >
        {data.map((item: any) => {
          return (
            <TableRow
              className={classes.tableRow}
              key={item.supportBugIdSign}
              onClick={(event) => onEdit(event, item.supportBugId)}
              hover={true}
            >
              <TableCell>{item.supportBugIdSign}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.module.name}</TableCell>
              <TableCell>
                {item.userAuthor.surname + " " + item.userAuthor.name}
              </TableCell>
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
    </div>
  );
}

export default SupportBugList;
