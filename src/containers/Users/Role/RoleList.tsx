import { TableRow, IconButton, TableCell, Tooltip } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { TableContainer2 } from "../../../components/core/Table/TableContainer2";
import TableToolbar2, {
  TableToolbar2Props,
} from "../../../components/core/Table/TableToolbar2";
import {
  ColumnDefinition,
  TableHeaderProps,
} from "../../../components/core/Table/TableHeader";
import { TablePagination2Props } from "../../../components/core/Table/TablePagination2";

const columnData: ColumnDefinition[] = [
  { id: "name", numeric: false, disablePadding: false, label: "general.name" },

  {
    id: "actions",
    label: "general.actions",
    style: { textAlign: "center" },
  },
];

function RoleList({
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
    <div>
      <TableToolbar2
        title="form.userRoles"
        //
        onAddClick={onAddClick}
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
        {data.map((role) => {
          return (
            <TableRow
              style={{ cursor: "pointer" }}
              key={role.userRoleId}
              hover={true}
            >
              <TableCell>{role.name}</TableCell>
              <TableCell className="nostretch">
                <Tooltip title="Edit">
                  <div className="d-inline">
                    <IconButton
                      aria-label="Edit"
                      onClick={(event) => onEdit(event, role)}
                    >
                      <Edit />
                    </IconButton>
                  </div>
                </Tooltip>
                <Tooltip title="Delete">
                  <>
                    <div className="d-inline">
                      <IconButton
                        aria-label="Delete"
                        onClick={(event) => onDelete(event, role)}
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
    </div>
  );
}

export default RoleList;
