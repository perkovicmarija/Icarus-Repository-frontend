import React, {useState} from 'react'
import {ColumnDefinition} from "../core/Table/TableHeader";
import TableToolbar2, {TableToolbar2Props} from "../core/Table/TableToolbar2";
import {TablePagination2Props} from "../core/Table/TablePagination2";
import {TableContainer2} from "../core/Table/TableContainer2";
import {TableActions2} from "../core/Table/TableActions2";
import {DialogDelete2} from "../core/Dialog/DialogDelete2";
import {ForumUser} from "../../redux/forum/forumUsers/forumUsersApi";
import {TableCell, TableRow} from "@mui/material";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import IntlMessages from "../core/IntlMessages";

const columnData: ColumnDefinition[] = [
    {
        id: "displayName",
        numeric: false,
        disablePadding: false,
        label: "forum.displayName",
    },
    {
        id: "client",
        numeric: false,
        disablePadding: false,
        label: "general.client",
    },
    {
        id: "email",
        numeric: false,
        disablePadding: false,
        label: "general.email",
    },
    {
        id: "fullName",
        numeric: false,
        disablePadding: false,
        label: "forum.fullName",
    },
    {
        id: "deactivated",
        numeric: false,
        disablePadding: false,
        label: "general.active",
    },
    {
        id: "actions",
        label: "general.actions",
        style: { textAlign: "center" },
    },
];

const ForumUsersList = <T,>({
                                        data,
                                        onEdit,
                                        //
                                        toolbarProps,
                                        paginationProps,
                                        loading,
                                    }: {
    toolbarProps: TableToolbar2Props;
    paginationProps: TablePagination2Props;
    data: ForumUser[] | undefined;
    onEdit: (item: T) => void;
    loading: boolean;
}) => {

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
                            <TableRow key={item.forumUserId} hover={true}>
                                <TableCell>{item.displayName}</TableCell>
                                <TableCell>{item.client?.name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.fullName}</TableCell>
                                <TableCell>{item.deactivated ?
                                    <IntlMessages id="general.no"/> :
                                    <IntlMessages id="general.yes"/>
                                }
                                </TableCell>
                                <TableCell className="nostretch">
                                    <TableActions2
                                        actions={[
                                            {
                                                label: "general.edit",
                                                Icon: Edit,
                                                onClick: () => onEdit(item),
                                            }
                                        ]}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
            </TableContainer2>

        </>
    );
};
export default ForumUsersList
