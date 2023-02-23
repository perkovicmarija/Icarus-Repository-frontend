import React from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { TextValidator } from 'react-material-ui-form-validator';
import { injectIntl, defineMessages  } from 'react-intl';

import IntlMessages from '../IntlMessages';

const useStyles = makeStyles(theme => ({
    textField: {
        height: 'unset'
    }
}));

function TextFieldValidation(props) {
    const classes = useStyles();

    const {multiline, disabled, rows, id, label, name, value, onInputChange, placeholder, type, validators, errorMessages, required, intl} = props;

    const messages = defineMessages({
        placeholder: {
            id: placeholder,
        },
    });

    return (
        <TextValidator
            disabled={disabled}
            id={id}
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
                classes: {
                    input: classes.textField,
                },
            }}
            placeholder={placeholder && placeholder !== "" ? intl.formatMessage(messages.placeholder) : undefined}
            fullWidth
            margin="dense"
            type={type}
            validators={validators}
            errorMessages={errorMessages ? errorMessages : "This field is required"}
            required={required}
        />
    )
}

TextFieldValidation.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.node,
    onInputChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default injectIntl(TextFieldValidation);