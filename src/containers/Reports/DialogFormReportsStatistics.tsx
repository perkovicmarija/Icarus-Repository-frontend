import { DialogContent, Grid, Typography, Paper } from "@mui/material";
import { ReportStatistics } from "../../redux/report/reportApi";
import IntlMessages from "../../components/core/IntlMessages";

const DialogFormReportStatistics = ({
  reportStatistics
}: {
  reportStatistics: ReportStatistics
}) => {
  return (
    <DialogContent>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography fontWeight="bold">
              <IntlMessages id="report.statistics.count" />
            </Typography>
            <Typography variant="h4" color="primary">
              {reportStatistics.reportsWithHazardClassification}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            <IntlMessages id="report.statistics.mostFrequent" />
          </Typography>
          {reportStatistics?.mostFrequentHazardClassifications?.map((f) => (
            <Paper
              key={f.classification.hazardClassificationId}
              elevation={2}
              sx={{ p: 2, mb: 1 }}
            >
              <Typography variant="body1" fontWeight="bold">
                {f.classification.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Count: {f.count}
              </Typography>
            </Paper>
          ))}
        </Grid>
      </Grid>
    </DialogContent>
  );
};

export default DialogFormReportStatistics;
