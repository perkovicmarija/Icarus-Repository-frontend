import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import IntlMessages from '../../../components/core/IntlMessages';
import {injectIntl, defineMessages} from 'react-intl';


function TextFieldMultiline(props) {

    const {
        intl,
        disabled,
        id,
        label,
        name,
        value,
        onInputChange,
        placeholder,
        type,
        rows,
        overrideColor
    } = props;


    const messages = defineMessages({
        placeholder: {
            id: placeholder,
        },
    });

    return (
        <TextField
            disabled={disabled}
            multiline
            variant={"standard"}
            rows={rows}
            name={name}
            rowsmax={'Infinity'}
            id={id}
            label={label && label !== "" ? <IntlMessages id={label}/> : undefined}
            value={value === null ? '' : value || ''}
            onChange={onInputChange}
            placeholder={placeholder && placeholder !== "" ? intl.formatMessage(messages.placeholder) : undefined}
            fullWidth
            margin="dense"
            type={type}
            InputProps={overrideColor && {
                style: {color: '#02265F'}
            }}
            InputLabelProps={{
                shrink: true,
            }}
        />
    )
}

TextFieldMultiline.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.node,
    onInputChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default (injectIntl(TextFieldMultiline));