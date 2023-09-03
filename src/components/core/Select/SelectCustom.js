import React from 'react';
import {makeStyles} from "@mui/styles";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import IntlMessages from "../IntlMessages";
import PropTypes from "prop-types";
import { Input } from '@mui/material';

const useStyles = makeStyles(theme => ({
    formControl: {
        display: 'flex',
        minWidth: 120,
    },
    select: {
        paddingTop: '0px'
    },
    selectMenu: {
        paddingTop: '0px'
    }
}));

function SelectCustom(props) {
    const classes = useStyles();

    const {disabled, value, name, selectArray, optionProp, optionKey, label, onSelectChange, translate} = props;

    return (
        <FormControl className={classes.formControl} disabled={disabled}>
            <InputLabel htmlFor={name + "-helper"}><IntlMessages id={label}/></InputLabel>
            <Select
                classes={{
                    select: classes.select
                }}
                value={value ? value[optionKey] : ""}
                onChange={(evt) => onSelectChange(evt, optionKey)}
                input={<Input name={name} id={name + "-helper"}/>}
            >
                {selectArray.map(item => {
                    if(translate) {
                        return (
                            <MenuItem key={item[optionKey]} value={item[optionKey]}>{<IntlMessages id={item[optionProp]}/>}</MenuItem>
                        )
                    } else {
                        return (
                            <MenuItem key={item[optionKey]} value={item[optionKey]}>{item[optionProp]}</MenuItem>
                        )
                    }
                })}
            </Select>
        </FormControl>
    )
}

SelectCustom.propTypes = {
    name: PropTypes.string.isRequired,
    selectArray: PropTypes.array.isRequired,
    optionProp: PropTypes.string.isRequired,
    optionKey: PropTypes.string.isRequired,
    onSelectChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

export default SelectCustom;