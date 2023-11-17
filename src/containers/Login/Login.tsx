import { useState } from "react";
import { Redirect } from "react-router-dom";
import SnackbarSuccess from "../../components/core/Snackbar/SnackbarSuccess";
import SnackbarFailed from "../../components/core/Snackbar/SnackbarFailed";
import LoginForm from "./LoginForm";
//import SignUpForm from "./SignUpForm";
import ForgotPwdDialogForm from "./ForgotPwdDialogForm";
import DialogFormFrame from "../../components/core/Dialog/DialogFormFrame";
import authAction from "../../redux/auth/authActions";
import { adminRoot } from "../../consts/routePaths";
import "../../assets/css/App.css";
import { makeStyles } from "@mui/styles";
import bgImage from "../../images/icarus_bg.jpg";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { TODO } from "../../components/core/TODO";

const useStyles = makeStyles(() => ({
  background: {
    flex: 1,
    background: `url(${bgImage}) repeat center center`,
  },
}));

function Login() {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const isLoggedIn = useAppSelector((state) => state.Auth.token !== null);

  const [showLogin, /* setShowLogin */] = useState(true);

  const [dialogForgotPassword, setDialogForgotPassword] = useState<any>();

  /* const [signUpData, setSignUpData] = useState({});

  const handleChangeSignUpData = (name, event) => {
    let signUpDataClone = Object.assign({}, signUpData);
    signUpDataClone[name] = event.target.value;
    setSignUpData(signUpDataClone);
  }; */

  function handleLogin(payload: any) {
    dispatch(authAction.login(payload));
  }

  if (isLoggedIn) {
    return <Redirect to={adminRoot} />;
  }

  return (
    <div className="App">
      <SnackbarSuccess />
      <SnackbarFailed />

      <div className={classes.background}>
        {showLogin ? (
          <LoginForm
            onSubmit={handleLogin}
            onForgotPasswordClick={() => setDialogForgotPassword({})}
          />
        ) : (
          <TODO />
        )}
      </div>

      <DialogFormFrame
        onClose={() => setDialogForgotPassword(undefined)}
        title="Forgot your password?"
        open={dialogForgotPassword}
      >
        <ForgotPwdDialogForm
          onClose={() => setDialogForgotPassword(undefined)}
          onSubmit={(payload: any) =>
            dispatch(authAction.forgotUserPassword(payload))
          }
        />
      </DialogFormFrame>
    </div>
  );
}

export default Login;
