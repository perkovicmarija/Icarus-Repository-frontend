import { Route, Redirect, useHistory } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import Admin from "./containers/Admin/Admin";
import FourZeroFour from "./containers/404/FourZeroFour";
import Login from "./containers/Login/Login";
import ConfirmationSignUp from "./containers/Login/ConfirmSignUp";
import {
  root,
  fourZeroFour,
  signIn,
  adminRoot,
  confirmationCode,
  auditChecklistOverview,
} from "./consts/routePaths";
import { useAppSelector } from "./redux/store";

const RestrictedRoute = ({
  component: Component,
  isLoggedIn,
  ...rest
}: any) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: signIn,
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
const PublicRoutes = ({ history }: any) => {
  const isLoggedIn = useAppSelector((state) => state.Auth.token !== null);

  return (
    <ConnectedRouter history={history}>
      <div>
        <Route exact path={root} component={Login} />
        <Route
          exact
          path={fourZeroFour}
          component={() => <FourZeroFour homePath={auditChecklistOverview} />}
        />
        <Route exact path={signIn} component={Login} />
        <Route exact path={confirmationCode} component={ConfirmationSignUp} />
        <RestrictedRoute
          path={adminRoot}
          component={Admin}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </ConnectedRouter>
  );
};

export default PublicRoutes;
