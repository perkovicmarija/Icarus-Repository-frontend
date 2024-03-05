import { DialogContent, Grid } from "@mui/material";
import { initFilters } from "../../../redux/support/subscriptions/softwareLogSubscriptionSlice";
import AutocompleteMultiLargeDataset2 from "../../../components/core/Fields/AutocompleteMultiLargeDataset2";
import { useForm } from "react-hook-form";
import { DialogActions2 } from "../../../components/core/Dialog/DialogActions2";
import { FiltersType } from "../../../redux/support/subscriptions/softwareLogSubscriptionSlice";
import { Client } from "../../../redux/clientsApi";
import TextField2 from "../../../components/core/Fields/TextField2";

function DialogFormSubscriptionFilter({
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
            <TextField2
                control={control}
                label="general.email"
                name="email"
            />
          </Grid>

          <Grid item xs={12}>
            <AutocompleteMultiLargeDataset2
                control={control}
                label="general.companies"
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

export default DialogFormSubscriptionFilter;
