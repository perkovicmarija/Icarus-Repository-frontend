import React, { useState } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@mui/styles';
import { Grid, Button, Typography, Paper } from '@mui/material';

import TextFieldValidation from '../../components/core/TextField/TextFieldValidation';
import authAction from '../../redux/auth/authActions';
import { ValidatorForm } from 'react-material-ui-form-validator';
import withValidation from '../../components/core/HOC/withValidation';

const styles = theme => ({
    root: {
        height: '100vh',
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        backgroundColor: theme.palette.primary.light
    },
    paperRoot: {
        padding: theme.spacing(5),
    }
})

function ConfirmSignUp(props) {

    const [confirmationData, setConfirmationData] = useState({});

    function onSubmit() {
        let viewModel = {
            email: props.userSignUp.email,
            confirmationCode: confirmationData.confirmationCode
        }
        props.authAction.confirmSignUp(viewModel);
    }

    function onInputChange(name, event) {
        let confirmationDataCone = Object.assign({}, confirmationData);
        confirmationDataCone[name] = event.target.value;
        setConfirmationData(confirmationDataCone);
    }

    const {
        classes,
        onValidationError
    } = props;

    return(
        <div className={classes.root}>
            <Grid container justify="center" alignItems="center">
                <Grid item xl={4} lg={4} md={6} sm={8} xs={10}>
                    <Paper className={classes.paperRoot}>
                        <Grid container spacing={16} justify="center" alignItems="center">
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Grid container justify="center" alignItems="center">
                                    <Typography variant="h5" gutterBottom>
                                        Confirmation code is sent to your email
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Grid container justify="center" alignItems="center">
                                    <Typography variant="subtitle1" gutterBottom>
                                        Please enter your confirmation code
                                    </Typography>
                                </Grid>
                            </Grid>
                            <ValidatorForm
                                noValidate
                                autoComplete="off"
                                onError={onValidationError}
                                onSubmit={onSubmit}>
                                <Grid container spacing={16} justify="center" alignItems="center">
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <Grid container justify="center" alignItems="center">
                                            <TextFieldValidation
                                                disabled={false}
                                                id="confirmationCode"
                                                label="Code"
                                                name="confirmationCode"
                                                value={confirmationData.confirmationCode}
                                                onInputChange={onInputChange}
                                                placeholder="Code"
                                                type="text"
                                                validators={['required']}
                                                errorMessages={['This field is required']}
                                                required
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <Grid container justify="center" alignItems="center">
                                            <Button variant="outlined" color="primary" type="submit">
                                                SUBMIT
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </ValidatorForm>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

function mapStateToProps(state, ownProps) {
    return {
        userSignUp: state.Auth.userSignUp
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authAction: bindActionCreators(authAction, dispatch),
    };
}

export default withStyles(styles, { withTheme: true }) (connect(mapStateToProps, mapDispatchToProps) (withValidation(ConfirmSignUp)));