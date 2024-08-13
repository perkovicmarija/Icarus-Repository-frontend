import { Grid, Typography, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TwoSidedProgressBar from "../progressBar/TwoSidedProgressBar";
import ProgressBar from "../progressBar/ProgressBar";
import { FormattedMessage } from "react-intl";
import { SentimentAnalysis } from "../../redux/reportHazardIdentification/reportHazardIdentificationApi";

const useStyles = makeStyles(() => ({
  container: {
    borderColor: "#021b43",
    borderStyle: "solid",
    borderWidth: "0.1rem",
    borderRadius: "0.5rem",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    padding: "1rem",
    margin: "1rem",
  },
  sentimentTitle: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "1rem",
  },
  sentimentScore: {
    fontWeight: "bold",
    textAlign: "center",
  },
  assessmentsContainer: {
    maxHeight: "200px",
    overflowY: "auto",
    marginBottom: "1rem",
  },
  assessmentContainer: {
    padding: "0.5rem",
    backgroundColor: "#ffb300",
    color: "#021b43",
    borderRadius: "0.5rem",
    marginBottom: "0.5rem",
    fontWeight: "bold",
  },
  word: {
    fontWeight: "bold",
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    padding: "0.25rem 0.5rem",
    marginBottom: "1rem",
  },
  progressContainer: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  legend: {
    textAlign: "center",
    marginTop: "1rem",
  },
}));

interface SentimentAnalysisOverviewProps {
  sentimentAnalysis: SentimentAnalysis;
  xs: number;
}

const SentimentAnalysisOverview = (props: SentimentAnalysisOverviewProps) => {
  const classes = useStyles();

  return (
    <Grid item xs={props.xs} className={classes.container}>
      <Typography variant="h6" className={classes.sentimentTitle}>
        <FormattedMessage id="reportHazardIdentification.sentimentAnalysis" />
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body1" className={classes.sentimentScore}>
            <FormattedMessage id="reportHazardIdentification.sentimentAnalysis.polarity" />
          </Typography>
          <ProgressBar value={props.sentimentAnalysis.polarity} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" className={classes.sentimentScore}>
            <FormattedMessage id="reportHazardIdentification.sentimentAnalysis.subjectivity" />
          </Typography>
          <ProgressBar value={props.sentimentAnalysis.subjectivity} />
        </Grid>
      </Grid>
      <Divider style={{ margin: "1rem 0" }} />
      <Typography variant="subtitle1" className={classes.sentimentTitle}>
        <FormattedMessage id="reportHazardIdentification.sentimentAnalysis.sentimentAssessments" />
      </Typography>
      <div className={classes.assessmentsContainer}>
        {props.sentimentAnalysis.sentimentAssessments.map((assessment, index) => (
          <Grid key={index} container className={classes.assessmentContainer}>
            <Grid item xs={12}>
              <Typography variant="body1" fontWeight="bold" marginLeft="0.5rem">
                <FormattedMessage id="reportHazardIdentification.sentimentAnalysis.words" />
              </Typography>
              <Typography
                variant="body2"
                fontWeight="bold"
                className={classes.word}
              >
                {assessment.words.map((word, idx) => (
                  <span key={idx}>
                    {word}
                    {idx < assessment.words.length - 1 ? ", " : ""}
                  </span>
                ))}
              </Typography>
              <div className={classes.progressContainer}>
                <Typography variant="subtitle1">
                  <FormattedMessage id="reportHazardIdentification.sentimentAnalysis.polarity" />
                </Typography>
                <TwoSidedProgressBar value={assessment.polarity} />
              </div>
              <div className={classes.progressContainer}>
                <Typography variant="subtitle1">
                  <FormattedMessage id="reportHazardIdentification.sentimentAnalysis.subjectivity" />
                </Typography>
                <TwoSidedProgressBar value={assessment.subjectivity} />
              </div>
            </Grid>
          </Grid>
        ))}
      </div>
      <div className={classes.legend}>
        <Typography variant="body2">
          <FormattedMessage id="reportHazardIdentification.sentimentAnalysis.legend" />
        </Typography>
      </div>
    </Grid>
  );
};

export default SentimentAnalysisOverview;
