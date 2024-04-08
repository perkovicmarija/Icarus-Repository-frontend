import {DialogContent, Grid} from "@mui/material";
import {DialogActions2} from "../core/Dialog/DialogActions2";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {ForumUser} from "../../redux/forum/forumUsers/forumUsersApi";
import SelectCustom2 from "../core/Fields/SelectCustom2";

function DialogFormForumTopicSubscriber({
  initialData,
  onClose,
  onSubmit,
  //
  forumUsers,
}: {
  initialData: ForumUser | {};
  onClose: () => void;
  onSubmit: (payload: ForumUser) => Promise<any>;
  forumUsers: ForumUser[];
}) {
  const { handleSubmit, control } = useForm({
    defaultValues: initialData,
  });
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        handleSubmit((data) => {
          setLoading(true);
          onSubmit(data as ForumUser)
            .then(onClose)
            .catch(() => setLoading(false));
        })(e);
      }}
    >
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SelectCustom2
                labelProp="displayName"
                control={control}
                label="forum.user"
                options={forumUsers}
                name="forumUser"
                keyProp="forumUserId"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions2 onClose={onClose} loading={loading} />
    </form>
  );
}

export default DialogFormForumTopicSubscriber;
