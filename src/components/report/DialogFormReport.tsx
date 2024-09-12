import { DialogContent, Grid } from "@mui/material";
import { DialogActions2 } from "../core/Dialog/DialogActions2";
import { useForm } from "react-hook-form";
import TextField2 from "../core/Fields/TextField2";
import { useState } from "react";
import { Client } from "../../redux/settings/clientsApi";
import { Report} from "../../redux/report/reportApi";
import { HazardClassification } from "../../redux/hazardClassification/hazardClassificationApi";
import AutocompleteLargeDataset2 from "../core/Fields/AutocompleteLargeDataset2";

export interface ReportFormProps extends Omit<Report, 'reportHazardIdentification'> {
  reportHazardIdentification: {
    name: string;
  }
}

function DialogFormReport({
  initialData,
  onClose,
  onSubmit,
  isCreated,
  hazardClassifications
}: {
  initialData: Report | {};
  onClose: () => void;
  onSubmit: (payload: Report) => Promise<any>;
  clients: Client[];
  hazardClassifications: HazardClassification[] | undefined;
  isCreated: boolean;
}) {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      ...initialData,
      reportHazardIdentification: {
        name: initialData.reportHazardIdentification?.hazardClassification?.name
      }
    },
  });

  console.log("control", control)
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        handleSubmit((data) => {
          console.log("data", data)
          setLoading(true);
          onSubmit({
            ...data,
            reportHazardIdentification: {
              ...initialData.reportHazardIdentification,
              hazardClassification: data.reportHazardIdentification
            } 
          } as Report)
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
              label="general.eventDescription"
              name="eventDescription"
              rules={{ required: "general.required" }}
              rows={3}
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <TextField2
              control={control}
              label="general.airportDeparture"
              name="airportDeparture"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField2
              control={control}
              label="general.airportDestination"
              name="airportDestination"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField2
              control={control}
              label="general.flightPhase"
              name="flightPhase"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField2
              control={control}
              label="general.flightNumber"
              name="flightNumber"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField2
              control={control}
              label="general.aircraft"
              name="aircraft"
            />
          </Grid>
          {!isCreated &&
            <Grid item xs={12}>
            <AutocompleteLargeDataset2
              control={control}
              label="general.hazard"
              name="reportHazardIdentification"
              options={hazardClassifications}
              keyProp="hazardClassificationId"
              labelProp="name"
            />
          </Grid>

          }
        </Grid>
      </DialogContent>
      <DialogActions2 onClose={onClose} loading={loading} />
    </form>
  );
}

export default DialogFormReport;
