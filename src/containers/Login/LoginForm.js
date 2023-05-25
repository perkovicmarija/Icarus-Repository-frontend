import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Button } from '@mui/material';
import { ValidatorForm } from 'react-material-ui-form-validator';
import FormControl from '@mui/material/FormControl';
import withValidation from '../../components/core/HOC/withValidation';
import '../../assets/css/App.css';
import bgImageLogo from'../../images/login/icarus-zlatno.png';
import IntlMessages from "../../components/core/IntlMessages";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';

const useStyles = makeStyles(theme => ({
    forgotPwd: {
        cursor: 'pointer'
    },
    root: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },

    logoCenter: {
        marginTop: theme.spacing(5),
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block'
    },
    inputRoot: {
        color: theme.palette.common.white,
    },
    container: {
        flexGrow: 1,
        margin: theme.spacing(3),
    },
    formControl: {
        margin: theme.spacing(1),
    },
    cssLabel: {
        '&$cssFocused': {
            color: theme.palette.secondary.main,
        },
        color: theme.palette.common.white,
    },
    cssFocused: {},
    cssUnderline: {
        '&:before': {
            borderBottomColor: theme.palette.common.white,
        },
        '&:after': {
            borderBottomColor: theme.palette.secondary.main,
        },
    },
    forgotPassword: {
        marginTop: theme.spacing(1),
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
        color:'white',
        fontWeight: '100',
        fontSize:'12px',
    },
}));

const LoginForm = (props) => {
    const classes = useStyles();

    const {
        onSubmit,
        user,
        onInputChange,
        onValidationError,
        onForgotPasswordClick,
        onClickShowPassword,
        showPassword
    } = props;

    return (
        <ValidatorForm
            noValidate
            autoComplete="off"
            onError={onValidationError}
            onSubmit={onSubmit}>
            <img className={classes.logoCenter} width="250" height="330" src={bgImageLogo}/>
            <div className={classes.container}>
                <Grid container alignContent="center" alignItems="center" justify="center" spacing={2}>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel
                                    classes={{
                                        root: classes.cssLabel,
                                        focused: classes.cssFocused,
                                    }}
                                    htmlFor="username-css-input"
                                >
                                    <IntlMessages id="user.username"/>
                                </InputLabel>
                                <Input
                                    classes={{
                                        input: classes.inputRoot,
                                        underline: classes.cssUnderline,
                                    }}
                                    id="username-css-input"
                                    name={"username"}
                                    value={user.username}
                                    onChange={onInputChange}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel
                                    classes={{
                                        root: classes.cssLabel,
                                        focused: classes.cssFocused,
                                    }}
                                    htmlFor="password-css-input"
                                >
                                    <IntlMessages id="user.password"/>
                                </InputLabel>
                                <Input
                                    classes={{
                                        input: classes.inputRoot,
                                        underline: classes.cssUnderline,
                                    }}
                                    name={"password"}
                                    id="password-css-input"
                                    value={user.password}
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={onInputChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={onClickShowPassword}
                                            >
                                                {showPassword ? <VisibilityOff className="c-white" /> : <Visibility className="c-white" />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Button onClick={onForgotPasswordClick} className={classes.forgotPassword}>
                                <IntlMessages id="general.forgotPassword"/>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Button type="submit" className={classes.logoCenter} color="secondary">
                            <IntlMessages id="page.signInButton"/>
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </ValidatorForm>
    );
}

export default (withValidation(LoginForm));

