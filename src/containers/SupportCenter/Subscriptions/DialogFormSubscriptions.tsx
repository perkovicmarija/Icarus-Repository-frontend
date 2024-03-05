import {DialogContent, Grid} from "@mui/material";
import {DialogActions2} from "../../../components/core/Dialog/DialogActions2";
import {useForm} from "react-hook-form";
import TextField2 from "../../../components/core/Fields/TextField2";
import {useState} from "react";
//
import {Client} from "../../../redux/clientsApi";
import {SoftwareLogSubscription} from "../../../redux/support/subscriptions/softwareLogSubscriptionApi";
import SelectCustom2 from "../../../components/core/Fields/SelectCustom2";

function DialogFormSubscriptions({
  initialData,
  onClose,
  onSubmit,
  //
  clients,
}: {
  initialData: SoftwareLogSubscription | {};
  onClose: () => void;
  onSubmit: (payload: SoftwareLogSubscription) => Promise<any>;
  clients: Client[];
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
          onSubmit(data as SoftwareLogSubscription)
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
              label="general.email"
              name="email"
              rules={{ required: "general.required" }}
            />
          </Grid>

          <Grid item xs={12}>
            <SelectCustom2
                labelProp="name"
                control={control}
                label="general.companies"
                options={clients}
                name="client"
                keyProp="clientId"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions2 onClose={onClose} loading={loading} />
    </form>
  );
}

export default DialogFormSubscriptions;
