import {useState} from "react";
import {TableCell, TableRow} from "@mui/material";
import {TableContainer2} from "../../core/Table/TableContainer2";
import TableToolbar2, {TableToolbar2Props,} from "../../core/Table/TableToolbar2";
import {ColumnDefinition} from "../../core/Table/TableHeader";
import {TablePagination2Props} from "../../core/Table/TablePagination2";
import {TableActions2} from "../../core/Table/TableActions2";
import {Delete, Edit} from "@mui/icons-material";
import {DialogDelete2} from "../../core/Dialog/DialogDelete2";
import {Client} from "../../../redux/settings/clientsApi";

const ClientList = <T,>({
  showActions,
  onClickRow,
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
  showActions?: boolean;
  onClickRow: (item: Client) => void;
}) => {
  const [dialogWarning, setDialogWarning] = useState<T | undefined>();

  const columnData: ColumnDefinition[] = [
    { id: "name", numeric: false, disablePadding: false, label: "general.name" },
    {
      id: "abbreviation",
      numeric: false,
      disablePadding: false,
      label: "general.abbreviation",
    },
    // Include the actions column only if showActions is true
    ...(showActions
        ? [
          {
            id: "actions",
            label: "general.actions",
            style: { textAlign: "center" },
          },
        ]
        : []),
  ];

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
                  key={item.clientId}
                  hover={!showActions && true}
                  onClick={!showActions ? ((e) => {
                      e.preventDefault()
                      onClickRow(item)
                  }) : () => {}}
                  style={!showActions ? { cursor: 'pointer' } : undefined}
              >
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.abbreviation}</TableCell>
                {showActions &&
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
                </TableCell>}
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

export default ClientList;
