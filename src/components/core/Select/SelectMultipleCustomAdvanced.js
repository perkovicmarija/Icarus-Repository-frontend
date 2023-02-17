import React from 'react';

import {
    InputLabel,
    Checkbox,
    ListItemText,
    MenuItem,
    FormControl,
    Button,
    Select,
    OutlinedInput
} from '@mui/material';
import PropTypes from 'prop-types';
import { injectIntl, defineMessages  } from 'react-intl';

import IntlMessages from '../IntlMessages';

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

function SelectMultipleCustomAdvanced(props) {

    const checkInArray = (id) => {
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

    const {
        disabled,
        title,
        firstLvlValueProp,
        secondLvlValueProp,
        selectArray,
        optionProp,
        optionKey,
        objectArray,
        onMultiSelectChange,
        translate,
        intl
    } = props;

    return (
        <FormControl fullWidth disabled={disabled}>
            <InputLabel id="select-multiple-checkbox-label"><IntlMessages id={title} /></InputLabel>
            <Select
                multiple
                labelId="select-multiple-checkbox-label"
                value={selectArray.map(item => secondLvlValueProp ? item[firstLvlValueProp][secondLvlValueProp] : item[firstLvlValueProp])}
                onChange={onMultiSelectChange}
                input={<OutlinedInput label={<IntlMessages id={title} />}/>}
                renderValue={selected => selected.map(elem => {
                    let object = objectArray.find(item => item[optionKey] === elem);
                    if(object) {
                        if(translate) {
                            const messages = defineMessages({
                                placeholder: {
                                    id: object[optionProp],
                                },
                            });
                            return intl.formatMessage(messages.placeholder)
                        } else {
                            return object[optionProp];
                        }
                    } else {
                        return "";
                    }
                }).join(", ")}
                MenuProps={MenuProps}
            >
                <Button value="SelectAll">Select all</Button>
                <Button value="DeselectAll">Deselect all</Button>
                {objectArray.map(item => (
                    <MenuItem key={item[optionKey]} value={item[optionKey]}>
                        <Checkbox checked={checkInArray(item[optionKey])}/>
                        {translate ? <ListItemText primary={<IntlMessages id={item[optionProp]}/>} /> : <ListItemText primary={item[optionProp]} />}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

SelectMultipleCustomAdvanced.propTypes = {
    selectArray: PropTypes.array.isRequired,
    optionProp: PropTypes.string.isRequired,
    optionKey: PropTypes.string.isRequired,
    onMultiSelectChange: PropTypes.func.isRequired
}

export default injectIntl(SelectMultipleCustomAdvanced);