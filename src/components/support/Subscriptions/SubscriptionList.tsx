import { useState } from "react";
import { TableCell, TableRow } from "@mui/material";
import { TableContainer2 } from "../../core/Table/TableContainer2";
import TableToolbar2, {
  TableToolbar2Props,
} from "../../core/Table/TableToolbar2";
import { ColumnDefinition } from "../../core/Table/TableHeader";
import { TablePagination2Props } from "../../core/Table/TablePagination2";
import { TableActions2 } from "../../core/Table/TableActions2";
import { Delete, Edit } from "@mui/icons-material";
import { DialogDelete2 } from "../../core/Dialog/DialogDelete2";
//

const columnData: ColumnDefinition[] = [
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "general.email",
  },
  {
    id: "description",
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

const SubscriptionList = <T,>({
  data,
  onEdit,
  onDelete,
  //
  toolbarProps,
  paginationProps,
  loading,
}: {
  toolbarProps: TableToolbar2Props;
  paginationProps: TablePagination2Props;
  data: T[] | undefined;
  onEdit: (item: T) => void;
  onDelete: (item: T) => Promise<any>;
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
              <TableRow key={item.supportSoftwareLogSubscriptionId} hover={true}>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.client?.abbreviation}</TableCell>
                <TableCell className="nostretch">
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
                        onClick: () => setDialogWarning(item),
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

export default SubscriptionList;
