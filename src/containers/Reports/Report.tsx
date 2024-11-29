import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ReportInfo } from "./ReportInfo";
import FormTitleSubtitleBar from "../../components/core/Form/FormTitleSubtitleBar";
import { useGetReportQuery } from "../../redux/report/reportApi";

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

const Report = (props) => {
  const classes = useStyles();

  const { data, isFetching } = useGetReportQuery(props.match.params.id);

  console.log("data", props.match.params.id)

  return (
    <div>
      <Paper>
        <FormTitleSubtitleBar
          title="report"
          subtitle={data?.data.reportId}
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
              <ReportInfo
                report={data.data}
              />
            }
          </Paper>
        </Grid>
      </Grid>
    </div>

  );
}

export default Report;
