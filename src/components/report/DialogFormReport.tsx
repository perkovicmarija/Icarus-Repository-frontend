import { Button, DialogContent, Grid } from "@mui/material";
import { DialogActions2 } from "../core/Dialog/DialogActions2";
import { useForm } from "react-hook-form";
import TextField2 from "../core/Fields/TextField2";
import { useState } from "react";
import { Client } from "../../redux/settings/clientsApi";
import { Report } from "../../redux/report/reportApi";
import { HazardClassification } from "../../redux/hazardClassification/hazardClassificationApi";
import AutocompleteLargeDataset2 from "../core/Fields/AutocompleteLargeDataset2";
import DialogFormFrame from "../core/Dialog/DialogFormFrame";
import DialogFormAddEditHazard2 from "../hazard-classification/DialogFormAddEditHazard2";
import IntlMessages from "../core/IntlMessages";
import { Report as ReportInterface } from "../../redux/report/reportApi";
import TextFiledReport from "../core/TextField/TextFiledReport";
import TypographyReportField from "../core/TypographyReportField";

export interface ReportFormProps
  extends Omit<Report, "reportHazardIdentification"> {
  reportHazardIdentification: {
    name: string;
  };
}

function DialogFormReport({
  initialData,
  onClose,
  onSubmit,
  isCreated,
  hazardClassifications,
}: {
  initialData: Report | {};
  onClose: () => void;
  onSubmit: (payload: Report) => Promise<any>;
  clients: Client[];
  hazardClassifications: HazardClassification[] | undefined;
  isCreated: boolean;
}) {
  const [addEditForm, setAddEditForm] = useState(undefined);
  const [hazardClassification, setHazardClassification] = useState(
    initialData.reportHazardIdentification?.hazardClassification
  );

  const { handleSubmit, control } = useForm({
    defaultValues: {
      ...initialData,
      reportHazardIdentification: {
        name: initialData.reportHazardIdentification?.hazardClassification
          ?.name,
      },
    },
  });

  const [loading, setLoading] = useState(false);

  console.log("hazardClassification", hazardClassification);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          handleSubmit((data) => {
            setLoading(true);
            onSubmit({
              ...data,
              reportHazardIdentification: {
                ...initialData.reportHazardIdentification,
                hazardClassification,
              },
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
            <Grid item xs={12}>
              <TypographyReportField title="hazardClassification" />
              <Grid>
                <Button
                color="primary"
                variant="contained"
                onClick={() => setAddEditForm({})}
              >
                <IntlMessages
                  id={
                    hazardClassification
                      ? hazardClassification.name
                      : "Add hazard classification"
                  }
                />
              </Button>
              </Grid>
              
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions2 onClose={onClose} loading={loading} />
      </form>
      <DialogFormFrame
        onClose={() => setAddEditForm(undefined)}
        title={"riskManagement.selectHazard"}
        open={Boolean(addEditForm)}
        maxWidth="lg"
        formComponent={
          <DialogFormAddEditHazard2
            initialData={addEditForm}
            onClose={() => setAddEditForm(undefined)}
            onSubmit={(payload) => {
              setAddEditForm(undefined);
              setHazardClassification(payload.hazardClassification);
            }}
            hazadClassifications={hazardClassifications}
          />
        }
      />
    </>
  );
}

export default DialogFormReport;
