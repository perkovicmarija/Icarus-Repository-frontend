import { Grid, Tooltip, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FormattedMessage } from "react-intl";
import RiskMatrix from "../risk/RiskMatrix";
import { HazardClassification } from "../../redux/hazardClassification/hazardClassificationApi";

const useStyles = makeStyles(() => ({
  labelCustom: {
    fontWeight: "bold",
    marginRight: "0.25rem",
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
    fontSize: "1.25rem",
    textAlign: "center",
  },
}));

interface ReportHazardIdentificationTextProps {
  riskLevel: string;
  probability: string;
  severity: string;
  hazardClassification: HazardClassification;
  xs: number;
}

const ReportHazardIdentificationResult = (
  props: ReportHazardIdentificationTextProps
) => {
  const classes = useStyles();

  return (
    <Grid
      item
      xs={props.xs}
      padding={2}
      marginX={2}
      className={classes.container}
    >
      <Grid item xs={12} textAlign="center">
        <Typography variant="subtitle1" className={classes.title}>
          <FormattedMessage id="reportHazardIdentification.result" />
        </Typography>
      </Grid>
      <Grid item container xs={12} textAlign="center">
        <Grid item xs={6}>
          <label className={classes.labelCustom}>
            <FormattedMessage id="general.probability" />:
          </label>
          <label>{props.probability}</label>
        </Grid>
        <Grid item xs={6}>
          <label className={classes.labelCustom}>
            <FormattedMessage id="general.severity" />:
          </label>
          <label>{props.severity}</label>
        </Grid>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <label className={classes.labelCustom}>
          <FormattedMessage id="hazardClassification" />:
        </label>
        <Tooltip title={props.hazardClassification?.explanation}>
          <label>{props.hazardClassification?.name}</label>
        </Tooltip>
      </Grid>
      <Grid item xs={12} container textAlign="center" marginTop={1}>
        <Grid item xs={12}>
          <label className={classes.labelCustom}>
            <FormattedMessage id="general.riskLevel" />
          </label>
        </Grid>
        <Grid item xs={12}>
          <RiskMatrix
            title="general.riskLevel"
            object={{
              probability: props.probability,
              severity: props.severity,
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ReportHazardIdentificationResult;
