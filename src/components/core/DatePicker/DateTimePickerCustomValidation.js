import React from "react";
import {IconButton, InputAdornment, Typography} from "@mui/material";
import IntlMessages from "../IntlMessages";
import DateTimePickerValidation from "./DateTimePickerValidation";
import {DateRange, NavigateBefore, NavigateNext, QueryBuilder} from "@mui/icons-material";
import {makeStyles} from "@mui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    dateTimePicker: {
        width: '100%'
    }
}));

const DateTimePickerCustomValidation = (props) => {
    const classes = useStyles();
    const {
        title,
        value,
        name,
        onDateTimeChange,
        disabled,
        disablePast,
        minDate,
        maxDate,
        validators
    } = props;

    return (
        <div className={classes.root}>
            <Typography variant="button">
                <IntlMessages id={title}/>
            </Typography>
            <DateTimePickerValidation
                className={classes.dateTimePicker}
                disabled={disabled}
                value={value ? value : null}
                minDate={minDate ? minDate : undefined}
                maxDate={maxDate ? maxDate : undefined}
                disablePast={disablePast ? disablePast : null}
                onChange={onDateTimeChange(name)}
                label={<IntlMessages id="general.dateTime.label"/>}
                leftArrowIcon={<NavigateBefore/>}
                rightArrowIcon={<NavigateNext/>}
                dateRangeIcon={<DateRange/>}
                timeIcon={<QueryBuilder/>}
                validators={validators}
                errorMessages={[<IntlMessages id="general.validation" />]}
                format="DD-MMM-YYYY HH:mm"
                ampm={false}
                clearable
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <DateRange/>
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
}

DateTimePickerCustomValidation.propsTypes = {
    onDateTimeChange: PropTypes.func.isRequired
}
export default DateTimePickerCustomValidation;