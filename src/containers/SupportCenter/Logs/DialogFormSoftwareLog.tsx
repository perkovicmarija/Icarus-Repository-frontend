import { DialogContent, Grid } from "@mui/material";
import { DialogActions2 } from "../../../components/core/Dialog/DialogActions2";
import { useForm } from "react-hook-form";
import TextField2 from "../../../components/core/Fields/TextField2";
import AutocompleteMultiLargeDataset2 from "../../../components/core/Fields/AutocompleteMultiLargeDataset2";
import SwitchCustom2 from "../../../components/core/Fields/SwitchCustom2";
import { useState } from "react";
//
import { SupportLog } from "../../../redux/support/supportLogsApi";
import { Client } from "../../../redux/clientsApi";

function DialogFormSoftwareLog({
  initialData,
  onClose,
  onSubmit,
  //
  clients,
}: {
  initialData: SupportLog | {};
  onClose: () => void;
  onSubmit: (payload: SupportLog) => Promise<any>;
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
          onSubmit(data as SupportLog)
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
              label="general.description"
              name="description"
              multiline={true}
              rows={5}
              placeholder="form.writeDescription"
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

          <Grid item xs={12} style={{ marginTop: "1rem" }}>
            <SwitchCustom2
              control={control}
              name="notifyAllClientsByEmail"
              inlineLabel="support.notification.notifyAll"
            />
            {/* <FormControlLabel
                control={<Checkbox checked={notifyByEmail.notifyAll} />}
                label={<IntlMessages id="support.notification.notifyAll" />}
                name="notifyAll"
                onChange={handleNotifyByEmail}
              /> */}
          </Grid>

          <Grid item xs={12}>
            {"supportSoftwareLogId" in initialData && (
              <SwitchCustom2
                control={control}
                name="notifyUpdatedClientsByEmail"
                inlineLabel="support.notification.notifyUpdated"
              />
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions2 onClose={onClose} loading={loading} />
    </form>
  );
}

export default DialogFormSoftwareLog;
