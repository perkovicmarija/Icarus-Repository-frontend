import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { TableContainer2 } from "../../../components/core/Table/TableContainer2";
import TableToolbar2, {
  TableToolbar2Props,
} from "../../../components/core/Table/TableToolbar2";
import { initFilters } from "../../../redux/support/supportReducer";
import {
  ColumnDefinition,
  TableHeaderProps,
} from "../../../components/core/Table/TableHeader";
import { TablePagination2Props } from "../../../components/core/Table/TablePagination2";

const columnData: ColumnDefinition[] = [
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "general.title",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "general.description",
  },
  {
    id: "clients",
    numeric: false,
    disablePadding: false,
    label: "form.clients",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "support.dateOfLog",
  },
  {
    id: "actions",
    label: "general.actions",
    style: { textAlign: "center" },
  },
];

const SupportSoftwareLogList = ({
  data,
  onAddClick,
  onEdit,
  onDelete,
  //
  page,
  rowsPerPage,
  totalCount,
  onChangePage,
  onChangeRowsPerPage,
  //
  filters,
  onFilterClick,
  onSearchSubmit,
}: TableToolbar2Props &
  TableHeaderProps &
  TablePagination2Props & {
    data: any[];
    onEdit: any;
    onDelete: any;
  }) => {
  return (
    <div>
      <TableToolbar2
        title="support.softwareLogs"
        //
        filters={filters}
        onSearchSubmit={onSearchSubmit}
        searchPlaceholder="search.search"
        searchTextPropKey="softwareLogSearch"
        //
        onAddClick={onAddClick}
        //
        initFilters={initFilters}
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
        {data.map((softwareLog, i) => {
          return (
            <TableRow style={{ cursor: "pointer" }} key={i} hover={true}>
              <TableCell>{softwareLog.title}</TableCell>
              <TableCell>{softwareLog.description}</TableCell>
              <TableCell>
                {softwareLog.supportSoftwareLogClientJoinedList
                  .map((x: any) => x.client.name)
                  .join(", ")}
              </TableCell>
              <TableCell sx={{ width: "150px" }}>
                {softwareLog.dateFormatted}
              </TableCell>
              <TableCell className="nostretch">
                <Tooltip title="Edit">
                  <>
                    <div className="d-inline">
                      <IconButton
                        aria-label="Edit"
                        onClick={(event) => onEdit(event, softwareLog)}
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
                        onClick={(event) => onDelete(event, softwareLog)}
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
};

export default SupportSoftwareLogList;
