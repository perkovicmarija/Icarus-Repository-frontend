import React from "react";
import { DateTimePicker } from '@mui/x-date-pickers';
import { ValidatorComponent } from "react-material-ui-form-validator";
import TextField from "@mui/material/TextField";

class DateTimePickerValidation extends ValidatorComponent {
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
            <DateTimePicker
                {...rest}
                error={!isValid}

                helperText={(!isValid && this.getErrorMessage()) || helperText}
                renderInput={(params) => <TextField {...params} />}
            />
        );
    }
}

export default DateTimePickerValidation;
