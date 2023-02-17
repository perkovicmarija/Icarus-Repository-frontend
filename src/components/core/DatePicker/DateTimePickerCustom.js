import React from 'react';

import { makeStyles } from '@mui/styles';
import { IconButton, Typography, InputAdornment } from '@mui/material';
import { NavigateNext, NavigateBefore, DateRange, QueryBuilder } from '@mui/icons-material';
import PropTypes from 'prop-types';

import DateTimePickerValidation from './DateTimePickerValidation';
import IntlMessages from '../IntlMessages';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    }
}));

function DateTimePickerCustom(props) {
    const classes = useStyles();

    const {title, value, name, onDateTimeChange, disabled, validators, errorMessages, required} = props;

    return (
        <div className={classes.root}>
            <Typography variant="button" gutterBottom>
                <IntlMessages id={title}/>
            </Typography>
            <DateTimePickerValidation
                disabled={disabled}
                value={value ? value : null}
                name={name}
                onChange={onDateTimeChange(name)}
                label={<IntlMessages id="general.dateTime.label"/>}
                leftArrowIcon={<NavigateBefore/>}
                rightArrowIcon={<NavigateNext/>}
                dateRangeIcon={<DateRange/>}
                timeIcon={<QueryBuilder/>}
                format="DD-MMM-YYYY HH:mm"
                ampm={false}
                clearable={true}
                required={required}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <DateRange/>
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

DateTimePickerCustom.propTypes = {
    value: PropTypes.node,
    onDateTimeChange: PropTypes.func.isRequired
}
export default DateTimePickerCustom;