import { DialogActions, DialogContent, Button, Grid } from "@mui/material";
import { FormattedMessage } from "react-intl";
import DateTimePickerCustom2 from "../core/Fields/DateTimePickerCustom2";
import AutocompleteMultiLargeDataset2 from "../core/Fields/AutocompleteMultiLargeDataset2";
import { useForm } from "react-hook-form";
//
import { initFilters } from "../../redux/support/supportRequests/supportRequestsSlice";

function DialogFormSupportCenterFilters({
  initialData,
  onClose,
  onSubmit,
  statuses,
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
          <Grid item sm={12} xs={12}>
            <DateTimePickerCustom2
              control={control}
              label="general.startDate"
              name="startDate"
            />
          </Grid>
          <Grid item xs={12}>
            <AutocompleteMultiLargeDataset2
              control={control}
              label="support.status"
              options={statuses}
              name="statuses"
              keyProp="icarusBugStatusId"
              labelProp="status"
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

export default DialogFormSupportCenterFilters;
