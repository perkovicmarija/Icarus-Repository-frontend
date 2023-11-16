import { useState } from "react";
import { DialogContent, Grid } from "@mui/material";
import withValidation from "../../components/core/HOC/withValidation";
import { DialogActions2 } from "../../components/core/Dialog/DialogActions2";
import { useForm } from "react-hook-form";
import TextField2 from "../../components/core/Fields/TextField2";

function ForgotPwdDialogForm({ onClose, onSubmit }: any) {
  const { handleSubmit, control } = useForm({
    defaultValues: {},
  });
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        handleSubmit((data) => {
          setLoading(true);
          onSubmit(data as any)
            //.then(onClose)
            .catch(() => setLoading(false));
        })(e);
      }}
    >
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            New password will be sent to your email
          </Grid>

          <Grid item xs={12}>
            <TextField2
              control={control}
              label="Enter your email"
              name="email"
              rules={{
                required: "general.required",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Email not in correct format",
                },
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions2 onClose={onClose} loading={loading} />
    </form>
  );
}

export default withValidation(ForgotPwdDialogForm);
