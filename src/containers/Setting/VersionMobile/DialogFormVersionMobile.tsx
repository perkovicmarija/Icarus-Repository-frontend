import { useState } from "react";
import { DialogContent, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import TextField2 from "../../../components/core/Fields/TextField2";
import SelectBasicCustom2 from "../../../components/core/Fields/SelectBasicCustom2";
import AutocompleteMultiLargeDataset2 from "../../../components/core/Fields/AutocompleteMultiLargeDataset2";
//
import { DialogActions2 } from "../../../components/core/Dialog/DialogActions2";
import { Version, VersionForAddEdit } from "../../../redux/versionsApi";
import { Client } from "../../../redux/clientsApi";

const DialogFormVersionMobile = ({
  initialData,
  onClose,
  onSubmit,
  //
  clients,
}: {
  initialData: Version | {};
  onClose: () => void;
  onSubmit: (payload: VersionForAddEdit) => Promise<any>;
  clients: Client[];
}) => {
  const { handleSubmit, control } = useForm({
    defaultValues:
      "client" in initialData
        ? {
            ...initialData,
            selectedClients: [initialData.client],
            client: undefined,
          }
        : {},
  });
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        handleSubmit((data) => {
          setLoading(true);
          onSubmit(data as VersionForAddEdit)
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
              label="general.versionMobile"
              name="versionMin"
              rules={{ required: "general.required" }}
            />
          </Grid>

          <Grid item xs={12}>
            <SelectBasicCustom2
              textFieldProps={{
                InputProps: {
                  disabled: "versionMobileId" in initialData,
                },
              }}
              control={control}
              label="general.platform"
              name="platform"
              rules={{
                required: "general.required",
              }}
              options={["iOS", "Android"]}
            />
          </Grid>

          <Grid item xs={12}>
            <AutocompleteMultiLargeDataset2
              control={control}
              name="selectedClients"
              label="general.companies"
              keyProp="clientId"
              labelProp="name"
              options={clients}
              disabled={"versionMobileId" in initialData}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions2 onClose={onClose} loading={loading} />
    </form>
  );
};

export default DialogFormVersionMobile;
