import { DialogContent, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
//
import { HazardClassification } from "../../redux/hazardClassification/hazardClassificationApi";
import { DialogActions2 } from "../../components/core/Dialog/DialogActions2";
import AutocompleteMultiLargeDataset2 from "../../components/core/Fields/AutocompleteMultiLargeDataset2";
import DateTimePickerCustom2 from "../../components/core/Fields/DateTimePickerCustom2";
import { FiltersType, initFilters } from "../../redux/report/reportSlice";
import SwitchCustom2 from "../../components/core/Fields/SwitchCustom2";

const DialogFormReportFilters = ({
  initialData,
  onClose,
  onSubmit,
  hazardClassifications
}: {
  initialData: FiltersType;
  onClose: () => void;
  onSubmit: (payload: FiltersType) => void;
  hazardClassifications: HazardClassification[] | undefined;
}) => {
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
          <Grid item xs={12}>
            <SwitchCustom2
              control={control}
              label="hazardClassification.filter.showWithoutHazardClassification"
              name="showWithoutHazardClassification"
            />
          </Grid>
          <Grid item xs={12}>
            <AutocompleteMultiLargeDataset2
              control={control}
              label="hazardClassification"
              name="hazardClassifications"
              options={hazardClassifications}
              keyProp="hazardClassificationId"
              labelProp="name"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions2 onClose={onClose} onClear={() => reset(initFilters)} />
    </form>
  );
};

export default DialogFormReportFilters;
