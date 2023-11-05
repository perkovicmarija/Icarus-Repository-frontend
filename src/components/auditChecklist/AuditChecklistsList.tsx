import { makeStyles } from "@mui/styles";
import { TableCell, TableRow, IconButton, Tooltip } from "@mui/material";
import * as Protected from "../../protectedAuth";
import Edit from "@mui/icons-material/Edit";
import Add from "@mui/icons-material/Add";
import List from "@mui/icons-material/List";
import Delete from "@mui/icons-material/Delete";
import { TableContainer2 } from "../core/Table/TableContainer2";
import TableToolbar2 from "../core/Table/TableToolbar2";
import { initFilters } from "../../redux/auditChecklist/auditChecklistReducer";
import { FormattedMessage } from "react-intl";
import { ColumnDefinition } from "../core/Table/TableHeader";

const useStyles = makeStyles(() => ({
  labelCustomValuePublished: {
    fontWeight: "bold",
    color: "green",
  },
  labelCustomValueDraft: {
    fontWeight: "bold",
  },
}));

const AuditChecklistsList = ({
  rowsPerPage,
  page,
  order,
  orderBy,
  auditChecklists,
  totalCount,
  onChangePage,
  onChangeRowsPerPage,
  filters,
  onSearchSubmit,
  onFilterClick,
  //
  handleAuditChecklistClick,
  handleChecklistEdit,
  handleChecklistNewVersion,
  handleChecklistRevisions,
  handleChecklistNewClick,
  handleChecklistDelete,
  onRequestSort,
}: any) => {
  const classes = useStyles();

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

  return (
    <div>
      <TableToolbar2
        title="qms.audits.checklists"
        onAddClick={
          Protected.protectedAuth(["PERM_AUDIT_CRUD", "PERM_AUDIT_ENTRY"]) &&
          handleChecklistNewClick
        }
        //
        filters={filters}
        onSearchSubmit={onSearchSubmit}
        searchPlaceholder="general.search.idTitle2"
        searchTextPropKey="stringSearch"
        //
        initFilters={initFilters}
        onFilterClick={onFilterClick}
      />
      <TableContainer2
        headerProps={{
          columnData,
          order,
          orderBy,
          onRequestSort,
        }}
        paginationProps={{
          totalCount,
          rowsPerPage,
          page,
          onChangePage,
          onChangeRowsPerPage,
        }}
      >
        {auditChecklists.map((item: any) => {
          return (
            <TableRow
              style={{ cursor: "pointer" }}
              key={item.auditChecklistId}
              hover={true}
            >
              <TableCell
                onClick={(event) =>
                  handleAuditChecklistClick(event, item.auditChecklistId)
                }
              >
                {item.abbreviation}
              </TableCell>
              <TableCell
                onClick={(event) =>
                  handleAuditChecklistClick(event, item.auditChecklistId)
                }
              >
                {item.domain !== null ? item.domain.name : "-"}
              </TableCell>
              <TableCell
                onClick={(event) =>
                  handleAuditChecklistClick(event, item.auditChecklistId)
                }
              >
                {item.title}
              </TableCell>
              <TableCell
                onClick={(event) =>
                  handleAuditChecklistClick(event, item.auditChecklistId)
                }
              >
                {item.version}
              </TableCell>
              <TableCell
                onClick={(event) =>
                  handleAuditChecklistClick(event, item.auditChecklistId)
                }
              >
                {item.auditChecklistType ? item.auditChecklistType.name : ""}
              </TableCell>
              <TableCell
                onClick={(event) =>
                  handleAuditChecklistClick(event, item.auditChecklistId)
                }
              >
                {item.effectiveDate}
              </TableCell>
              <TableCell
                onClick={(event) =>
                  handleAuditChecklistClick(event, item.auditChecklistId)
                }
              >
                {item.published ? (
                  <label className={classes.labelCustomValuePublished}>
                    PUBLISHED
                  </label>
                ) : (
                  <label className={classes.labelCustomValueDraft}>DRAFT</label>
                )}
              </TableCell>
              {Protected.protectedAuth(["PERM_AUDIT_CRUD"]) ? (
                <TableCell className="nostretch">
                  <Tooltip title={<FormattedMessage id="general.edit" />}>
                    <>
                      <div className="d-inline">
                        <IconButton
                          aria-label="Edit"
                          onClick={(event) => handleChecklistEdit(event, item)}
                        >
                          <Edit />
                        </IconButton>
                      </div>
                    </>
                  </Tooltip>
                  <Tooltip
                    title={<FormattedMessage id="general.newRevision" />}
                  >
                    <>
                      <div className="d-inline">
                        <IconButton
                          aria-label="New version"
                          onClick={(event) =>
                            handleChecklistNewVersion(event, item)
                          }
                        >
                          <Add />
                        </IconButton>
                      </div>
                    </>
                  </Tooltip>
                  <Tooltip title={<FormattedMessage id="general.revisions" />}>
                    <>
                      <div className="d-inline">
                        <IconButton
                          aria-label="Revisions"
                          onClick={(event) =>
                            handleChecklistRevisions(event, item)
                          }
                        >
                          <List />
                        </IconButton>
                      </div>
                    </>
                  </Tooltip>
                  <Tooltip title={<FormattedMessage id="general.delete" />}>
                    <>
                      <div className="d-inline">
                        <IconButton
                          aria-label="Delete"
                          onClick={(event) =>
                            handleChecklistDelete(event, item)
                          }
                        >
                          <Delete />
                        </IconButton>
                      </div>
                    </>
                  </Tooltip>
                </TableCell>
              ) : null}
            </TableRow>
          );
        })}
      </TableContainer2>
    </div>
  );
};

export default AuditChecklistsList;
