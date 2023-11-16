import { makeStyles } from "@mui/styles";
import { Grid, Button } from "@mui/material";
import "../../assets/css/App.css";
import bgImageLogo from "../../images/login/icarus-zlatno.png";
import IntlMessages from "../../components/core/IntlMessages";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import TextField2 from "../../components/core/Fields/TextField2";
import { useForm } from "react-hook-form";
import { useState } from "react";

const useStyles = makeStyles((theme: any) => ({
  logoCenter: {
    marginTop: theme.spacing(5),
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  },
  container: {
    flexGrow: 1,
    margin: theme.spacing(3),
  },
}));

const LoginForm = ({ onSubmit, onForgotPasswordClick }: any) => {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit, control } = useForm({
    defaultValues: {},
  });
  const [loading, setLoading] = useState(false);

  return (
    <>
      <img
        alt=""
        className={classes.logoCenter}
        width="250"
        height="330"
        src={bgImageLogo}
      />

      <form
        onSubmit={(e) => {
          e.stopPropagation();
          handleSubmit((data) => {
            setLoading(true);
            onSubmit(data as any)
              //.then(onClose)
              .catch(() => setLoading(false));
          })(e);
        }}
      >
        <Grid
          container
          justifyContent="center"
          spacing={2}
          style={{ width: "100%", maxWidth: "300px", margin: "1rem auto" }}
        >
          <Grid item xs={12}>
            <TextField2
              control={control}
              label="form.username"
              name="username"
              textFieldProps={{
                InputProps: {
                  sx: {
                    "::before, ::after": {
                      borderBottomColor: "white !important",
                    },
                  },
                },
                inputProps: {
                  sx: {
                    fontSize: "16px !important",
                    fontFamily: "Roboto !important",
                    color: "white !important",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <div style={{ display: "flex" }}>
              <TextField2
                control={control}
                label="form.password"
                name="password"
                textFieldProps={{
                  type: showPassword ? "text" : "password",
                  InputProps: {
                    sx: {
                      "::before, ::after": {
                        borderBottomColor: "white !important",
                      },
                    },
                  },
                  inputProps: {
                    sx: {
                      fontSize: "16px !important",
                      fontFamily: "Roboto !important",
                      color: "white !important",
                    },
                  },
                }}
              />
              <IconButton
                aria-label="Toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  alignSelf: "flex-end",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                }}
              >
                {showPassword ? (
                  <VisibilityOff style={{ color: "white" }} />
                ) : (
                  <Visibility style={{ color: "white" }} />
                )}
              </IconButton>
            </div>
          </Grid>

          <Grid item xs={12} sx={{ textAlign: "center", marginTop: "1rem" }}>
            <Button type="submit" sx={{ color: "#c3922e" }}>
              <IntlMessages id="page.signInButton" />
            </Button>
          </Grid>

          <Grid item xs={12} sx={{ textAlign: "center", marginTop: "2rem" }}>
            <Button
              onClick={onForgotPasswordClick}
              sx={{
                color: "white",
                fontWeight: "300",
                fontSize: "12px",
              }}
            >
              <IntlMessages id="general.forgotPassword" />
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default LoginForm;
