import React, { useState } from 'react';

import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TextValidator } from 'react-material-ui-form-validator';
import { injectIntl, defineMessages  } from 'react-intl';
import PropTypes from 'prop-types';

import IntlMessages from '../IntlMessages';

function TextFieldValidationPassword(props) {

    const [showPassword, setShowPassword] = useState(false);

    function handleClickShowPassword() {
        setShowPassword(!showPassword);
    }

    const {multiline, disabled, rows, id, label, name, value, onInputChange, placeholder, validators, errorMessages, required, intl} = props;

    const messages = defineMessages({
        placeholder: {
            id: placeholder,
        },
    });

    return (
        <TextValidator
            disabled={disabled}
            id={id}
            variant={"standard"}
            label={label && label !== "" ? <IntlMessages id={label}/> : ""}
            name={name}
            value={value ? value : ""}
            onChange={(event) => onInputChange(event)}
            multiline={multiline}
            rows={multiline ? rows : undefined}
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                endAdornment :
                    <InputAdornment position="end">
                        <IconButton aria-label="Toggle password visibility" onClick={handleClickShowPassword}>
                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>

            }}
            placeholder={placeholder && placeholder !== "" ? intl.formatMessage(messages.placeholder) : undefined}
            fullWidth
            margin="dense"
            type={showPassword ? 'text' : 'password'}
            validators={validators}
            errorMessages={errorMessages}
            required={required}
        />
    )
}

TextFieldValidationPassword.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.node,
    onInputChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
}
export default injectIntl(TextFieldValidationPassword);