import React from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {ValidatorComponent} from "react-material-ui-form-validator";

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
            <DatePicker
                {...rest}
                error={!isValid}
                helperText={(!isValid && this.getErrorMessage()) || helperText}
            />
        );
    }
}

export default DatePickerValidation;