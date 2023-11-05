import { TableCell, TableRow, Tooltip, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import TableToolbar2, {
  TableToolbar2Props,
} from "../../../components/core/Table/TableToolbar2";
import { TableContainer2 } from "../../../components/core/Table/TableContainer2";
import {
  ColumnDefinition,
  TableHeaderProps,
} from "../../../components/core/Table/TableHeader";
import { TablePagination2Props } from "../../../components/core/Table/TablePagination2";

const columnData: ColumnDefinition[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "general.groupName",
  },
  {
    id: "number",
    numeric: false,
    disablePadding: false,
    label: "general.number",
  },
  {
    id: "actions",
    label: "general.actions",
    style: { textAlign: "center" },
  },
];

function UserGroupList({
  data,
  totalCount,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  onAddClick,
  onEdit,
  onDelete,
}: TableToolbar2Props &
  TableHeaderProps &
  TablePagination2Props & {
    data: any[];
    onEdit: any;
    onDelete: any;
  }) {
  return (
    <>
      <TableToolbar2 title="form.userGroups" onAddClick={onAddClick} />

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
        {data.map((item) => {
          return (
            <TableRow
              style={{ cursor: "pointer" }}
              key={item.userGroupId}
              hover={true}
            >
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.numberOfParticipants}</TableCell>
              <TableCell className="nostretch">
                <Tooltip title="Edit">
                  <>
                    <div className="d-inline">
                      <IconButton
                        aria-label="Edit"
                        onClick={(event) => onEdit(event, item)}
                      >
                        <Edit />
                      </IconButton>
                    </div>
                  </>
                </Tooltip>
                <Tooltip title="Delete">
                  <>
                    <div className="d-inline">
                      <IconButton
                        aria-label="Delete"
                        onClick={(event) => onDelete(event, item)}
                      >
                        <Delete />
                      </IconButton>
                    </div>
                  </>
                </Tooltip>
              </TableCell>
            </TableRow>
          );
        })}
      </TableContainer2>
    </>
  );
}

export default UserGroupList;
