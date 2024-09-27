import { DialogContent, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { DialogActions2 } from "../core/Dialog/DialogActions2";
import TextField2 from "../core/Fields/TextField2";
import { Client } from "../../redux/settings/clientsApi";
import { ReportHazardIdentification } from "../../redux/reportHazardIdentification/reportHazardIdentificationApi";
import {
  FiltersType,
  initFilters,
} from "../../redux/reportHazardIdentification/reportHazardIdentificationSlice";

function DialogFormReportHazardIdentificationFilter({
  initialData,
  onClose,
  onSubmit,
}: {
  initialData: FiltersType;
  onClose: () => void;
  onSubmit: (payload: FiltersType) => void;
  clients: Client[];
}) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: initialData,
  });

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        handleSubmit((data) => {
          onSubmit(data as ReportHazardIdentification);
          onClose();
        })(e);
      }}
    >
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField2 control={control} label="general.title" name="title" />
          </Grid>
          <Grid item xs={12}>
            <TextField2 control={control} label="general.text" name="text" />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions2 onClose={onClose} onClear={() => reset(initFilters)} />
    </form>
  );
}

export default DialogFormReportHazardIdentificationFilter;
