import { useState } from "react";
import { DialogContent, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import TextField2 from "../../../components/core/Fields/TextField2";
import SelectBasicCustom2 from "../../../components/core/Fields/SelectBasicCustom2";
import AutocompleteMultiLargeDataset2 from "../../../components/core/Fields/AutocompleteMultiLargeDataset2";
import { Version } from "../../../redux/setting/versionsSlice";
//
import { Client } from "../../../redux/setting/clientsSlice";
import { DialogActions2 } from "../../../components/core/Dialog/DialogActions2";

const DialogFormVersionMobile = ({
  initialData,
  onClose,
  onSubmit,
  //
  clients,
}: {
  initialData: Version | {};
  onClose: () => void;
  onSubmit: (payload: Version) => Promise<any>;
  clients: Client[];
}) => {
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
          onSubmit(data as Version)
            .then(onClose)
            .catch(() => setLoading(false));
        })(e);
      }}
    >
      <DialogContent>
        <Grid container spacing={2}>
          {/* <Grid item xs={12}>
            {entryExistsFlag && (
              <Alert severity="error">
                <IntlMessages id="form.entryExists" />
              </Alert>
            )}
          </Grid> */}
          <Grid item xs={12}>
            <TextField2
              control={control}
              label="general.versionMobile"
              name="versionMin"
              rules={{ required: "general.required" }}
            />
          </Grid>

          <Grid item xs={12}>
            <SelectBasicCustom2
              disabled={"versionMobileId" in initialData}
              control={control}
              label="general.platform"
              name="platform"
              rules={{
                required:
                  "versionMobileId" in initialData ? false : "general.required",
              }}
              options={["iOS", "Android"]}
            />
          </Grid>

          <Grid item xs={12}>
            <AutocompleteMultiLargeDataset2
              disabled={"versionMobileId" in initialData}
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

      <DialogActions2 onClose={onClose} loading={loading} />
    </form>
  );
};

export default DialogFormVersionMobile;
