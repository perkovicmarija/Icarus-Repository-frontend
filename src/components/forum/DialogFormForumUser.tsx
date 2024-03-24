import {DialogContent, Grid} from "@mui/material";
import {DialogActions2} from "../core/Dialog/DialogActions2";
import {useForm} from "react-hook-form";
import TextField2 from "../core/Fields/TextField2";
import {useState} from "react";
import {Client} from "../../redux/settings/clientsApi";
import {ForumUser} from "../../redux/forum/forumUsers/forumUsersApi";
import SelectCustom2 from "../core/Fields/SelectCustom2";
import SwitchCustom2 from "../core/Fields/SwitchCustom2";

function DialogFormForumUser({
  initialData,
  onClose,
  onSubmit,
  //
  clients,
}: {
  initialData: ForumUser | {};
  onClose: () => void;
  onSubmit: (payload: ForumUser) => Promise<any>;
  clients: Client[];
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
            <TextField2
              control={control}
              label="forum.displayName"
              name="displayName"
              rules={{ required: "general.required" }}
            />
          </Grid>

          <Grid item xs={12}>
            <SelectCustom2
                labelProp="name"
                control={control}
                label="general.company"
                options={clients}
                name="client"
                keyProp="clientId"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField2
                control={control}
                label="general.email"
                name="email"
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField2
                control={control}
                label="form.name"
                name="name"
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField2
                control={control}
                label="form.surname"
                name="surname"
            />
          </Grid>

          <Grid item xs={12}>
            <SwitchCustom2
                control={control}
                label="client.deactivated"
                name="deactivated"
            />
          </Grid>

        </Grid>
      </DialogContent>
      <DialogActions2 onClose={onClose} loading={loading} />
    </form>
  );
}

export default DialogFormForumUser;
