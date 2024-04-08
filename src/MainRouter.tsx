import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import Admin from "./containers/Admin/Admin";
import FourZeroFour from "./containers/404/FourZeroFour";
import Login from "./containers/Login/Login";
import ConfirmationSignUp from "./containers/Login/ConfirmSignUp";
import {
  root,
  fourZeroFour,
  adminRoot,
  confirmationCode,
  auditChecklistOverview, users,
} from "./consts/routePaths";
import { useAppSelector } from "./redux/store";

{
  /* <Redirect
  to={{
    pathname: signIn,
    state: { from: props.location },
  }}
/>; */
}

const MainRouter = ({ history }: any) => {
  const isLoggedIn = useAppSelector((state) => state.Auth.token !== null);

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route
          exact
          path={fourZeroFour}
          component={() => <FourZeroFour homePath={auditChecklistOverview} />}
        />
        <Route exact path={confirmationCode} component={ConfirmationSignUp} />
        {/* <RestrictedRoute path={adminRoot} /> */}

        <Route path={adminRoot} component={isLoggedIn ? Admin : Login} />

        {isLoggedIn ? (
          <Redirect to={users} />
        ) : (
          <Route exact path={root} component={Login} />
        )}
      </Switch>
    </ConnectedRouter>
  );
};

export default MainRouter;
