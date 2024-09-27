import { DialogContent, Grid } from "@mui/material";
import { DialogActions2 } from "../core/Dialog/DialogActions2";
import { useForm } from "react-hook-form";
import TextField2 from "../core/Fields/TextField2";
import { useState } from "react";
import { Client } from "../../redux/settings/clientsApi";
import { ReportHazardIdentification } from "../../redux/reportHazardIdentification/reportHazardIdentificationApi";

function DialogFormReportHazardIdentification({
  initialData,
  onClose,
  onSubmit,
}: {
  initialData: ReportHazardIdentification | {};
  onClose: () => void;
  onSubmit: (payload: ReportHazardIdentification) => Promise<any>;
  clients: Client[];
}) {
  const { handleSubmit, control } = useForm({
    defaultValues: initialData,
  });
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        handleSubmit((data) => {
          setLoading(true);
          onSubmit(data as ReportHazardIdentification)
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
              label="general.title"
              name="title"
              rules={{ required: "general.required" }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField2
              control={control}
              label="general.text"
              name="text"
              rules={{ required: "general.required" }}
              rows={3}
              multiline
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions2 onClose={onClose} loading={loading} />
    </form>
  );
}

export default DialogFormReportHazardIdentification;
