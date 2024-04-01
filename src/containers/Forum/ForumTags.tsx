import React, {useState} from 'react'
import ForumTagsComponent from "../../components/forum/ForumTagsComponent";
import {
    ForumTag,
    useCreateUpdateForumTagMutation,
    useGetForumTagsQuery
} from "../../redux/forum/forumTags/forumTagsApi";
import DialogFormForumTag from "../../components/forum/DialogFormForumTag";
import DialogFormFrame from "../../components/core/Dialog/DialogFormFrame";
import {Paper} from "@mui/material";

const ForumTags = () => {
    const [dialogForumTagsOpen, setDialogForumTagsOpen] = useState<boolean>(false);
    const [forumTag, setForumTag] = useState<ForumTag | {} | undefined>({});

    const { data: forumTags, isSuccess  } = useGetForumTagsQuery();
    const [createUpdateForumTag, { data: forumTagUpdated, isLoading, error }] = useCreateUpdateForumTagMutation();

    const handleClickForumTag = (payload) => {
        setDialogForumTagsOpen(true)
        setForumTag(payload)
    }
    return (
        <>
            <Paper>
                <ForumTagsComponent
                    forumTags={forumTags?.data}
                    onTagClick={handleClickForumTag}
                    showAdd={true}
                    selectedTags={null}
                />
            </Paper>


            <DialogFormFrame
                onClose={() => setDialogForumTagsOpen(false)}
                title={"forumTagId" in forumTag ? "forum.tags.update" : "forum.tags.create"}
                open={dialogForumTagsOpen}
            >
                <DialogFormForumTag
                    initialData={forumTag!}
                    onClose={() => setDialogForumTagsOpen(false)}
                    onSubmit={(payload: ForumTag) => createUpdateForumTag(payload).unwrap()}
                />
            </DialogFormFrame>
        </>
    )
}
export default ForumTags
