import { useState } from "react";
import {
  Button,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useController, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import TextField2 from "../core/Fields/TextField2";
import { AccountCircleRounded, Close } from "@mui/icons-material";
import DialogFormFrame from "../core/Dialog/DialogFormFrame";
import DialogFormAttachFile from "../attachments/DialogFormAttachFile";

const initialForumComment = {
  forumCommentId: "",
  forumUserCreatedDisplayName: "",
  content: "",
  created: null,
  createdFormatted: "",
  forumLikes: [],
  parentCommentId: null,
  replies: [],
  attachments: [],
};

export const ForumCommentNew = ({ onSubmit }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: initialForumComment,
  });

  const { field: attachmentsField } = useController({
    control,
    name: "attachments",
  });

  const [loading, setLoading] = useState(false);

  const [attachmentDialog, setAttachmentDialog] = useState<any>();

  return (
    <CardContent>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          handleSubmit((data) => {
            setLoading(true);
            onSubmit(data).then(() => {
              setLoading(false);
              reset(initialForumComment);
            });
          })(e);
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ display: "flex", alignItems: "center" }}>
            <AccountCircleRounded
              fontSize="large"
              style={{ marginRight: "0.5rem" }}
            />
            <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
              <FormattedMessage id="forum.comments.add" />
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ paddingTop: "0.5rem" }}>
            <TextField2
              control={control}
              name="content"
              multiline
              rows={3}
              placeholder="forum.typeHere"
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              paddingTop: "0.5rem",
              display: "flex",
              flexDirection: "column",
              rowGap: "0.0rem",
            }}
          >
            {attachmentsField.value.map((file, index) => (
              <div
                key={file.path}
                style={{ display: "flex", alignItems: "center" }}
              >
                <div>{file.path}</div>
                <IconButton
                  onClick={() => {
                    const copy = [...attachmentsField.value];
                    copy.splice(index, 1);
                    attachmentsField.onChange(copy);
                  }}
                  style={{ marginLeft: "1rem", color: "red", padding: "6px" }}
                >
                  <Close style={{ verticalAlign: "middle" }} />
                </IconButton>
              </div>
            ))}
          </Grid>
          <Grid item xs={12} style={{ display: "flex", columnGap: "1rem" }}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              type="submit"
            >
              <FormattedMessage id="forum.comment" />
            </Button>

            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => setAttachmentDialog({})}
            >
              <FormattedMessage id="attachments.new" />
            </Button>
          </Grid>
        </Grid>
      </form>

      <DialogFormFrame
        onClose={() => setAttachmentDialog(undefined)}
        title="attachments.label"
        open={attachmentDialog}
      >
        <DialogFormAttachFile
          hideDescription
          onClose={() => setAttachmentDialog(undefined)}
          onSubmit={(file) => {
            setAttachmentDialog(undefined);
            console.log(file);
            attachmentsField.onChange([...attachmentsField.value, file]);

            /* let viewModel = {
              files: [file],
              data: JSON.stringify(viewModelReportChat),
            }; */
          }}
          maxAttachmentSize={20000}
        />
      </DialogFormFrame>
    </CardContent>
  );
};
