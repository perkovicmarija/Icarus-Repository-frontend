import React from 'react';

import { makeStyles } from '@mui/styles';
import { Grid, Button } from '@mui/material';
import { ValidatorForm } from 'react-material-ui-form-validator';

import TextFieldValidation from '../../components/core/TextField/TextFieldValidation';
import TextFieldValidationPassword from '../../components/core/TextField/TextFieldValidationPassword';
import FormFieldTitle from '../../components/core/Typography/FormFieldTitle';
import withValidation from '../../components/core/HOC/withValidation';
import '../../assets/css/App.css';

const useStyles = makeStyles(theme => ({
    forgotPwd: {
        cursor: 'pointer'
    }
}));

function LoginForm(props) {
    const classes = useStyles();

    const {
        onSubmit,
        user,
        onInputChange,
        onValidationError,
        onForgotPasswordClick
    } = props;

    return (
        <ValidatorForm
            noValidate
            autoComplete="off"
            onError={onValidationError}
            onSubmit={onSubmit}>

            <Grid container spacing={2}>
                <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                    <FormFieldTitle title="Username" />
                    <TextFieldValidation
                        disabled={false}
                        id="username"
                        label="Username"
                        name="username"
                        value={user.username}
                        onInputChange={onInputChange}
                        placeholder="Username"
                        type="text"
                        validators={['required']}
                        errorMessages={['This field is required']}
                        required
                    />
                </Grid>
                <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                    <FormFieldTitle title="Password" />
                    <TextFieldValidationPassword
                        disabled={false}
                        id="password"
                        label="Password"
                        name="password"
                        value={user.password}
                        onInputChange={onInputChange}
                        placeholder="Password"
                        validators={['required']}
                        errorMessages={['This field is required']}
                        required
                    />
                </Grid>
                <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                    <a className={classes.forgotPwd} onClick={onForgotPasswordClick}>Forgot your password?</a>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Button variant="contained" color="primary" type="submit">Submit</Button>
                </Grid>
            </Grid>
        </ValidatorForm>
    );
}

export default (withValidation(LoginForm));

