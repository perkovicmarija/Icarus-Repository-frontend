import { Button, DialogActions, DialogContent, Grid } from "@mui/material";
import IntlMessages from "../../core/IntlMessages";
import { useForm } from "react-hook-form";
import DateTimePickerCustom2 from "../../core/Fields/DateTimePickerCustom2";
import AutocompleteMultiLargeDataset2 from "../../core/Fields/AutocompleteMultiLargeDataset2";
//
import {
  AuditChecklistType,
  FiltersType,
  initFilters,
} from "../../../redux/auditChecklistsSlice";

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
      <DialogActions>
        <Button onClick={() => reset(initFilters)}>
          <IntlMessages id="action.clearAll" />
        </Button>
        <Button onClick={onClose}>
          <IntlMessages id="action.cancel" />
        </Button>
        <Button type="submit">
          <IntlMessages id="action.submit" />
        </Button>
      </DialogActions>
    </form>
  );
};

export default DialogFormChecklistFilters;
