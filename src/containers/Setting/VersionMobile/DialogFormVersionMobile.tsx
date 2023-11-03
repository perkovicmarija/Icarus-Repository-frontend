import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  Grid,
} from "@mui/material";
import IntlMessages from "../../../components/core/IntlMessages";
import { useForm } from "react-hook-form";
import TextField2 from "../../../components/core/Fields/TextField2";
import SelectBasicCustom2 from "../../../components/core/Fields/SelectBasicCustom2";
import AutocompleteMultiLargeDataset2 from "../../../components/core/Fields/AutocompleteMultiLargeDataset2";

const DialogFormVersionMobile = ({
  initialData,
  onClose,
  onSubmit,
  //
  clients,
  entryExistsFlag,
}: any) => {
  const { handleSubmit, control } = useForm({
    defaultValues: initialData,
  });

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        handleSubmit((data) => {
          try {
            onSubmit(data);
            onClose();
          } catch (e) {}
        })(e);
      }}
    >
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {entryExistsFlag && (
              <Alert severity="error">
                <IntlMessages id="form.entryExists" />
              </Alert>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField2
              control={control}
              label="general.versionMobile"
              name="versionMin"
              defaultValue=""
              rules={{ required: "general.required" }}
            />
          </Grid>

          <Grid item xs={12}>
            <SelectBasicCustom2
              disabled={initialData.versionMobileId && true}
              control={control}
              label="general.platform"
              name="platform"
              rules={{ required: "general.required" }}
              options={["iOS", "Android"]}
              defaultValue=""
            />
          </Grid>

          <Grid item xs={12}>
            <AutocompleteMultiLargeDataset2
              disabled={initialData.versionMobileId && true}
              control={control}
              name="selectedClients"
              label="general.companies"
              keyProp="clientId"
              labelProp="name"
              options={clients}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">
          {!initialData.versionMobileId ? "Create" : "Update"}
        </Button>
      </DialogActions>
    </form>
  );
};

export default DialogFormVersionMobile;
