import React, {useState} from 'react'
import {ColumnDefinition} from "../core/Table/TableHeader";
import TableToolbar2, {TableToolbar2Props} from "../core/Table/TableToolbar2";
import {TablePagination2Props} from "../core/Table/TablePagination2";
import {TableContainer2} from "../core/Table/TableContainer2";
import {TableActions2} from "../core/Table/TableActions2";
import {DialogDelete2} from "../core/Dialog/DialogDelete2";
import {TableCell, TableRow} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import {ForumTopicUserJoined} from "../../redux/forum/forumUsers/forumTopicUsersApi";

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
    id: "actions",
    label: "general.actions",
    style: {textAlign: "center"},
  },
];

const ForumTopicSubscribersList = <T, >({
                                          data,
                                          onDelete,
                                          //
                                          toolbarProps,
                                          paginationProps,
                                          loading,
                                        }: {
  toolbarProps: TableToolbar2Props;
  paginationProps: TablePagination2Props;
  data: ForumTopicUserJoined[] | undefined;
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
          data.map((item: ForumTopicUserJoined) => {
            return (
              <TableRow key={item.forumUserCreated.forumUserId} hover={true}>
                <TableCell>{item.forumUserCreated.displayName}</TableCell>
                <TableCell>{item.forumUserCreated.client?.name}</TableCell>
                <TableCell>{item.forumUserCreated.fullName}</TableCell>
                <TableCell>{item.forumUserCreated.email}</TableCell>
                <TableCell className="nostretch">
                  <TableActions2
                    actions={[
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
export default ForumTopicSubscribersList
