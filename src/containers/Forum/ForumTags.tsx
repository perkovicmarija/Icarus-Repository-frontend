import { useState } from "react";
import ForumTagsComponent from "../../components/forum/ForumTagsComponent";
import {
  ForumTag,
  useCreateUpdateForumTagMutation,
  useGetForumTagsQuery,
} from "../../redux/forum/forumTags/forumTagsApi";
import DialogFormForumTag from "../../components/forum/DialogFormForumTag";
import DialogFormFrame from "../../components/core/Dialog/DialogFormFrame";
import { Paper } from "@mui/material";
import { handleNotify } from "../../helpers/utility";
import { ProgressCustom } from "../../components/core/ProgressCustom";

const ForumTags = () => {
  const [dialogForumTagsOpen, setDialogForumTagsOpen] =
    useState<boolean>(false);
  const [forumTag, setForumTag] = useState<ForumTag | {} | undefined>();

  const { data: forumTags, isFetching } = useGetForumTagsQuery();
  const [createUpdateForumTag, { data: forumTagUpdated, isLoading, error }] =
    useCreateUpdateForumTagMutation();

  const handleClickForumTag = (payload: ForumTag | {}) => {
    setDialogForumTagsOpen(true);
    setForumTag(payload);
  };

  if (!forumTags?.data) {
    return <ProgressCustom />;
  }

  return (
    <>
      <Paper>
        <ForumTagsComponent
          options={forumTags.data}
          onTagClick={handleClickForumTag}
          showAdd={true}
          selectedTags={null}
          isFetching={isFetching}
        />
      </Paper>

      {forumTag && (
        <DialogFormFrame
          onClose={() => setDialogForumTagsOpen(false)}
          title={
            "forumTagId" in forumTag ? "forum.tags.update" : "forum.tags.create"
          }
          open={dialogForumTagsOpen}
        >
          <DialogFormForumTag
            initialData={forumTag!}
            onClose={() => setDialogForumTagsOpen(false)}
            onSubmit={(payload: ForumTag): Promise<void> =>
              createUpdateForumTag(payload)
                .unwrap()
                .then((result) => {
                  handleNotify(result);
                })
            }
          />
        </DialogFormFrame>
      )}
    </>
  );
};
export default ForumTags;
