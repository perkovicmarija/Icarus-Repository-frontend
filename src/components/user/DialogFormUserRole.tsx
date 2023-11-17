import { DialogContent, Grid } from "@mui/material";
import { DialogActions2 } from "../core/Dialog/DialogActions2";
import { useForm } from "react-hook-form";
import TextField2 from "../core/Fields/TextField2";
import AutocompleteMultiLargeDataset2 from "../core/Fields/AutocompleteMultiLargeDataset2";
import { useState } from "react";
//
import { Role } from "../../redux/user/rolesSlice";

const DialogFormUserRole = ({
  initialData,
  onClose,
  onSubmit,
  //
  authorities,
}: {
  initialData: Role | {};
  onClose: () => void;
  onSubmit: (payload: Role) => Promise<any>;
  authorities: any[];
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
          onSubmit(data as Role)
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
              label="form.name"
              name="name"
              rules={{ required: "general.required" }}
              placeholder="form.name"
            />
          </Grid>

          <Grid item xs={12}>
            <AutocompleteMultiLargeDataset2
              control={control}
              label="documentation.permissions"
              name="roles"
              options={authorities}
              keyProp="authorityId"
              labelProp="nameSimple"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions2 onClose={onClose} loading={loading} />
    </form>
  );
};

export default DialogFormUserRole;
