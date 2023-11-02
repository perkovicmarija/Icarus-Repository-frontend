import React from 'react';
import { makeStyles } from "@mui/styles";
import {Table, TableBody, TableCell, TableFooter, TablePagination, TableRow, IconButton} from "@mui/material";
import EnhancedTableHeader from "../core/Table/EnhancedTableHeader";
import EnhancedTableToolbarSingleOption from "../core/Table/EnhancedTableToolbarSingleOption";
import * as Protected from "../../protectedAuth";
import Tooltip from "@mui/material/Tooltip";
import IntlMessages from "../../components/core/IntlMessages";
import Edit from "@mui/icons-material/Edit";
import Add from "@mui/icons-material/Add";
import List from "@mui/icons-material/List";
import Delete from "@mui/icons-material/Delete";
import TablePaginationAction from "../core/Table/TablePaginationAction";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(3),
    },
    table: {
        minWidth: 700,
    },
    tableRow: {
        cursor: 'pointer'
    },
    statusFinishedFindings:{
        color:'#FF0000',
        fontWeight:'bold'
    },
    statusInProgress:{
        color:'#c3922e',
        fontWeight:'bold'
    },
    statusFinished:{
        color:'#2ECC71',
        fontWeight:'bold'
    },
    statusNone:{
        color:'#000000',
        fontWeight:'bold'
    },
    labelCustomValuePublished: {
        fontWeight: 'bold',
        color: 'green'
    },
    labelCustomValueDraft: {
        fontWeight: 'bold'
    }
}));

const AuditChecklistsList = (props) => {

    const classes = useStyles();

    const columnData = [
        { id: 'id', numeric: false, disablePadding: false, label: 'general.id' },
        { id: 'domain', numeric: false, disablePadding: false, label: 'qms.checklist.domain' },
        { id: 'title', numeric: false, disablePadding: false, label: 'general.title' },
        { id: 'version', numeric: false, disablePadding: false, label: 'qms.checklist.versionMobile' },
        { id: 'type', numeric: false, disablePadding: false, label: 'general.type' },
        { id: 'effective', numeric: false, disablePadding: false, label: 'qms.checklist.effectiveDate' },
        { id: 'status', numeric: false, disablePadding: false, label: 'general.status'},
        { id: 'action', numeric: false, disablePadding: false, label: 'general.actions' },
    ];

    const {
        rowsPerPage,
        page,
        order,
        orderBy,
        auditChecklists,
        totalCount,
        handleChangePage,
        handleChangeRowsPerPage,
        onInputSearchChange,
        onSearchSubmit,
        searchValue,
        filtersActive,
        handleChecklistFilterClick,
        handleAuditChecklistClick,
        handleChecklistEdit,
        handleChecklistNewVersion,
        handleChecklistRevisions,
        handleChecklistNewClick,
        handleChecklistDelete,
        handleRequestSort
    } = props;

    return (
        <div>
            <EnhancedTableToolbarSingleOption
                title="qms.audits.checklists"
                onNewClick={handleChecklistNewClick}
                onFilterClick={handleChecklistFilterClick}
                filtersActive={filtersActive}
                showSearch
                searchValue={searchValue}
                onInputSearchChange={onInputSearchChange}
                onSearchSubmit={onSearchSubmit}
                searchPlaceholder="general.search.idTitle2"
                authPermissions={['PERM_AUDIT_CRUD', 'PERM_AUDIT_ENTRY']}
                tooltipNew="general.addNew"
            />
            <Table className={classes.table}>
                <EnhancedTableHeader
                    columnData={columnData}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={auditChecklists.length}
                />
                <TableBody>
                    {auditChecklists.map(item => {
                        return (
                            <TableRow
                                className={classes.tableRow}
                                key={item.auditChecklistId}
                                hover={true}>
                                <TableCell onClick={event => handleAuditChecklistClick(event, item.auditChecklistId)}>{item.abbreviation}</TableCell>
                                <TableCell onClick={event => handleAuditChecklistClick(event, item.auditChecklistId)}>
                                    {item.domain !== null ? item.domain.name : "-"}</TableCell>
                                <TableCell onClick={event => handleAuditChecklistClick(event, item.auditChecklistId)}>{item.title}</TableCell>
                                <TableCell onClick={event => handleAuditChecklistClick(event, item.auditChecklistId)}>{item.version}</TableCell>
                                <TableCell onClick={event => handleAuditChecklistClick(event, item.auditChecklistId)}>{item.auditChecklistType ? item.auditChecklistType.name : ""}</TableCell>
                                <TableCell onClick={event => handleAuditChecklistClick(event, item.auditChecklistId)}>{item.effectiveDate}</TableCell>
                                <TableCell onClick={event => handleAuditChecklistClick(event, item.auditChecklistId)}>
                                    {
                                        item.published ?
                                            <label className={classes.labelCustomValuePublished}>PUBLISHED</label>
                                        :
                                            <label className={classes.labelCustomValueDraft}>DRAFT</label>
                                    }
                                </TableCell>
                                {Protected.protectedAuth(['PERM_AUDIT_CRUD']) ?
                                    <TableCell className="nostretch">
                                        <Tooltip title={<IntlMessages id="general.edit"/>}>
                                            <>
                                                <div className="d-inline">
                                                    <IconButton aria-label="Edit"
                                                                onClick={(event) => handleChecklistEdit(event, item)}>
                                                        <Edit/>
                                                    </IconButton>
                                                </div>
                                            </>
                                        </Tooltip>
                                        <Tooltip title={<IntlMessages id="general.newRevision"/>}>
                                            <>
                                                <div className="d-inline">
                                                    <IconButton aria-label="New version"
                                                                onClick={(event) => handleChecklistNewVersion(event, item)}>
                                                        <Add/>
                                                    </IconButton>
                                                </div>
                                            </>
                                        </Tooltip>
                                        <Tooltip title={<IntlMessages id="general.revisions"/>}>
                                            <>
                                                <div className="d-inline">
                                                    <IconButton aria-label="Revisions"
                                                                onClick={(event) => handleChecklistRevisions(event, item)}>
                                                        <List/>
                                                    </IconButton>
                                                </div>
                                            </>
                                        </Tooltip>
                                        <Tooltip title={<IntlMessages id="general.delete"/>}>
                                            <>
                                                <div className="d-inline">
                                                    <IconButton aria-label="Delete"
                                                                onClick={(event) => handleChecklistDelete(event, item)}>
                                                        <Delete/>
                                                    </IconButton>
                                                </div>
                                            </>
                                        </Tooltip>
                                    </TableCell> : null}
                            </TableRow>
                        );
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            colSpan={columnData.length}
                            count={totalCount}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationAction}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}

export default AuditChecklistsList;