import { DialogContent, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { DialogActions2 } from "../../core/Dialog/DialogActions2";
//
import { initFilters, FiltersType } from "../../../redux/support/roadmap/roadmapSlice";
import TextField2 from "../../core/Fields/TextField2";
import SelectBasicCustom2 from "../../core/Fields/SelectBasicCustom2";

const statusArray = ["in-progress", "future", "completed"];

function DialogFormRoadmapLogFilter({
  initialData,
  onClose,
  onSubmit,
}: {
  initialData: FiltersType;
  onClose: () => void;
  onSubmit: (payload: FiltersType) => void;
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
          <Grid item xs={6}>
            <TextField2
              control={control}
              label="general.title"
              name="title"
              placeholder="general.title"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField2
              control={control}
              label="general.description"
              name="description"
              placeholder="general.description"
            />
          </Grid>

          <Grid item xs={6}>
            <SelectBasicCustom2
              control={control}
              label="general.status"
              name="status"
              options={statusArray}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions2 onClose={onClose} onClear={() => reset(initFilters)} />
    </form>
  );
}

export default DialogFormRoadmapLogFilter;
