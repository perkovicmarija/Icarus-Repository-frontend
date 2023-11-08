import { DialogContent, Grid } from "@mui/material";
import { DialogActions2 } from "../core/Dialog/DialogActions2";
import { useForm } from "react-hook-form";
import TextField2 from "../core/Fields/TextField2";
import { useState } from "react";
import AutocompleteLargeDataset2 from "../core/Fields/AutocompleteLargeDataset2";
import { SupportRequest } from "../../redux/support/supportRequests/supportRequestsSlice";

function DialogFormSupportItem({
  initialData,
  onClose,
  onSubmit,
  //
  modules,
  levels,
}: {
  initialData: SupportRequest | {};
  onClose: () => void;
  onSubmit: (payload: SupportRequest) => Promise<any>;
  modules: any[];
  levels: any[];
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
          onSubmit(data as SupportRequest)
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
              name="bug"
              rules={{ required: "general.required" }}
              rows="5"
              multiline
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <AutocompleteLargeDataset2
              control={control}
              label="support.module"
              name="module"
              options={modules}
              keyProp="supportBugModuleId"
              labelProp="name"
              rules={{ required: "general.required" }}
            />
          </Grid>

          <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
            <AutocompleteLargeDataset2
              control={control}
              label="support.severity"
              name="level"
              options={levels}
              keyProp="supportBugLevelId"
              labelProp="level"
              rules={{ required: "general.required" }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions2 onClose={onClose} loading={loading} />
    </form>
  );
}

export default DialogFormSupportItem;
