import React, { useState } from "react";
import { makeStyles, useTheme } from "@mui/styles";
import { Link, withRouter } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { Tabs, Tab } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import TabContainer from "../../components/TabContainer";
import IntlMessages from "../../components/core/IntlMessages";
import HazardRiskRouter from "./HazardRiskRouter";
import HazardClassificators from "./HazardClassificators";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3),
  },
  tabLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function HazardClassification(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [tabSelected, setTabSelected] = useState(0);

  const handleTabChange = (event, value) => {
    setTabSelected(value);
  };
  
  const { match } = props;

  console.log("match", match)
  return (
    <Paper className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={tabSelected}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="secondary"
        >
          <Tab
            label={<IntlMessages id="riskManagement.tab1HazardRegister" />}
            className={classes.tabLink}
            component={Link}
            to={`${match.url}`}
          />
          {/* <Tab
            label={<IntlMessages id="general.threats" />}
            className={classes.tabLink}
            component={Link}
            to={`${match.url}/threats`}
          />
          <Tab
            label={<IntlMessages id="general.consequences" />}
            className={classes.tabLink}
            component={Link}
            to={`${match.url}/consequences`}
          />
          <Tab
            label={<IntlMessages id="general.barriers" />}
            className={classes.tabLink}
            component={Link}
            to={`${match.url}/barriers`}
          /> */}
          {/*<Tab label={<IntlMessages id="riskManagement.tab2RiskRegister"/>}className={classes.tabLink} component={Link} to={`${match.url}/risks`} />*/}
        </Tabs>
      </AppBar>

      <TabContainer dir={theme.direction}>
        <HazardRiskRouter url={match.path} />
      </TabContainer>
      
      <HazardClassificators />
    </Paper>
  );
}

export default withRouter(HazardClassification);
