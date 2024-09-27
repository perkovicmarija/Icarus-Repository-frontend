import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(() => ({
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

interface ReportHazardIdentificationDataCleaningProps {
  cleanedText: string;
  xs: number;
}

const ReportHazardIdentificationDataCleaning = (props: ReportHazardIdentificationDataCleaningProps) => {
  const classes = useStyles();

  return (
    <Grid item xs={props.xs} padding={2} marginX={2} className={classes.container}>
      <Grid item xs={12} textAlign="center">
        <Typography variant="subtitle1" className={classes.title}>
          <FormattedMessage id="reportHazardIdentification.dataCleaning" />
        </Typography>
      </Grid>
      <label>{props.cleanedText}</label>
    </Grid>
  );
};

export default ReportHazardIdentificationDataCleaning;
