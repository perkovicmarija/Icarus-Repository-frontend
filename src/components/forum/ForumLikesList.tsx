import React, {useState} from 'react'
import {ColumnDefinition} from "../core/Table/TableHeader";
import TableToolbar2, {TableToolbar2Props} from "../core/Table/TableToolbar2";
import {TablePagination2Props} from "../core/Table/TablePagination2";
import {TableContainer2} from "../core/Table/TableContainer2";
import {TableActions2} from "../core/Table/TableActions2";
import {DialogDelete2} from "../core/Dialog/DialogDelete2";
import {TableCell, TableRow} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import {ForumLike} from "../../redux/forum/forumLikes/forumLikesApi";
import {useParams} from "react-router-dom";

const columnData: ColumnDefinition[] = [
  {
    id: "forumTopicId",
    numeric: false,
    disablePadding: false,
    label: "forum.topic",
  },
  {
    id: "dateCreated",
    numeric: false,
    disablePadding: false,
    label: "general.created",
  },
  {
    id: "userCreated",
    numeric: false,
    disablePadding: false,
    label: "general.createdBy",
  },
  {
    id: "actions",
    label: "general.actions",
    style: {textAlign: "center"},
  },
];

const ForumLikesList = <T, >({
                               data,
                               onDelete,
                               //
                               toolbarProps,
                               paginationProps,
                               loading,
                             }: {
  toolbarProps: TableToolbar2Props;
  paginationProps: TablePagination2Props;
  data: ForumLike[] | undefined;
  onDelete: (item: T) => Promise<any>;
  loading: boolean;
}) => {
  const {forumTopicId} = useParams<{ forumTopicId: string }>();
  
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
          data.map((item: ForumLike) => {
            return (
              <TableRow key={item.forumLikeId}>
                <TableCell>{forumTopicId}</TableCell>
                <TableCell>{item.createdFormatted}</TableCell>
                <TableCell>{item.forumUserCreatedDisplayName}</TableCell>
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
export default ForumLikesList
