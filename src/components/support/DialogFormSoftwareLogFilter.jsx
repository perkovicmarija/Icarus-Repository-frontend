import React from "react";
import { Button, DialogActions, DialogContent, Grid } from "@mui/material";
import { initFilters } from "../../redux/support/supportReducer";
import AutocompleteMultiLargeDataset2 from "../core/Fields/AutocompleteMultiLargeDataset2";
import { useForm } from "react-hook-form";

function DialogFormSoftwareLogFilter({
  initialData,
  onClose,
  onSubmit,
  clients,
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
      <DialogActions>
        <Button onClick={() => reset(initFilters)}>Clear all</Button>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </form>
  );
}

export default DialogFormSoftwareLogFilter;
