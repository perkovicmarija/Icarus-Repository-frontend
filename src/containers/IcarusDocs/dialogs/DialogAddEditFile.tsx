import Grid from "@mui/material/Grid";
import { Box, DialogContent } from "@mui/material";
import DropzoneCustom from "../../../components/core/Dropzone/DropzoneCustom";
import { DialogActions2 } from "../../../components/core/Dialog/DialogActions2";
import { useController, useForm } from "react-hook-form";
import { useState } from "react";
import TextField2 from "../../../components/core/Fields/TextField2";
import SwitchCustom2 from "../../../components/core/Fields/SwitchCustom2";
import { FormattedMessage } from "react-intl";
import AutocompleteMultiLargeDataset2 from "../../../components/core/Fields/AutocompleteMultiLargeDataset2";
import { GridContainer2 } from "../../../components/core/GridContainer2";
import { Client } from "../../../redux/clientsApi";

const DialogAddEditFile = ({
  initialData,
  onClose,
  onSubmit,
  //
  editDisabled,
  clients,
}: {
  initialData: any;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  //
  editDisabled?: boolean;
  clients: Client[];
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  });
  const [loading, setLoading] = useState(false);

  const dropzoneController = useController({
    control,
    name: "files",
    defaultValue: [],
    rules: {
      validate: (value) => value?.length > 0 || "general.required",
    },
  });

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
        <GridContainer2>
          <Grid item xs={12}>
            <DropzoneCustom
              multiple={false}
              onDropAccepted={(files) => {
                console.log(files);
                dropzoneController.field.onChange(files);
              }}
              onDelete={(_file: any, index: number) => {
                const filesCopy = [...dropzoneController.field.value];
                filesCopy.splice(index, 1);
                dropzoneController.field.onChange(filesCopy);
              }}
              errorMessage={
                dropzoneController.formState.errors["files"]?.message as
                  | string
                  | undefined
              }
              disabled={editDisabled}
              maxSize={262144000}
              maxSizeMb="250MB"
              files={dropzoneController.field.value}
              showDelete
            />
          </Grid>

          <Grid item xs={12} style={{ marginTop: "1rem" }}>
            <TextField2
              control={control}
              label="general.name"
              name="name"
              rules={{ "required": "general.required" }}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <SwitchCustom2
              control={control}
              label="documentation.protectedFromDownload"
              name="protectedFile"
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <SwitchCustom2
              control={control}
              label="documentation.uncontrolledCopy"
              name="uncontrolledCopy"
              info="documentation.uncontrolledCopy.message"
            />

            <Box fontSize={12} fontStyle="oblique" color="primary.main">
              <FormattedMessage id="documentation.uncontrolledCopy.warning" />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <TextField2
              control={control}
              multiline
              label="general.note"
              name="note"
              placeholder="general.note"
              rows={3}
            />
          </Grid>

          <Grid item xs={12}>
            <AutocompleteMultiLargeDataset2
              control={control}
              label="general.companies"
              name="clients"
              options={clients}
              keyProp="clientId"
              labelProp="name"
            />
          </Grid>
        </GridContainer2>
      </DialogContent>

      <DialogActions2
        onClose={onClose}
        loading={loading}
        submitDisabled={Object.keys(errors).length > 0}
      />
    </form>
  );
};

export default DialogAddEditFile;
