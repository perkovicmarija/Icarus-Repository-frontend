import { DialogContent, Grid } from "@mui/material";
import { initFilters } from "../../redux/support/supportReducer";
import AutocompleteMultiLargeDataset2 from "../core/Fields/AutocompleteMultiLargeDataset2";
import { useForm } from "react-hook-form";
import { DialogActions2 } from "../core/Dialog/DialogActions2";
import { FiltersType } from "../../redux/support/supportLogs/supportLogsSlice";
import { Client } from "../../../api2/clientsApi";

function DialogFormSoftwareLogFilter({
  initialData,
  onClose,
  onSubmit,
  clients,
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
              label="client.clientName"
              options={clients}
              name="selectedClients"
              keyProp="clientId"
              labelProp="name"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions2 onClose={onClose} onClear={() => reset(initFilters)} />
    </form>
  );
}

export default DialogFormSoftwareLogFilter;
