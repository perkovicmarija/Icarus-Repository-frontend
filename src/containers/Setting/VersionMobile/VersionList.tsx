import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { TableContainer2 } from "../../../components/core/Table/TableContainer2";
import TableToolbar2 from "../../../components/core/Table/TableToolbar2";
import { ColumnDefinition } from "../../../components/core/Table/TableHeader";

const columnData: ColumnDefinition[] = [
  {
    id: "versionMin",
    numeric: false,
    disablePadding: false,
    label: "general.versionMobile",
  },
  {
    id: "platform",
    numeric: false,
    disablePadding: false,
    label: "general.platform",
  },
  {
    id: "abbreviation",
    numeric: false,
    disablePadding: false,
    label: "general.client",
  },
  {
    id: "actions",
    label: "general.actions",
    style: { textAlign: "center" },
  },
];

const VersionList = ({
  data,
  filters,
  onSearchSubmit,
  onNewVersionMobileClick,
  onVersionMobileEdit,
  onVersionMobileDelete,
  page,
  rowsPerPage,
  totalCount,
  onChangePage,
  onChangeRowsPerPage,
}: any) => {
  return (
    <>
      <TableToolbar2
        title="general.versionsMobile"
        //
        filters={filters}
        onSearchSubmit={onSearchSubmit}
        searchPlaceholder="search.byClientName"
        searchTextPropKey="clientName"
        //
        onAddClick={onNewVersionMobileClick}
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
        {data.map((version: any) => {
          return (
            <TableRow
              style={{ cursor: "pointer" }}
              key={version.versionMobileId}
              hover={true}
            >
              <TableCell>{version.versionMin}</TableCell>
              <TableCell>{version.platform}</TableCell>
              <TableCell>{version.client.name}</TableCell>
              <TableCell className="nostretch">
                <Tooltip title="Edit">
                  <>
                    <div className="d-inline">
                      <IconButton
                        aria-label="Edit"
                        onClick={(event) => onVersionMobileEdit(event, version)}
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
                        onClick={(event) =>
                          onVersionMobileDelete(event, version)
                        }
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

export default VersionList;
