import { Route, Redirect } from "react-router-dom";
import authAction from "./redux/auth/authActions";
import * as Protected from "./protectedAuth";
import { useAppDispatch } from "./redux/store";

const ProtectedRoute = ({
  component: Component,
  protectedAuthorities,
  ...rest
}: any) => {
  const dispatch = useAppDispatch();

  const hasAuthority = (protectedAuthorities: any) => {
    if (!localStorage.getItem("authorities")) {
      return false;
    }
    if (Protected.protectedAuth(protectedAuthorities)) {
      return true;
    }
    dispatch(authAction.logout());
    return false;
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        hasAuthority(protectedAuthorities) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
