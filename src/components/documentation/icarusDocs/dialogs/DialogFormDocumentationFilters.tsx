import { DialogContent } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { DialogActions2 } from "../../../core/Dialog/DialogActions2";
import AutocompleteMultiLargeDataset2 from "../../../core/Fields/AutocompleteMultiLargeDataset2";
import { FiltersType, initFilters } from "../../../../redux/icarusDocs/icarusDocsSlice";
import { Client } from "../../../../redux/settings/clientsApi";

function DialogFormDocumentationFilters({
  initialData,
  onClose,
  onSubmit,
  clients,
}: {
  initialData: FiltersType;
  onClose: () => void;
  onSubmit: (payload: any) => void;
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
              label="general.companies"
              name="companies"
              options={clients}
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

export default DialogFormDocumentationFilters;
