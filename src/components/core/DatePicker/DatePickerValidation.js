import React from "react";
import DatePicker from '@mui/lab/DatePicker';
import {ValidatorComponent} from "react-material-ui-form-validator";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {TextField} from "@mui/material";

class DatePickerValidation extends ValidatorComponent {
    renderValidatorComponent() {
        const {
            errorMessages,
            validators,
            requiredError,
            helperText,
            validatorListener,
            ...rest
        } = this.props;
        const { isValid } = this.state;
        return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    renderInput={(props) => (
                        <TextField {...props}/>
                    )}
                    {...rest}
                    error={!isValid}
                    helperText={(!isValid && this.getErrorMessage()) || helperText}
                />
            </LocalizationProvider>
        );
    }
}

export default DatePickerValidation;