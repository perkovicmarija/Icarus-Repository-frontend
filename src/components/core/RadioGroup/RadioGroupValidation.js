import React from "react";
import { ValidatorComponent } from "react-material-ui-form-validator";
import {FormControl, FormHelperText} from "@mui/material";
import RadioGroupCustom from "./RadioGroupCustom";

class RadioGroupValidate extends ValidatorComponent {
    renderValidatorComponent() {
        const {
            errorMessages,
            validators,
            requiredError,
            helperText,
            validatorListener,
            required,
            ...rest
        } = this.props;
        const { isValid } = this.state;
        return (
            <FormControl component="fieldset" required={required} error={!isValid}>
                <RadioGroupCustom {...rest} />
                <FormHelperText>{(!isValid && this.getErrorMessage()) || helperText}</FormHelperText>
            </FormControl>
        );
    }
}

export default RadioGroupValidate;
