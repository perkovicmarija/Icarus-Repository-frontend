import { useState } from "react";
import { Badge, Chip, Grid, TableCell, TableRow } from "@mui/material";
import { TableContainer2 } from "../core/Table/TableContainer2";
import TableToolbar2, { TableToolbar2Props } from "../core/Table/TableToolbar2";
import { ColumnDefinition } from "../core/Table/TableHeader";
import { TablePagination2Props } from "../core/Table/TablePagination2";
import { TableActions2 } from "../core/Table/TableActions2";
import { Delete, Edit } from "@mui/icons-material";
import { DialogDelete2 } from "../core/Dialog/DialogDelete2";
import { ForumTopic } from "../../redux/forum/forumTopics/forumTopicsApi";
import SmsIcon from "@mui/icons-material/Sms";
//

const columnData: ColumnDefinition[] = [
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "general.title",
  },
  {
    id: "createdBy",
    numeric: false,
    disablePadding: false,
    label: "general.createdBy",
  },
  {
    id: "createdFormatted",
    numeric: false,
    disablePadding: false,
    label: "general.created",
  },
  {
    id: "subscribers",
    numeric: false,
    disablePadding: false,
    label: "forum.subscribers",
  },
  {
    id: "tags",
    numeric: false,
    disablePadding: false,
    label: "forum.tags",
  },
  {
    id: "comments",
    numeric: false,
    disablePadding: false,
    label: "forum.comments",
  },
  {
    id: "actions",
    label: "general.actions",
    style: { textAlign: "center" },
  },
];

const ForumTopicsList = <T,>({
  data,
  onEdit,
  onDelete,
  //
  toolbarProps,
  paginationProps,
  loading,
}: {
  data: ForumTopic[] | undefined;
  onEdit: (forumTopicId: string) => void;
  onDelete: (forumTopic: ForumTopic) => Promise<any>;
  toolbarProps: TableToolbar2Props;
  paginationProps: TablePagination2Props;
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
          data.map((item: ForumTopic) => {
            return (
              <TableRow
                key={item.forumTopicId}
                onClick={() => onEdit(item.forumTopicId)}
                hover
                sx={{
                  cursor: "pointer",
                }}
              >
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.forumUserCreatedDisplayName}</TableCell>
                <TableCell>{item.createdFormatted}</TableCell>
                <TableCell>{item.forumTopicUserJoineds?.length}</TableCell>
                <TableCell>
                  <Grid container direction="column" spacing={1}>
                    {item.forumTags.map((tag) => {
                      return (
                        <Grid item xs={6} key={tag.forumTagId}>
                          <Chip
                            label={tag.name}
                            style={{
                              border: "1px solid #C3922E",
                              backgroundColor: "#FFF",
                              color: "#000000",
                              textTransform: "uppercase",
                            }}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </TableCell>
                <TableCell>
                  <SmsIcon />
                  <Badge
                    badgeContent={item?.forumComments.length}
                    color="error"
                  ></Badge>
                </TableCell>
                <TableCell className="nostretch">
                  <TableActions2
                    actions={[
                      {
                        label: "general.edit",
                        Icon: Edit,
                        onClick: (event) => {
                          event.stopPropagation();
                          onEdit(item.forumTopicId);
                        },
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

export default ForumTopicsList;
