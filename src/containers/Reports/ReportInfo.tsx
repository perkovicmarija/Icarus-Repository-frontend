import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Report } from "../../redux/report/reportApi";
import ReportDetails from "../../components/report/ReportDetails";

const useStyles = makeStyles(() => ({
  container: {
    padding: "1rem",
    gap: "1rem",
    justifyContent: "space-evenly",
    justifyItems: "center",
    alignContent: "space-evenly",
  },
}));

interface ReportInfoProps {
  report: Report;
}

export const ReportInfo = (
  props: ReportInfoProps
) => {
  const classes = useStyles();
  return (
    <Grid container padding={2}>
      <ReportDetails
        title={props.report.title}
        eventDescription={props.report.eventDescription}
        createdFormatted={props.report.createdFormatted}
        airportDeparture={props.report.airportDeparture}
        airportDestination={props.report.airportDestination}
        flightNumber={props.report.flightNumber}
        aircraft={props.report.aircraft}
        flightPhase={props.report.flightPhase}
        hazard={{
          name: props.report.reportHazardIdentification?.hazardClassification?.name,
          explanation: props.report.reportHazardIdentification?.hazardClassification?.explanation
        }}

        xs={12}
      />
    </Grid>
  );
};
