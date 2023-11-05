import { DialogActions, DialogContent, Button, Grid } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useForm } from "react-hook-form";
import { initFilters } from "../../redux/user/userReducer";
import AutocompleteMultiLargeDataset2 from "../core/Fields/AutocompleteMultiLargeDataset2";
import SwitchCustom2 from "../core/Fields/SwitchCustom2";

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

      <DialogActions>
        <Button onClick={() => reset(initFilters)}>
          <FormattedMessage id="action.clearAll" />
        </Button>
        <Button onClick={onClose}>
          <FormattedMessage id="action.cancel" />
        </Button>
        <Button type="submit">
          <FormattedMessage id="action.submit" />
        </Button>
      </DialogActions>
    </form>
  );
}

export default DialogFormUserFilters;
