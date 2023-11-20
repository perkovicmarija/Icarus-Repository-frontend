import { useState } from "react";
import { DialogContent } from "@mui/material";
import Grid from "@mui/material/Grid";
import { DialogActions2 } from "../../../components/core/Dialog/DialogActions2";
import { useForm } from "react-hook-form";
import TextField2 from "../../../components/core/Fields/TextField2";
import AutocompleteMultiLargeDataset2 from "../../../components/core/Fields/AutocompleteMultiLargeDataset2";
import { Client } from "../../../redux/setting/clientsSlice";
import { toast } from "react-toastify";

const DialogAddEditFolder = ({
  initialData,
  onClose,
  onSubmit,
  clients,
  folders,
}: {
  initialData: any;
  onClose: () => void;
  onSubmit: (payload: any) => Promise<any>;
  clients: Client[];
  folders: any[];
}) => {
  const { handleSubmit, control } = useForm({
    defaultValues: initialData,
  });
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        handleSubmit((data) => {
          if (
            data.folderName !== initialData.folderName &&
            folders!.some((folder) => folder.folderName === data.folderName)
          ) {
            toast("Duplicate", { type: "error", autoClose: false });
            return;
          }

          setLoading(true);
          onSubmit(data as any)
            .then(onClose)
            .catch(() => setLoading(false));
        })(e);
      }}
    >
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField2
              control={control}
              label="documentation.folder.name"
              name="folderName"
              rules={{ required: "general.required" }}
            />
          </Grid>

          <Grid item xs={12}>
            <AutocompleteMultiLargeDataset2
              control={control}
              label="general.companies"
              name="clients"
              options={clients}
              keyProp="clientId"
              labelProp="name"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions2 onClose={onClose} loading={loading} />
    </form>
  );
};

export default DialogAddEditFolder;
