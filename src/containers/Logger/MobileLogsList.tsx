import TableToolbar2, {TableToolbar2Props} from "../../components/core/Table/TableToolbar2";
import {TablePagination2Props} from "../../components/core/Table/TablePagination2";
import {ColumnDefinition} from "../../components/core/Table/TableHeader";
import {TableContainer2} from "../../components/core/Table/TableContainer2";
import {TableCell, TableRow} from "@mui/material";
import {MobileLog} from "../../redux/loggerApi";

function MobileLogsList<MobileLog>({
    data,
    toolbarProps,
    paginationProps,
    loading,
}: {
    data: MobileLog[] | undefined
    toolbarProps: TableToolbar2Props
    paginationProps: TablePagination2Props
    loading: boolean
}) {
    const columnData: ColumnDefinition[] = [
        { id: "id", numeric: false, disablePadding: false, label: "general.id" },
        {
            id: "appVersion",
            numeric: false,
            disablePadding: false,
            label: "logger.appVersion",
        },
        {
            id: "client",
            numeric: false,
            disablePadding: false,
            label: "general.client",
        },
        {
            id: "dateCreatedFormatted",
            numeric: false,
            disablePadding: false,
            label: "general.created",
        },
        {
            id: "dateLogFormatted",
            numeric: false,
            disablePadding: false,
            label: "logger.dateOfLog",
        },
        {
            id: "logLevel",
            numeric: false,
            disablePadding: false,
            label: "logger.logLevel",
        },
        {
            id: "message",
            numeric: false,
            disablePadding: false,
            label: "general.message",
        },
        {
            id: "osVersion",
            numeric: false,
            disablePadding: false,
            label: "logger.osVersion",
        },
        {
            id: "sessionId",
            numeric: false,
            disablePadding: false,
            label: "logger.sessionId",
        },
        {
            id: "source",
            numeric: false,
            disablePadding: false,
            label: "general.source",
        },
        {
            id: "userCreatedId",
            numeric: false,
            disablePadding: false,
            label: "form.user",
        },
    ]
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
                    data.map((item: MobileLog, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell>{item.loggerMobileAppId}</TableCell>
                                <TableCell>{item.appVersion}</TableCell>
                                <TableCell>{item.client}</TableCell>
                                <TableCell>{item.dateCreatedFormatted}</TableCell>
                                <TableCell>{item.dateLogFormatted}</TableCell>
                                <TableCell>{item.logLevel}</TableCell>
                                <TableCell>{item.message}</TableCell>
                                <TableCell>{item.osVersion}</TableCell>
                                <TableCell>{item.sessionId}</TableCell>
                                <TableCell>{item.source}</TableCell>
                                <TableCell>{item.userCreatedId}</TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableContainer2>
        </>
    )
}

export default MobileLogsList;
