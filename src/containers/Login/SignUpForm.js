import React from 'react';

import { Grid, Button} from '@mui/material';
import { withStyles } from '@mui/styles';
import { ValidatorForm } from 'react-material-ui-form-validator';

import TextFieldValidation from '../../components/core/TextField/TextFieldValidation';
import TextFieldValidationPassword from '../../components/core/TextField/TextFieldValidationPassword';
import FormFieldTitle from '../../components/core/Typography/FormFieldTitle';
import withValidation from '../../components/core/HOC/withValidation';

const styles = theme => ({
    productsFrame: {
        marginTop: theme.spacing(3)
    },
})

function SignUpForm(props) {

    const {
        onValidationError,
        onSubmit,
        signUpData,
        onInputChange
    } = props;

    return (
        <ValidatorForm
            noValidate
            autoComplete="off"
            onError={onValidationError}
            onSubmit={onSubmit}>

            <Grid container spacing={2}>
                <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                    <FormFieldTitle title="Email" />
                    <TextFieldValidation
                        disabled={false}
                        id="email"
                        label="Email"
                        name="email"
                        value={signUpData.email}
                        onInputChange={onInputChange}
                        placeholder="Email"
                        type="email"
                        validators={['required', 'isEmail']}
                        errorMessages={['This field is required', 'Email is not valid']}
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
                        value={signUpData.password}
                        onInputChange={onInputChange}
                        placeholder="Password"
                        validators={['required', 'matchRegexp:^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$']}
                        errorMessages={['This field is required', 'Invalid number']}
                        required
                    />
                </Grid>
                <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                    <FormFieldTitle title="First name" />
                    <TextFieldValidation
                        disabled={false}
                        id="firstName"
                        label="First name"
                        name="firstName"
                        value={signUpData.firstName}
                        onInputChange={onInputChange}
                        placeholder="First name"
                        type="text"
                    />
                </Grid>
                <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                    <FormFieldTitle title="Last name" />
                    <TextFieldValidation
                        disabled={false}
                        id="lastName"
                        label="Last name"
                        name="lastName"
                        value={signUpData.lastName}
                        onInputChange={onInputChange}
                        placeholder="Last name"
                        type="text"
                    />
                </Grid>
                <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                    <Button variant="contained" color="primary" type="submit">Submit</Button>
                </Grid>
            </Grid>
        </ValidatorForm>
    );


}

export default withStyles(styles, { withTheme: true })(withValidation(SignUpForm));