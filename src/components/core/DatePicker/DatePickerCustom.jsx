import React, {Component} from 'react';
import {IconButton, InputAdornment, Typography} from "@mui/material";
import IntlMessages from "../IntlMessages";
import DatePickerValidation from "./DatePickerValidation"
import {DateRange, NavigateBefore, NavigateNext, QueryBuilder} from "@mui/icons-material";
import {withStyles} from "@mui/styles";
import PropTypes from "prop-types";

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    }
})

class DatePickerCustom extends Component {

    render() {
        const {classes, title, value, name, onDateTimeChange, disabled, validators, errorMessages, required} = this.props;

        return (
            <div className={classes.root}>
                <Typography variant="button" gutterBottom>
                    <IntlMessages id={title}/>
                </Typography>
                <DatePickerValidation
                    disabled={disabled}
                    value={value ? value : null}
                    name={name}
                    onChange={onDateTimeChange(name)}
                    label={<IntlMessages id="general.date.label"/>}
                    leftArrowIcon={<NavigateBefore />}
                    rightArrowIcon={<NavigateNext />}
                    dateRangeIcon={<DateRange />}
                    timeIcon={<QueryBuilder />}
                    format="DD-MMM-YYYY"
                    fullWidth
                    ampm={false}
                    clearable={true}
                    required={required}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton>
                                    <DateRange />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    validators={validators}
                    errorMessages={errorMessages}
                />
            </div>
        )
    }
}

DatePickerCustom.propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.node,
    onDateTimeChange: PropTypes.func.isRequired
}
export default withStyles(styles) (DatePickerCustom);