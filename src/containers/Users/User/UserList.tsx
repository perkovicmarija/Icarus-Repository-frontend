import { TableCell, TableRow } from "@mui/material";

import { TableContainer2 } from "../../../components/core/Table/TableContainer2";
import TableToolbar2, {
  TableToolbar2Props,
} from "../../../components/core/Table/TableToolbar2";
import { initFilters } from "../../../redux/user/userReducer";
import {
  ColumnDefinition,
  TableHeaderProps,
} from "../../../components/core/Table/TableHeader";
import { TablePagination2Props } from "../../../components/core/Table/TablePagination2";

const columnData: ColumnDefinition[] = [
  { id: "name", label: "form.name" },
  { id: "email", label: "form.email" },
];

function UserList({
  data,
  totalCount,
  page,
  rowsPerPage,
  onEdit,
  onAddClick,
  onChangePage,
  onChangeRowsPerPage,
  onFilterClick,
  filters,
  onSearchSubmit,
}: TableToolbar2Props &
  TableHeaderProps &
  TablePagination2Props & {
    data: any[];
    onEdit: any;
  }) {
  return (
    <>
      <TableToolbar2
        title="form.users"
        //
        filters={filters}
        onSearchSubmit={onSearchSubmit}
        searchPlaceholder="search.byEmail"
        searchTextPropKey="userSearch"
        //
        onAddClick={onAddClick}
        //
        onFilterClick={onFilterClick}
        initFilters={initFilters}
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
        {data.map((user) => {
          return (
            <TableRow
              style={{
                cursor: "pointer",
              }}
              key={user.userId}
              onClick={(event) => onEdit(event, user.userId)}
              hover={true}
            >
              <TableCell>{user.surname + " " + user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          );
        })}
      </TableContainer2>
    </>
  );
}

export default UserList;
