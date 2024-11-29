import { ArrowDownwardSharp } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SentimentAnalysisOverview from "../../components/reportHazardIdentification/SentimentAnalysisOverview";
import ReportHazardIdentificationDetails from "../../components/reportHazardIdentification/ReportHazardIdentificationDetails";
import ReportHazardIdentificationTokenization from "../../components/reportHazardIdentification/ReportHazardIdentificationTokenization";
import ReportHazardIdentificationNER from "../../components/reportHazardIdentification/ReportHazardIdentificationNER";
import ReportHazardIdentificationResult from "../../components/reportHazardIdentification/ReportHazardIdentificationResult";
import ReportHazardIdentificationText from "../../components/reportHazardIdentification/ReportHazardIdentificationResultText";
import { ReportHazardIdentification, UpdateReportHazardIdentificationToken } from "../../redux/reportHazardIdentification/reportHazardIdentificationApi";
import ReportHazardIdentificationDataCleaning from "../../components/reportHazardIdentification/ReportHazardIdentificationDataCleaning";

const useStyles = makeStyles(() => ({
  container: {
    padding: "1rem",
    gap: "1rem",
    justifyContent: "space-evenly",
    justifyItems: "center",
    alignContent: "space-evenly",
  },
}));

interface ReportHazardIdentificationInfoProps {
  reportHazardIdentification: ReportHazardIdentification;
  onTokenEdit: (payload: UpdateReportHazardIdentificationToken) => Promise<any>;
}

export const ReportHazardIdentificationInfo = (
  props: ReportHazardIdentificationInfoProps
) => {
  const classes = useStyles();
  return (
    <Grid container padding={2}>
      <ReportHazardIdentificationDetails
        title={props.reportHazardIdentification.title}
        userCreated={props.reportHazardIdentification.userCreated}
        date={props.reportHazardIdentification.createdFormatted}
        xs={12}
      />

      <ReportHazardIdentificationText
        text={props.reportHazardIdentification.text}
        xs={12}
      />

      <Grid item xs={12} textAlign="center">
        <ArrowDownwardSharp
          style={{ color: "#ffb300", transform: "scaleY(1.5)" }}
        />
      </Grid>

      <ReportHazardIdentificationDataCleaning
        cleanedText={props.reportHazardIdentification.cleanedText}
        xs={12}
      />

      <Grid item xs={12} textAlign="center">
        <ArrowDownwardSharp
          style={{ color: "#ffb300", transform: "scaleY(1.5)" }}
        />
      </Grid>

      <ReportHazardIdentificationTokenization
        tokens={props.reportHazardIdentification.tokens}
        spellCheckSuggestions={props.reportHazardIdentification.spellCheckSuggestions}
        onTokenEdit={
          (tokenId: string, spellCheckSuggestionId: string) => props.onTokenEdit({
            ...props.reportHazardIdentification, tokenId, spellCheckSuggestionId
          })
        }
      />

      <Grid item xs={12} textAlign="center" marginTop="1rem">
        <ArrowDownwardSharp
          style={{ color: "#ffb300", transform: "scaleY(1.5)" }}
        />
      </Grid>

      <Grid container item xs={12} className={classes.container}>
        <ReportHazardIdentificationNER
          entities={props.reportHazardIdentification.entities}
          xs={5}
        />
        <SentimentAnalysisOverview
          xs={5}
          sentimentAnalysis={props.reportHazardIdentification.sentimentAnalysis}
        />
      </Grid>

      <Grid item xs={12} textAlign="center">
        <ArrowDownwardSharp
          style={{ color: "#ffb300", transform: "scaleY(1.5)" }}
        />
      </Grid>

      <ReportHazardIdentificationResult
        riskLevel={props.reportHazardIdentification.riskLevel}
        probability={props.reportHazardIdentification.probability}
        severity={props.reportHazardIdentification.severity}
        hazardClassification={props.reportHazardIdentification.hazardClassification}
        xs={12}
      />
    </Grid>
  );
};
