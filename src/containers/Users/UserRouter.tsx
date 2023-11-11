import { Switch, Route } from "react-router-dom";
import User from "./User/Users";
import Roles from "./Role/Roles";
import { users, roles } from "../../consts/routePaths";

function UserRouter() {
  return (
    <Switch>
      <Route exact path={users + ":page?/:rowsPerPage?"} component={User} />
      <Route exact path={roles + ":page?/:rowsPerPage?"} component={Roles} />
    </Switch>
  );
}

export default UserRouter;
