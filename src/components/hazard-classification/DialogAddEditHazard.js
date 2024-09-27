import React from "react";
import { DialogContent } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { DialogActions2 } from "../core/Dialog/DialogActions2";
import TextField2 from "../core/Fields/TextField2";
import { GridContainer } from "../GridContainer";

export default function DialogAddEditHazard({
  onClose,
  onSubmit,
  initialData,
}) {
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
        <GridContainer>
          <Grid item xs={12}>
            <TextField2
              control={control}
              name={"name"}
              label="general.name"
              rules={{ required: "general.required" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField2
              multiline
              rows={4}
              control={control}
              name={"explanation"}
              label="general.explanation"
            />
          </Grid>
        </GridContainer>
      </DialogContent>

      <DialogActions2 onClose={onClose} />
    </form>
  );
}
