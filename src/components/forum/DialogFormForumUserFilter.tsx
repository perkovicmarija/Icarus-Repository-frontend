import {DialogContent, Grid} from "@mui/material";
import {useForm} from "react-hook-form";
import {DialogActions2} from "../core/Dialog/DialogActions2";
import TextField2 from "../core/Fields/TextField2";
import {FiltersType, initFilters} from "../../redux/forum/forumUsers/forumUsersSlice";
import {ForumUser} from "../../redux/forum/forumUsers/forumUsersApi";
import SelectCustom2 from "../core/Fields/SelectCustom2";
import {Client} from "../../redux/settings/clientsApi";
import SwitchCustom2 from "../core/Fields/SwitchCustom2";

function DialogFormForumUserFilter({
  initialData,
  onClose,
  onSubmit,
  clients
}: {
  initialData: FiltersType;
  onClose: () => void;
  onSubmit: (payload: FiltersType) => void;
  clients: Client[]
}) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: initialData,
  });

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        handleSubmit((data) => {
          onSubmit(data as ForumUser);
          onClose();
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField2
                control={control}
                label="general.email"
                name="email"
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
            <SwitchCustom2
                control={control}
                label="client.deactivated"
                name="deactivated"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions2 onClose={onClose} onClear={() => reset(initFilters)} />
    </form>
  );
}

export default DialogFormForumUserFilter;
