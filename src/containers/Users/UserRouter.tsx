import { Switch, Route } from "react-router-dom";
import User from "./User/Users";
import UserGroups from "./UserGroup/UserGroups";
import Roles from "./Role/Roles";
import { users, userGroups, roles } from "../../consts/routePaths";

function UserRouter() {
  return (
    <Switch>
      <Route exact path={users + ":page?/:rowsPerPage?"} component={User} />
      <Route
        exact
        path={userGroups + ":page?/:rowsPerPage?"}
        component={UserGroups}
      />
      <Route exact path={roles + ":page?/:rowsPerPage?"} component={Roles} />
    </Switch>
  );
}

export default UserRouter;
