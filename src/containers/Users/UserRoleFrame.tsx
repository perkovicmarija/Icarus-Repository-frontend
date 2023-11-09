import { Link, useRouteMatch } from "react-router-dom";
import { makeStyles, useTheme } from "@mui/styles";
import { AppBar, Paper, Tab, Tabs } from "@mui/material";
import FormTitleBarRich from "../../components/core/Form/FormTitleBarRich";
import TabContainer from "../../components/core/TabContainer";
import { FormattedMessage } from "react-intl";
//
import UserRouter from "./UserRouter";
import { users, userGroups, roles } from "../../consts/routePaths";

const useStyles = makeStyles({
  tabLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

type Tabs = "users" | "user-groups" | "roles";

function UserRoleFrame() {
  const classes = useStyles();
  const theme = useTheme();
  const match = useRouteMatch<{ tab: Tabs }>();

  let tabSelected;
  switch (match.params.tab) {
    case "users":
      tabSelected = 0;
      break;
    case "user-groups":
      tabSelected = 1;
      break;
    case "roles":
      tabSelected = 2;
      break;
    default:
      throw new Error("wrong settings route");
  }

  return (
    <Paper>
      <FormTitleBarRich title="general.userManagement" />
      <AppBar position="static" color="default">
        <Tabs
          value={tabSelected}
          variant="fullWidth"
          indicatorColor="secondary"
        >
          <Tab
            label={<FormattedMessage id="form.users" />}
            className={classes.tabLink}
            component={Link}
            to={users}
          />
          <Tab
            label={<FormattedMessage id="form.userGroups" />}
            className={classes.tabLink}
            component={Link}
            to={userGroups}
          />
          <Tab
            label={<FormattedMessage id="form.roles" />}
            className={classes.tabLink}
            component={Link}
            to={roles}
          />
        </Tabs>
      </AppBar>
      <TabContainer dir={theme.direction}>
        <UserRouter />
      </TabContainer>
    </Paper>
  );
}

export default UserRoleFrame;
