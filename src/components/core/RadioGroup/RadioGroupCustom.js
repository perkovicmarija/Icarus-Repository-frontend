import React, {Component} from 'react';
import {makeStyles} from "@mui/styles";
import {FormControlLabel, FormLabel, Typography} from "@mui/material";
import IntlMessages from "../IntlMessages";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import PropTypes from "prop-types";
import TypographyFieldTitle from "../TypographyFieldTitle";


const useStyles = makeStyles(theme => ({
    group: {
        margin: `${theme.spacing(1)}px 0`
    },
    label: {
        color: '#000000 !important',
    },
}));

function RadioGroupCustom(props) {
    const classes = useStyles();

    const { row, value, name, onChange, disabled, label, sublabel, options } = props;
    return (
        <div>
            {label && <FormLabel component="legend" className={classes.label}><TypographyFieldTitle title={label}/></FormLabel>}
            {sublabel && <Typography variant="body1" gutterBottom><IntlMessages id={sublabel}/></Typography>}
            <RadioGroup
                row={row}
                aria-label={name}
                name={name}
                className={classes.group}
                value={value? value : ""}
                onChange={onChange}
            >
                {options.map(item => {
                    return (
                        <FormControlLabel key={item.value} value={item.value} control={<Radio disabled={disabled}/>}
                                          label={<IntlMessages id={item.label}/>}/>
                    )
                })}

            </RadioGroup>
        </div>
    )
}

RadioGroupCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default RadioGroupCustom;