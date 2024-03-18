import {DialogContent, Grid} from "@mui/material";
import {useForm} from "react-hook-form";
import {DialogActions2} from "../core/Dialog/DialogActions2";
import TextField2 from "../core/Fields/TextField2";
import {FiltersType, initFilters} from "../../redux/forum/forumUsers/forumUsersSlice";

function DialogFormForumUserFilter({
  initialData,
  onClose,
  onSubmit,
}: {
  initialData: FiltersType;
  onClose: () => void;
  onSubmit: (payload: FiltersType) => void;
}) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: initialData,
  });

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        handleSubmit((data) => {
          onSubmit(data);
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
        </Grid>
      </DialogContent>
      <DialogActions2 onClose={onClose} onClear={() => reset(initFilters)} />
    </form>
  );
}

export default DialogFormForumUserFilter;
