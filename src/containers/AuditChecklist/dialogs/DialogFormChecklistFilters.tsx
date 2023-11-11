import { DialogContent, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import DateTimePickerCustom2 from "../../../components/core/Fields/DateTimePickerCustom2";
import AutocompleteMultiLargeDataset2 from "../../../components/core/Fields/AutocompleteMultiLargeDataset2";
//
import {
  AuditChecklistType,
  FiltersType,
  initFilters,
} from "../../../redux/auditChecklistsSlice";
import { DialogActions2 } from "../../../components/core/Dialog/DialogActions2";

const DialogFormChecklistFilters = ({
  initialData,
  onClose,
  onSubmit,
  checklistTypes,
}: {
  initialData: FiltersType;
  onClose: () => void;
  onSubmit: (payload: FiltersType) => void;
  checklistTypes: AuditChecklistType[];
}) => {
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
          <Grid item sm={6} xs={12}>
            <DateTimePickerCustom2
              control={control}
              label="general.startDate"
              name="startDate"
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <DateTimePickerCustom2
              control={control}
              label="general.endDate"
              name="endDate"
            />
          </Grid>
          <Grid item xs={12}>
            <AutocompleteMultiLargeDataset2
              control={control}
              label="general.type"
              name="checklistTypes"
              options={checklistTypes}
              keyProp="auditChecklistTypeId"
              labelProp="name"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions2 onClose={onClose} onClear={() => reset(initFilters)} />
    </form>
  );
};

export default DialogFormChecklistFilters;
