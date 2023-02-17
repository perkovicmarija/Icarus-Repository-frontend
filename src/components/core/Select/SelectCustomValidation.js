import React from 'react';

import { MenuItem, Input } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { SelectValidator } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';

import IntlMessages from '../IntlMessages';

const useStyles = makeStyles(theme => ({
    formControl: {
        display: 'flex',
        minWidth: 120,
    }
}));

function SelectCustomValidation(props) {
    const classes = useStyles();

    const {disabled, value, name, selectArray, optionProp, optionKey, label, onSelectChange, validators, errorMessages, required, translate} = props;

    return (
        <SelectValidator
            name={name}
            value={value ? value[optionKey] : ""}
            onChange={(evt) => onSelectChange(evt, optionKey, selectArray)}
            validators={validators}
            errorMessages={errorMessages}
            label={<IntlMessages id={label}/>}
            fullWidth
            disabled={disabled}
            required={required}
            SelectProps={{
                MenuProps: {
                    className: classes.formControl,
                },
            }}
            input={<Input name={name} id={name + "-helper"}/>}
        >
            {selectArray.map(item => {
                const getMenuItem = () => {
                    if(translate) {
                        return (
                            <MenuItem key={item[optionKey]} value={item[optionKey]}>{<IntlMessages id={item[optionProp]}/>}</MenuItem>
                        )
                    } else {
                        return (
                            <MenuItem key={item[optionKey]} value={item[optionKey]}>{item[optionProp]}</MenuItem>
                        )
                    }
                }
                return (
                    getMenuItem()
                )
            })}
        </SelectValidator>
    )
}

SelectCustomValidation.propTypes = {
    name: PropTypes.string.isRequired,
    selectArray: PropTypes.array.isRequired,
    optionProp: PropTypes.string.isRequired,
    optionKey: PropTypes.string.isRequired,
    onSelectChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

export default SelectCustomValidation;