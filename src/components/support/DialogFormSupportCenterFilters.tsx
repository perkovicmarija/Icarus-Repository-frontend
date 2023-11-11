import { DialogContent, Grid } from "@mui/material";
import DateTimePickerCustom2 from "../core/Fields/DateTimePickerCustom2";
import AutocompleteMultiLargeDataset2 from "../core/Fields/AutocompleteMultiLargeDataset2";
import { useForm } from "react-hook-form";
//
import { initFilters } from "../../redux/support/supportRequests/supportRequestsSlice";
import { DialogActions2 } from "../core/Dialog/DialogActions2";

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
      <DialogActions2 onClose={onClose} onClear={() => reset(initFilters)} />
    </form>
  );
}

export default DialogFormSupportCenterFilters;
