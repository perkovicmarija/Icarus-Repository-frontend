import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { UpdateReportHazardIdentificationToken, useGetReportHazardIdentificationQuery, useUpdateReportHazardIdentificationTokenMutation } from "../../redux/reportHazardIdentification/reportHazardIdentificationApi";
import { ReportHazardIdentificationInfo } from "./ReportHazardIdentificationInfo";
import FormTitleSubtitleBar from "../../components/core/Form/FormTitleSubtitleBar";
import { handleNotify } from "../../helpers/utility";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  container: {
    marginTop: theme.spacing(2),
  },
  objectives: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  treeRoot: {
    marginLeft: theme.spacing(1),
    height: "500px",
    overflowY: "auto",
  },
  loadingOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
}));

const ReportHazardIdentification = (props) => {
  const classes = useStyles();

  const { data, isFetching } = useGetReportHazardIdentificationQuery(props.match.params.id);
  const [loading, setLoading] = useState(false);

  const [triggerEdit] = useUpdateReportHazardIdentificationTokenMutation();

  const handleTokenEdit = async (payload: UpdateReportHazardIdentificationToken) => {
    setLoading(true);
    try {
      const result = await triggerEdit(payload).unwrap();
      handleNotify(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && (
        <div className={classes.loadingOverlay}>
          <CircularProgress />
        </div>
      )}
      <Paper>
        <FormTitleSubtitleBar
          title="reportHazardIdentification"
          subtitle={data?.data.reportHazardIdentificationId}
          showExport={false}
          onExportSelect={() => {}}
          showImport={false}
          onImportSelect={() => {}}
          showPublish={false}
          onPublishSelect={() => {}}
        />
      </Paper>
      <Grid container className={classes.container} spacing={2}>
        <Grid item xs={12}>
          <Paper>
            {data &&
              <ReportHazardIdentificationInfo
                reportHazardIdentification={data.data}
                onTokenEdit={handleTokenEdit}
              />
            }
          </Paper>
        </Grid>
      </Grid>
    </div>

  );
}

export default ReportHazardIdentification;
