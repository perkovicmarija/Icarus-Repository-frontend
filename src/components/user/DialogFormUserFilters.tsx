import { DialogContent, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { initFilters } from "../../redux/user/userReducer";
import AutocompleteMultiLargeDataset2 from "../core/Fields/AutocompleteMultiLargeDataset2";
import SwitchCustom2 from "../core/Fields/SwitchCustom2";
import { DialogActions2 } from "../core/Dialog/DialogActions2";

function DialogFormUserFilters({
  initialData,
  onClose,
  onSubmit,
  userRoles,
}: any) {
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
            <AutocompleteMultiLargeDataset2
              control={control}
              label="general.roleName"
              options={userRoles}
              name="userRoles"
              keyProp="userRoleId"
              labelProp="name"
            />
          </Grid>

          <Grid item xs={12}>
            <SwitchCustom2
              control={control}
              label="user.showDeactivated"
              name="showDeactivated"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions2 onClose={onClose} onClear={() => reset(initFilters)} />
    </form>
  );
}

export default DialogFormUserFilters;
