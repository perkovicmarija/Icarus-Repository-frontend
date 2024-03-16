import {useState} from "react";
import {Chip, Grid, TableCell, TableRow} from "@mui/material";
import {TableContainer2} from "../core/Table/TableContainer2";
import TableToolbar2, {TableToolbar2Props,} from "../core/Table/TableToolbar2";
import {ColumnDefinition} from "../core/Table/TableHeader";
import {TablePagination2Props} from "../core/Table/TablePagination2";
import {TableActions2} from "../core/Table/TableActions2";
import {Delete, Edit} from "@mui/icons-material";
import {DialogDelete2} from "../core/Dialog/DialogDelete2";
import {ForumTopic} from "../../redux/forum/forumTopics/forumTopicsApi";
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
    label: "general.date",
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
  toolbarProps: TableToolbar2Props;
  paginationProps: TablePagination2Props;
  data: ForumTopic[] | undefined;
  onEdit: (forumTopicId: string) => void;
  onDelete: (forumTopic: ForumTopic) => Promise<any>;
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
              <TableRow key={item.forumTopicId}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.userCreated.fullName}</TableCell>
                <TableCell>{item.createdFormatted}</TableCell>
                <TableCell>{item.forumSubscriptions.length}</TableCell>
                <TableCell>
                  <Grid container direction="column" spacing={1}>
                    {item.forumTopicTagJoineds.map(tag => {
                    return (
                        <Grid item xs={6} key={tag.forumTag.forumTagId}>
                          <Chip
                              label={tag.forumTag.name}
                              color="default"
                          />
                        </Grid>
                        )
                    })}
                  </Grid>
                </TableCell>
                <TableCell className="nostretch">
                  <TableActions2
                    actions={[
                      {
                        label: "general.edit",
                        Icon: Edit,
                        onClick: () => onEdit(item.forumTopicId),
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

export default ForumTopicsList;
