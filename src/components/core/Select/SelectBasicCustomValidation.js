import React from 'react';
import {makeStyles} from "@mui/styles";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import IntlMessages from "../IntlMessages";
import {Input} from "@mui/icons-material";
import PropTypes from "prop-types";
import {SelectValidator} from 'react-material-ui-form-validator'

const useStyles = makeStyles(theme => ({
    formControl: {
        display: 'flex',
        minWidth: 120,
    }
}));

function SelectBasicCustomValidation(props) {
    const classes = useStyles();

    const {disabled, value, name, selectArray, label, onSelectChange, validators, errorMessages, required, translate} = props;

    return (
        <SelectValidator
            name={name}
            value={value ? value : ""}
            onChange={onSelectChange}
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
                return (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                )
            })}
        </SelectValidator>
    )
}

SelectBasicCustomValidation.propTypes = {
    name: PropTypes.string.isRequired,
    selectArray: PropTypes.array.isRequired,
    onSelectChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

export default SelectBasicCustomValidation;