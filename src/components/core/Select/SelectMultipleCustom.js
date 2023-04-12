import React from 'react';

import { makeStyles } from '@mui/styles';
import {
    InputLabel,
    Checkbox,
    ListItemText,
    MenuItem,
    FormControl,
    Select,
    OutlinedInput
} from '@mui/material';
import PropTypes from 'prop-types';

import IntlMessages from '../IntlMessages';

const useStyles = makeStyles(theme => ({
    formControl: {
        display: 'flex',
        minWidth: 120,
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function SelectMultipleCustom(props) {
    // const classes = useStyles();

    const checkInArray = id => {
        for (let i = 0, l = props.selectArray.length; i < l; i++) {
            let selectedObject = props.selectArray[i];
            if (props.secondLvlValueProp) {
                if (selectedObject[props.firstLvlValueProp][props.secondLvlValueProp] === id) {
                    return true;
                }
            } else {
                if (selectedObject[props.firstLvlValueProp] === id) {
                    return true;
                }
            }
        }
        return false;
    }
    const {disabled, title, firstLvlValueProp, secondLvlValueProp, selectArray, optionProp, optionKey, objectArray, onMultiSelectChange} = props;

    return (
        <FormControl fullWidth disabled={disabled}>
            <InputLabel htmlFor="select-multiple-checkbox"><IntlMessages id={title} /></InputLabel>
            <Select
                multiple
                value={selectArray.map(item => secondLvlValueProp ? item[firstLvlValueProp][secondLvlValueProp] : item[firstLvlValueProp])}
                onChange={onMultiSelectChange}
                input={<OutlinedInput label={<IntlMessages id={title} />}/>}
                renderValue={selected => selected.map(elem => {
                    let object = objectArray.find(item => item[optionKey] === elem);
                    if (object) {
                        return object[optionProp];
                    } else {
                        return "";
                    }
                }).join(", ")}
                MenuProps={MenuProps}
            >
                {objectArray.map(item => (
                    <MenuItem key={item[optionKey]} value={item[optionKey]}>
                        <Checkbox checked={checkInArray(item[optionKey])}/>
                        <ListItemText primary={item[optionProp]}/>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

SelectMultipleCustom.propTypes = {
    selectArray: PropTypes.array.isRequired,
    optionProp: PropTypes.string.isRequired,
    optionKey: PropTypes.string.isRequired,
    onMultiSelectChange: PropTypes.func.isRequired
}

export default SelectMultipleCustom;