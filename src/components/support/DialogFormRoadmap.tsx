import { useState } from "react";
import { DialogContent } from "@mui/material";
import Grid from "@mui/material/Grid";
import { DialogActions2 } from "../core/Dialog/DialogActions2";
import { useForm } from "react-hook-form";
import TextField2 from "../core/Fields/TextField2";
import SelectBasicCustom2 from "../core/Fields/SelectBasicCustom2";
import DateTimePickerCustom2 from "../core/Fields/DateTimePickerCustom2";

const statusArray = ["completed", "in-progress", "future"];

export default function DialogFormRoadmap({
  onClose,
  onSubmit,
  initialData,
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
              multiline
              rows={5}
              placeholder="form.writeDescription"
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <SelectBasicCustom2
              control={control}
              label="general.status"
              name="status"
              options={statusArray}
            />
          </Grid>

          {/* <Grid item sm={6} xs={12}>
            <DateTimePickerCustom2
              control={control}
              label="general.created"
              name="created"
            />
          </Grid> */}

          <Grid item sm={6} xs={12}>
            <DateTimePickerCustom2
              control={control}
              label="support.estimatedTime"
              name="estimatedTime"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions2 onClose={onClose} loading={loading} />
    </form>
  );
}
