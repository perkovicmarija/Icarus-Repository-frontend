import React from 'react';

import { DialogActions, DialogContent, Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import IntlMessages from '../../components/core/IntlMessages';
import { ValidatorForm } from 'react-material-ui-form-validator';

import TypographyFieldTitle from '../core/TypographyFieldTitle';
import DateTimePickerCustom from '../core/DatePicker/DateTimePickerCustom';
import SelectMultipleCustom from '../core/Select/SelectMultipleCustom';
import withValidation from '../../containers/HOC/withValidation';

function DialogFormSupportCenterFilters(props) {

    const {
        filters,
        statuses,
        onClearAll,
        onClose,
        onSubmit,
        onMultiSelectChangeSupportStatus,
        onStartDateChange,
        onValidationError
    } = props;

    return (
        <div>
            <ValidatorForm
                onSubmit={onSubmit}
                onError={onValidationError}
                noValidate>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <DateTimePickerCustom
                                disabled={false}
                                title="general.startDate"
                                value={filters.startDate}
                                onDateTimeChange={onStartDateChange}
                                name="startDate"/>
                        </Grid>
                    </Grid>
                    <Grid container className="m-t-10">
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <TypographyFieldTitle title="support.status"/>
                            <SelectMultipleCustom
                                disabled={false}
                                title="support.status"
                                selectArray={filters.statuses}
                                objectArray={statuses}
                                firstLvlValueProp="icarusBugStatusId"
                                onMultiSelectChange={onMultiSelectChangeSupportStatus}
                                optionProp="status"
                                optionKey="icarusBugStatusId"/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClearAll}>
                        <IntlMessages id="action.clearAll"/>
                    </Button>
                    <Button onClick={onClose}>
                        <IntlMessages id="action.cancel"/>
                    </Button>
                    <Button onClick={onSubmit} className="uppercase">
                        <IntlMessages id="action.submit"/>
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </div>
)
}
DialogFormSupportCenterFilters.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onMultiSelectChangeSupportStatus: PropTypes.func.isRequired,
    onStartDateChange: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired
}

export default withValidation(DialogFormSupportCenterFilters);