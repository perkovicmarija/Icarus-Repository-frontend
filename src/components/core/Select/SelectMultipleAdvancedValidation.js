import React, {Component} from 'react';
import {ValidatorForm} from 'react-material-ui-form-validator'
import SelectMultipleCustomAdvancedValidation2 from "./SelectMultipleAdvancedValidatorElement";
import PropTypes from "prop-types";


class SelectMultipleAdvancedValidation extends Component {
    componentDidMount() {
        ValidatorForm.addValidationRule('isTruthy', value => value);
    }

    render() {
        const {
            selectArray,
            required
        } = this.props;

        return (
            <SelectMultipleCustomAdvancedValidation2
                validators={required ? ['isTruthy'] : []}
                errorMessages={required ? ['This field is required'] : []}
                value={selectArray && selectArray.length > 0 ? selectArray : undefined}
                {...this.props}
            />
        )
    }
}

SelectMultipleAdvancedValidation.propTypes = {
    selectArray: PropTypes.array.isRequired,
    optionProp: PropTypes.string.isRequired,
    optionKey: PropTypes.string.isRequired,
    onMultiSelectChange: PropTypes.func.isRequired
}

export default SelectMultipleAdvancedValidation;