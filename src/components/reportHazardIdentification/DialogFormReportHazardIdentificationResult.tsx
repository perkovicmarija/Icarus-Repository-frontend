import { DialogContent, Grid, Typography } from "@mui/material";
import { DialogActions2 } from "../core/Dialog/DialogActions2";
import { makeStyles } from "@mui/styles";
import { ReportHazardIdentification } from "../../redux/reportHazardIdentification/reportHazardIdentificationApi";
import ReportHazardIdentificationTokenization from "./ReportHazardIdentificationTokenization";
import { FormattedMessage } from "react-intl";
import ReportHazardIdentificationNER from "./ReportHazardIdentificationNER";
import SentimentAnalysisOverview from "./SentimentAnalysisOverview";
import ReportHazardIdentificationResult from "./ReportHazardIdentificationResult";
const useStyles = makeStyles(() => ({
  container: {
    padding: "0rem 1rem",
  },
  title: {
    fontSize: "1.25rem",
    textAlign: "left",
  },
}));

interface DialogFormReportHazardIdentificationResultProps {
  reportHazardIdentificationResult: ReportHazardIdentification;
  onClose: () => void;
}

function DialogFormReportHazardIdentificationResult(props: DialogFormReportHazardIdentificationResultProps) {
  const classes = useStyles();

  return (
    <>
      <DialogContent>
        <Grid container className={classes.container}>
          <Grid item xs={12} padding={1} textAlign="left">
            <Typography variant="subtitle1" className={classes.title}>
              <FormattedMessage id="general.title" />
            </Typography>
            <label>{props.reportHazardIdentificationResult.title}</label>
          </Grid>
          <Grid item xs={12} padding={1} textAlign="left">
            <Typography variant="subtitle1" className={classes.title}>
              <FormattedMessage id="general.text" />
            </Typography>
            <label>{props.reportHazardIdentificationResult.text}</label>
          </Grid>
          <Grid item style={{ paddingRight: "2rem" }}>
            <ReportHazardIdentificationTokenization
              tokens={props.reportHazardIdentificationResult.tokens}
            />
          </Grid>
          <ReportHazardIdentificationNER
            entities={props.reportHazardIdentificationResult.entities}
            xs={12}
          />
          <SentimentAnalysisOverview
            sentimentAnalysis={props.reportHazardIdentificationResult.sentimentAnalysis}
            xs={12}
          />
          <ReportHazardIdentificationResult
            probability={props.reportHazardIdentificationResult.probability}
            severity={props.reportHazardIdentificationResult.severity}
            riskLevel={props.reportHazardIdentificationResult.riskLevel}
            xs={12}
          />
        </Grid>
      </DialogContent>
      <DialogActions2 onClose={props.onClose} hideSubmit showCloseText />
    </>
  );
}

export default DialogFormReportHazardIdentificationResult;
