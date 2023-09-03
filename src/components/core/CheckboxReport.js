import React from 'react';
import {Checkbox} from "@mui/material";

function CheckboxReport(props) {

    const {checked, disabled, onCheckboxChange, value} = props;

    return (
        <Checkbox
            disabled={disabled}
            checked={checked ? checked : false}
            onChange={onCheckboxChange(value)}
            value={value}
            color="secondary"
        />
    )
}

export default CheckboxReport;