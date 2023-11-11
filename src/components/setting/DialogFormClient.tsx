import { DialogContent, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import TextField2 from "../core/Fields/TextField2";
import SwitchCustom2 from "../core/Fields/SwitchCustom2";
import { DialogActions2 } from "../core/Dialog/DialogActions2";

const DialogFormClient = ({ initialData, onClose, onSubmit }: any) => {
  const { handleSubmit, control } = useForm({
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
        <Grid container style={{ rowGap: "1.5rem" }}>
          <Grid item xs={12}>
            <TextField2
              control={control}
              label="client.clientName"
              name="name"
              defaultValue=""
              rules={{ required: "general.required" }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField2
              control={control}
              label="client.abbreviation"
              name="abbreviation"
              defaultValue=""
              rules={{ required: "general.required" }}
            />
          </Grid>

          {!initialData.clientId && (
            <Grid item xs={12}>
              <SwitchCustom2
                control={control}
                label="client.deactivated"
                name="deactivated"
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions2 onClose={onClose} submitText={!initialData.clientId ? "action.add" : "general.update"} />
    </form>
  );
};

export default DialogFormClient;
