import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { cloneDeep } from "lodash";
import { Paper, Grid, AppBar, Tabs, Tab } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import Moment from "moment";

import IntlMessages from "../../../../components/core/IntlMessages";
import DialogFormSupportItemAdmin from "../../../../components/support/DialogFormSupportItemAdmin";
import FormTitleSubtitleBarSupport from "../../../../components/support/FormTitleSubtitleBarSupport";
import DialogProgress from "../../../../components/core/Dialog/DialogProgress";
import DialogNoCloseFrame from "../../../../components/core/Dialog/DialogNoCloseFrame";
import DialogFormFrame from "../../../../components/core/Dialog/DialogFormFrame";
import SupportBugDetailsRouter from "./SupportBugDetailsRouter";
import * as supportActions from "../../../../redux/support/supportActions";
import {
  getSupportBugAttachmentsPath,
  getSupportBugCommentsPath,
} from "../../../../consts/routePaths";
import { LayoutWrapper } from "../../../../components/core/LayoutWrapper";

const useStyles = makeStyles({
  statusCancelled: {
    color: "#000000",
    fontWeight: "bold",
  },
  statusInProgress: {
    color: "#F5CB77",
    fontWeight: "bold",
  },
  statusFinished: {
    color: "#2ECC71",
    fontWeight: "bold",
  },
  statusNeedReview: {
    color: "#FF6F6F",
    fontWeight: "bold",
  },
  statusNone: {
    color: "#ADDBE8",
    fontWeight: "bold",
  },
  infoBlock: {
    paddingTop: "10px",
    paddingLeft: "20px",
    background: "#476DAA",
    margin: "0px",
    width: "100%",
  },
});

