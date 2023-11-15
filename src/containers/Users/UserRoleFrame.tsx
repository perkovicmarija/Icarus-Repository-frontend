import { Link, useRouteMatch } from "react-router-dom";
import { AppBar, Paper, Tab, Tabs } from "@mui/material";
import FormTitleBarRich from "../../components/core/Form/FormTitleBarRich";
import { FormattedMessage } from "react-intl";
//
import UserRouter from "./UserRouter";
import { users, roles } from "../../consts/routePaths";

type Tabs = "users" | "roles";

function UserRoleFrame() {
  const match = useRouteMatch<{ tab: Tabs }>();

  let tabSelected;
  switch (match.params.tab) {
    case "users":
      tabSelected = 0;
      break;
    case "roles":
      tabSelected = 1;
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
            component={Link}
            to={users}
          />
          <Tab
            label={<FormattedMessage id="form.roles" />}
            component={Link}
            to={roles}
          />
        </Tabs>
      </AppBar>
      <UserRouter />
    </Paper>
  );
}

export default UserRoleFrame;
