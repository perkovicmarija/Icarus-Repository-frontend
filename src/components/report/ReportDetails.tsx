import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(() => ({
  fieldCustom: {
    display: "flex",
    justifyContent: "start",
    justifyItems: "center",
    alignContent: "start",
    alignItems: "center",
  },
  labelCustom: {
    marginRight: "0.25rem",
    fontWeight: "bold",
  },
  container: {
    borderColor: "#021b43",
    borderStyle: "solid",
    borderWidth: "0.1rem",
    color: "#021b43",
    borderRadius: "0.5rem",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    padding: "1rem",
    margin: "1rem",
    gap: "1rem",
    justifyContent: "center",
    justifyItems: "center",
    alignContent: "start",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
}));

interface ReportDetailsProps {
  airportDestination: string;
  aircraft: string;
  flightNumber: string;
  flightPhase: string;
  airportDeparture: string;
  title: string;
  eventDescription: string;
  createdFormatted: string;
  hazard: {
    name: string;
    explanation: string;
  };
  xs: number;
}

const ReportDetails = (props: ReportDetailsProps) => {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      xs={props.xs}
      alignContent={"center"}
      textAlign={"center"}
    >
      <Grid item xs={12} padding={2} marginX={2} className={classes.container}>
        <Grid item container xs={12}>
          <Grid item xs={6} className={classes.fieldCustom}>
            <label className={classes.title}>
              <FormattedMessage id="general.title" />:
            </label>
            <label>{props.title}</label>
          </Grid>
          <Grid item xs={6} className={classes.fieldCustom}>
            <label className={classes.title}>
              <FormattedMessage id="general.created" />:
            </label>
            <label>{props.createdFormatted}</label>
          </Grid>
        </Grid>
        <Grid item container xs={12} marginTop={2} textAlign="left">
          <Grid item xs={12}>
            <label className={classes.labelCustom}>
              <FormattedMessage id="general.eventDescription" />:
            </label>
          </Grid>
          <Grid item xs={12}>
            <label>{props.eventDescription}</label>
          </Grid>
        </Grid>
        <Grid item container xs={12} marginTop={2}>
          <Grid item xs={6} className={classes.fieldCustom}>
            <label className={classes.title}>
              <FormattedMessage id="general.airportDeparture" />:
            </label>
            <label>{props.airportDeparture}</label>
          </Grid>
          <Grid item xs={6} className={classes.fieldCustom}>
            <label className={classes.title}>
              <FormattedMessage id="general.airportDestination" />:
            </label>
            <label>{props.airportDestination}</label>
          </Grid>
        </Grid>
        <Grid item container xs={12} marginTop={2}>
          <Grid item xs={4} className={classes.fieldCustom}>
            <label className={classes.title}>
              <FormattedMessage id="general.aircraft" />:
            </label>
            <label>{props.aircraft}</label>
          </Grid>
          <Grid item xs={4} className={classes.fieldCustom}>
            <label className={classes.title}>
              <FormattedMessage id="general.flightNumber" />:
            </label>
            <label>{props.flightNumber}</label>
          </Grid>
          <Grid item xs={4} className={classes.fieldCustom}>
            <label className={classes.title}>
              <FormattedMessage id="general.flightPhase" />:
            </label>
            <label>{props.flightPhase}</label>
          </Grid>
        </Grid>
        <Grid item container xs={12} marginTop={2} textAlign="left">
          <Grid item xs={12} fontSize={20}>
            <label className={classes.labelCustom}>
              <FormattedMessage id="general.hazard" />
            </label>
          </Grid>
          <Grid item xs={6}>
            <label className={classes.labelCustom}>
              <FormattedMessage id="general.name" />:
            </label>
            <label>{props.hazard.name}</label>
          </Grid>
          <Grid item xs={6}>
            <label className={classes.labelCustom}>
              <FormattedMessage id="general.explanation" />:
            </label>
            <label>{props.hazard.explanation}</label>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ReportDetails;
