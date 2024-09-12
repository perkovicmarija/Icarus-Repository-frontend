import { Edit, Delete } from "@mui/icons-material";
import { TableRow, TableCell } from "@mui/material";
import { TableActions2 } from "../../components/core/Table/TableActions2";
import { TableContainer2 } from "../../components/core/Table/TableContainer2";
import { ColumnDefinition } from "../../components/core/Table/TableHeader";
import { TablePagination2Props } from "../../components/core/Table/TablePagination2";
import TableToolbar2, {
  TableToolbar2Props,
} from "../../components/core/Table/TableToolbar2";
import { useState } from "react";
import { DialogDelete2 } from "../../components/core/Dialog/DialogDelete2";
import { Report } from "../../redux/report/reportApi";

const columnData: ColumnDefinition[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "general.id",
  },
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "general.title",
  },
  {
    id: "eventDescription",
    numeric: false,
    disablePadding: false,
    label: "general.eventDescription",
  },
  {
    id: "airportDeparture",
    numeric: false,
    disablePadding: false,
    label: "general.airportDeparture",
  },
  {
    id: "airportDestination",
    label: "general.airportDestination",
    numeric: false,
    disablePadding: false,
  },
  {
    id: "flightNumber",
    label: "general.flightNumber",
    numeric: false,
    disablePadding: false,
  },
  {
    id: "aircraft",
    label: "general.aircraft",
    numeric: false,
    disablePadding: false,
  },
  {
    id: "flightPhase",
    label: "general.flightPhase",
    numeric: false,
    disablePadding: false,
  },
  {
    id: "reportHazardIdentification",
    label: "general.hazard",
    numeric: false,
    disablePadding: false,
  },
];

const ReportList = <T,>({
  data,
  onEdit,
  onDelete,
  toolbarProps,
  paginationProps,
  loading,
  onItemClick,
}: {
  toolbarProps: TableToolbar2Props;
  paginationProps: TablePagination2Props;
  data: Report[] | undefined;
  onEdit: (item: T) => void;
  onDelete: (item: T) => Promise<any>;
  onItemClick: (item: T) => void;
  loading: boolean;
}) => {
  const [dialogWarning, setDialogWarning] = useState<T | undefined>();

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
              <TableRow
                key={item.reportId}
                hover={true}
                onClick={() => onItemClick(item.reportId)}
              >
                <TableCell>{item.reportId}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.eventDescription}</TableCell>
                <TableCell>{item.airportDeparture}</TableCell>
                <TableCell>{item.airportDestination}</TableCell>
                <TableCell>{item.flightNumber}</TableCell>
                <TableCell>{item.aircraft}</TableCell>
                <TableCell>{item.flightPhase}</TableCell>
                <TableCell>{item.reportHazardIdentification?.hazardClassification?.name}</TableCell>
                <TableCell
                  className="nostretch"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <TableActions2
                    actions={[
                      {
                        label: "general.edit",
                        Icon: Edit,
                        onClick: () => onEdit(item),
                      },
                      {
                        label: "general.delete",
                        Icon: Delete,
                        onClick: (event) => {
                          event.stopPropagation();
                          setDialogWarning(item);
                        },
                        color: "error",
                      },
                    ]}
                  />
                </TableCell>
              </TableRow>
            );
          })}
      </TableContainer2>

      <DialogDelete2
        data={dialogWarning}
        onSubmit={onDelete}
        onClose={() => setDialogWarning(undefined)}
      />
    </>
  );
};
export default ReportList;
