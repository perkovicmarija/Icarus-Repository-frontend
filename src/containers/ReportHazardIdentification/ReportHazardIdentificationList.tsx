import { Edit, Delete } from "@mui/icons-material";
import { TableRow, TableCell } from "@mui/material";
import { TableActions2 } from "../../components/core/Table/TableActions2";
import { TableContainer2 } from "../../components/core/Table/TableContainer2";
import { ColumnDefinition } from "../../components/core/Table/TableHeader";
import { TablePagination2Props } from "../../components/core/Table/TablePagination2";
import TableToolbar2, {
  TableToolbar2Props,
} from "../../components/core/Table/TableToolbar2";
import { ReportHazardIdentification } from "../../redux/reportHazardIdentification/reportHazardIdentificationApi";
import { useState } from "react";
import { DialogDelete2 } from "../../components/core/Dialog/DialogDelete2";

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
    id: "text",
    numeric: false,
    disablePadding: false,
    label: "general.text",
  },
  {
    id: "actions",
    label: "general.actions",
    style: { textAlign: "center" },
  },
];

const ReportHazardIdentificationList = <T,>({
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
  data: ReportHazardIdentification[] | undefined;
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
                key={item.reportHazardIdentificationId}
                hover={true}
                onClick={() => onItemClick(item.reportHazardIdentificationId)}
              >
                <TableCell>{item.reportHazardIdentificationId}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.text}</TableCell>
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
export default ReportHazardIdentificationList;
