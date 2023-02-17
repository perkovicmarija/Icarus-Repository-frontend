import React from 'react';

import { Button, DialogActions, DialogContent, Grid  } from '@mui/material';
import { ValidatorForm } from 'react-material-ui-form-validator';

import TextFieldValidation from '../../components/core/TextField/TextFieldValidation';
import withValidation from '../../components/core/HOC/withValidation';
import FormFieldTitle from '../../components/core/Typography/FormFieldTitle';

function ForgotPwdDialogForm(props) {

    const {
        onClose,
        onValidationError,
        onSubmit,
        onInputChange,
        email
    } = props;

    return (
        <ValidatorForm
            noValidate
            autoComplete="off"
            onError={onValidationError}
            onSubmit={onSubmit}>
            <DialogContent>
                <Grid container spacing={16}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        New password will be sent to your email
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <FormFieldTitle title="Enter your email"/>
                        <TextFieldValidation
                            disabled={false}
                            id="email"
                            label="Email"
                            name="email"
                            value={email}
                            onInputChange={onInputChange}
                            placeholder="Email"
                            type="text"
                            validators={['isEmail']}
                            errorMessages={['Email is not valid']}
                            required
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    close
                </Button>
                <Button variant="outlined" color="primary" type="submit">
                    SUBMIT
                </Button>
            </DialogActions>
        </ValidatorForm>
    );
}

export default withValidation(ForgotPwdDialogForm);