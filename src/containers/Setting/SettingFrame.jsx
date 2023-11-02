import React, { useState } from "react";

import { Link } from "react-router-dom";
import { AppBar, Paper, Tab, Tabs } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";

import TabContainer from "../../components/core/TabContainer";
import SettingRouter from "./SettingRouter";
import FormTitleBarRich from "../../components/core/Form/FormTitleBarRich";
import { getClientsPath, getVersionMobilePath } from "../../consts/routePaths";
import IntlMessages from "../../components/core/IntlMessages";

const useStyles = makeStyles((theme) => ({
  tabLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function SettingFrame(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [tabSelected, setTabSelected] = useState(0);

  const handleTabChange = (event, value) => {
    setTabSelected(value);
  };

  return (
    <Paper>
      <FormTitleBarRich title="general.settings" />
      <AppBar position="static" color="default">
        <Tabs
          value={tabSelected}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="secondary"
        >
          <Tab
            label={<IntlMessages id="form.clients" />}
            className={classes.tabLink}
            component={Link}
            to={getClientsPath(0, 25)}
          />
          <Tab
            label={<IntlMessages id="general.versionsMobile" />}
            className={classes.tabLink}
            component={Link}
            to={getVersionMobilePath(0, 25)}
          />
        </Tabs>
      </AppBar>
      <TabContainer dir={theme.direction}>
        <SettingRouter />
      </TabContainer>
    </Paper>
  );
}

export default SettingFrame;
