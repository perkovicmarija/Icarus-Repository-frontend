import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
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
    id: "abbreviation",
    numeric: false,
    disablePadding: false,
    label: "general.abbreviation",
  },
  {
    id: "actions",
    label: "general.actions",
    style: { textAlign: "center" },
  },
];

const ClientList = ({
  data,
  onSearchSubmit,
  onNewClientClick,
  onClientEdit,
  onClientDelete,
  page,
  rowsPerPage,
  totalCount,
  onChangePage,
  onChangeRowsPerPage,
  filters,
}: TableToolbar2Props &
  TableHeaderProps &
  TablePagination2Props & {
    onClientEdit: any;
    onClientDelete: any;
    onNewClientClick: any;
    data: any[];
  }) => {
  return (
    <>
      <TableToolbar2
        title="form.clients"
        //
        filters={filters}
        onSearchSubmit={onSearchSubmit}
        searchPlaceholder={"search.byName"}
        searchTextPropKey="clientSearch"
        //
        onAddClick={onNewClientClick}
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
        {data
          .filter((client: any) => !client.deactivated)
          .map((client: any) => {
            return (
              <TableRow
                style={{ cursor: "pointer" }}
                key={client.clientId}
                hover={true}
              >
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.abbreviation}</TableCell>
                <TableCell className="nostretch">
                  <Tooltip title="Edit">
                    <>
                      <div className="d-inline">
                        <IconButton
                          aria-label="Edit"
                          onClick={(event) => onClientEdit(event, client)}
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
                          onClick={(event) => onClientDelete(event, client)}
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
};

export default ClientList;
