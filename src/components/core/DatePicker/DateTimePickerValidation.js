import React from "react";

import { DateTimePicker } from "@mui/lab";
import { ValidatorComponent } from "react-material-ui-form-validator";

class DateTimePickerValidation extends ValidatorComponent {
    render() {
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
            />
        );
    }
}

export default DateTimePickerValidation;