function SupportBugDetailsFrame(props) {
  const classes = useStyles();

  const [dialogItemAdminOpen, setDialogItemAdminOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [supportBug, setSupportBug] = useState({
    comments: [],
    supportBugAttachments: [],
  });

  useEffect(() => {
    if (props.supportBugId !== "-1") {
      const viewModel = {
        supportBugId: props.supportBugId,
      };
      props.supportActions.load(viewModel);
    }

    props.supportActions.loadAllModules();
    props.supportActions.loadAllLevels();
    props.supportActions.loadAllStatuses();
    props.supportActions.loadAllStatuses();
  }, []);

  useEffect(() => {
    if (props.supportBug.supportBugId) {
      setSupportBug(props.supportBug);
    }
  }, [props.supportBug]);

  const handleChange = (event, value) => {
    setValue(value);
  };

  const handleInputIcarusBugChange = ({ target: { name, value } }) => {
    let supportBugClone = cloneDeep(supportBug);
    supportBugClone[name] = value;
    setSupportBug(supportBugClone);
  };

  const handleDialogAdminOpen = () => {
    setDialogItemAdminOpen(true);
  };

  const handleDialogAdminClose = () => {
    setDialogItemAdminOpen(false);
  };

  const handleUpdateItem = () => {
    let supportBugClone = cloneDeep(supportBug);
    props.supportActions.update(supportBugClone);

    setDialogItemAdminOpen(false);
  };

  const handleSelectChange = (event, name) => {
    let supportBugClone = cloneDeep(supportBug);

    if (event.target.name === "level") {
      for (let i = 0; i < props.levels.length; i++) {
        if (props.levels[i].supportBugLevelId === event.target.value) {
          supportBugClone.level = props.levels[i];
        }
      }
    }

    if (event.target.name === "module") {
      for (let i = 0; i < props.modules.length; i++) {
        if (props.modules[i].supportBugModuleId === event.target.value) {
          supportBugClone.module = props.modules[i];
        }
      }
    }
    if (event.target.name === "status") {
      for (let i = 0; i < props.statuses.length; i++) {
        if (props.statuses[i].supportBugStatusId === event.target.value) {
          supportBugClone.status = props.statuses[i];
        }
      }
    }

    setSupportBug(supportBugClone);
  };

  const handleDateTimeChange = (name) => (dateTime) => {
    let supportBugClone = cloneDeep(supportBug);
    supportBugClone[name] = dateTime;
    Moment.locale("en");
    supportBugClone.dueDate = Moment(dateTime).format("YYYY-MM-DD HH:mm");
    setSupportBug(supportBugClone);
  };

  const changeValueOnStatus = (value) => {
    if (value === "in-progress") {
      return classes.statusInProgress;
    }
    if (value === "cancelled") {
      return classes.statusCancelled;
    }
    if (value === "completed") {
      return classes.statusFinished;
    }
    if (value === "review") {
      return classes.statusNeedReview;
    }
    return classes.statusNone;
  };

  const {
    modules,
    levels,
    statuses,
    progress,
    progressBarOpened,
    supportBugId,
  } = props;

  return (
    <LayoutWrapper>
      <Paper>
        <FormTitleSubtitleBarSupport
          title="support.item"
          subtitle={
            supportBug.supportBugIdSign ? supportBug.supportBugIdSign : "N/A"
          }
          onSettingsSelect={handleDialogAdminOpen}
        />

        <Grid container spacing={2} className={classes.infoBlock}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid container spacing={2}>
              <Grid
                item
                xl={4}
                lg={4}
                md={4}
                sm={4}
                xs={12}
                style={{ color: "white" }}
              >
                <span>
                  <strong>
                    <IntlMessages id="general.createdBy" />:
                  </strong>{" "}
                  {supportBug.userAuthor
                    ? supportBug.userAuthor.fullName
                    : "N/A"}
                </span>
              </Grid>
              <Grid
                item
                xl={4}
                lg={4}
                md={4}
                sm={4}
                xs={12}
                style={{ color: "white" }}
              >
                <span>
                  <strong>
                    <IntlMessages id="general.created" />:
                  </strong>{" "}
                  {supportBug.created}
                </span>
              </Grid>
              <Grid
                item
                xl={4}
                lg={4}
                md={4}
                sm={4}
                xs={12}
                style={{ color: "white" }}
              >
                <span>
                  <strong>
                    <IntlMessages id="general.status" />:
                  </strong>
                  <span
                    className={changeValueOnStatus(
                      supportBug.status ? supportBug.status.code : "N/A"
                    )}
                  >
                    {" "}
                    {supportBug.status ? supportBug.status.status : "N/A"}
                  </span>
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid container spacing={2}>
              <Grid
                item
                xl={4}
                lg={4}
                md={4}
                sm={4}
                xs={12}
                style={{ color: "white" }}
              >
                <span>
                  <strong>
                    <IntlMessages id="support.severity" />:
                  </strong>{" "}
                  {supportBug.level ? supportBug.level.level : "N/A"}
                </span>
              </Grid>
              <Grid
                item
                xl={4}
                lg={4}
                md={4}
                sm={4}
                xs={12}
                style={{ color: "white" }}
              >
                <span>
                  <strong>
                    <IntlMessages id="general.dueDate" />:
                  </strong>{" "}
                  {supportBug.dueDate}
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid container spacing={2}>
              <Grid
                item
                xl={4}
                lg={4}
                md={4}
                sm={4}
                xs={12}
                style={{ color: "white" }}
              >
                <span>
                  <strong>
                    <IntlMessages id="support.module" />:
                  </strong>{" "}
                  {supportBug.module ? supportBug.module.name : "N/A"}
                </span>
              </Grid>
              <Grid
                item
                xl={4}
                lg={4}
                md={4}
                sm={4}
                xs={12}
                style={{ color: "white" }}
              >
                <span>
                  <strong>
                    <IntlMessages id="general.closedOnDate" />:
                  </strong>{" "}
                  {supportBug.closed ? supportBug.closed : "N/A"}
                </span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              label={<IntlMessages id="general.comments" />}
              component={Link}
              to={getSupportBugCommentsPath(supportBugId)}
            />
            <Tab
              label={<IntlMessages id="attachments.label" />}
              component={Link}
              to={getSupportBugAttachmentsPath(supportBugId)}
            />
          </Tabs>
        </AppBar>

        <SupportBugDetailsRouter />
      </Paper>

      <DialogFormFrame
        onClose={handleDialogAdminClose}
        title="support.item"
        open={dialogItemAdminOpen}
      >
        <DialogFormSupportItemAdmin
          onClose={handleDialogAdminClose}
          onSubmit={handleUpdateItem}
          onInputChange={handleInputIcarusBugChange}
          onSelectChange={handleSelectChange}
          modules={modules}
          levels={levels}
          statuses={statuses}
          supportBug={supportBug}
          onDateTimeChange={handleDateTimeChange}
        />
      </DialogFormFrame>

      <DialogNoCloseFrame
        title="general.downloading"
        open={progressBarOpened}
        formComponent={<DialogProgress progress={progress} />}
      />
    </LayoutWrapper>
  );
}

function mapStateToProps(state, ownProps) {
  const { id } = ownProps.match.params;
  return {
    supportBug: state.SupportCenter.supportBug,
    modules: state.SupportCenter.modules,
    levels: state.SupportCenter.levels,
    statuses: state.SupportCenter.statuses,
    progress: state.Progress.progress,
    progressBarOpened: state.Progress.progressOpened,
    supportBugId: id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    supportActions: bindActionCreators(supportActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupportBugDetailsFrame);
