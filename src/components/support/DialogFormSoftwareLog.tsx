import { DialogContent, Grid } from "@mui/material";
import _ from "lodash";
import { DialogActions2 } from "../core/Dialog/DialogActions2";
import { useForm } from "react-hook-form";
import TextField2 from "../core/Fields/TextField2";
import AutocompleteMultiLargeDataset2 from "../core/Fields/AutocompleteMultiLargeDataset2";
import SwitchCustom2 from "../core/Fields/SwitchCustom2";
import { useState } from "react";

function DialogFormComment({
  initialData,
  onClose,
  onSubmit,
  //
  clients,
}: any) {
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
          onSubmit(data)
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
              name="clients"
              keyProp="clientId"
              labelProp="name"
            />
          </Grid>

          <Grid item xs={12} style={{ marginTop: "1rem" }}>
            <SwitchCustom2
              control={control}
              name="notifyAll"
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
            {initialData.supportSoftwareLogId && (
              <SwitchCustom2
                control={control}
                name="notifyUpdated"
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

export default DialogFormComment;
