import React from 'react';
import PropTypes from 'prop-types';
import {ValidatorComponent} from "react-material-ui-form-validator";
import {Checkbox, FormControl, FormHelperText, InputLabel, ListItemText, MenuItem, Select} from "@mui/material";
import IntlMessages from "../IntlMessages";
import { Input } from '@mui/material';
import Button from "@mui/material/Button";
import {defineMessages, injectIntl} from "react-intl";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class SelectMultipleAdvancedValidatorElement extends ValidatorComponent {
    checkInArray(id) {
        for (let i = 0, l = this.props.selectArray.length; i < l; i++) {
            let selectedObject = this.props.selectArray[i];
            if (this.props.secondLvlValueProp) {
                if (selectedObject[this.props.firstLvlValueProp][this.props.secondLvlValueProp] === id) {
                    return true;
                }
            } else {
                if (selectedObject[this.props.firstLvlValueProp] === id) {
                    return true;
                }
            }
        }
        return false;
    }

    renderValidatorComponent() {
        const {
            disabled,
            required,
            title,
            firstLvlValueProp,
            secondLvlValueProp,
            selectArray,
            optionProp,
            optionKey,
            objectArray,
            onMultiSelectChange,
            translate,
            intl,
            helperText,
        } = this.props;

        const {isValid} = this.state;
        return (
            <React.Fragment>
                <FormControl fullWidth disabled={disabled} required={required} error={!isValid}>
                    <InputLabel htmlFor="select-multiple-checkbox"><IntlMessages id={title}/></InputLabel>
                    <Select
                        ref={(r) => {
                            this.input = r;
                        }}
                        multiple
                        disabled={disabled}
                        value={selectArray.map(item => secondLvlValueProp ? item[firstLvlValueProp][secondLvlValueProp] : item[firstLvlValueProp])}
                        onChange={onMultiSelectChange}
                        input={<Input name={firstLvlValueProp} id={firstLvlValueProp + "-helper"}/>}
                        renderValue={selected => selected.map(elem => {
                            let object = objectArray.find(item => item[optionKey] === elem);
                            if (object) {
                                if (translate) {
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
                        <Button value="SelectAll"><IntlMessages id="general.selectAll"/></Button>
                        <Button value="DeselectAll"><IntlMessages id="general.deselectAll"/></Button>
                        {objectArray.map(item => (
                            <MenuItem key={item[optionKey]} value={item[optionKey]}>
                                <Checkbox checked={this.checkInArray(item[optionKey])}/>
                                {translate ? <ListItemText primary={<IntlMessages id={item[optionProp]}/>}/> :
                                    <ListItemText primary={item[optionProp]}/>}

                            </MenuItem>
                        ))}
                    </Select>
                    {!isValid && <FormHelperText>{(!isValid && this.getErrorMessage()) || helperText}</FormHelperText>}
                </FormControl>
            </React.Fragment>
        )
    }
}

SelectMultipleAdvancedValidatorElement.propTypes = {
    selectArray: PropTypes.array.isRequired,
    optionProp: PropTypes.string.isRequired,
    optionKey: PropTypes.string.isRequired,
    onMultiSelectChange: PropTypes.func.isRequired
}

export default injectIntl(SelectMultipleAdvancedValidatorElement);