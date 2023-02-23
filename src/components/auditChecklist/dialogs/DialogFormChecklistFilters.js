import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import {DialogActions, DialogContent} from '@mui/material';
import IntlMessages from '../../../components/core/IntlMessages';
import TypographyFieldTitle from '../../core/TypographyFieldTitle';
import DateTimePickerCustom from '../../core/DatePicker/DateTimePickerCustom';
import SelectMultipleCustom from '../../core/Select/SelectMultipleCustom';
import Grid from '@mui/material/Grid';
import {ValidatorForm} from "react-material-ui-form-validator";

const DialogFormChecklistFilters = (props) => {

    const {
        filters,
        checklistTypes,
        onClearAll,
        onClose,
        handleError,
        onSubmit,
        onMultiSelectChangeChecklistType,
        checklistTypeId,
        onStartDateChange,
        onEndDateChange
    } = props;

    debugger;

    return(
        <div>
            <ValidatorForm
                onSubmit={onSubmit}
                onError={handleError}
                noValidate
            >
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <DateTimePickerCustom
                                disabled={false}
                                title="general.startDate"
                                value={filters.startDate}
                                onDateTimeChange={onStartDateChange}
                                name="startDate"
                            />
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <DateTimePickerCustom
                                disabled={false}
                                title="general.endDate"
                                value={filters.endDate}
                                onDateTimeChange={onEndDateChange}
                                name="endDate"
                            />
                        </Grid>
                    </Grid>
                    <Grid container className="m-t-10">
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <TypographyFieldTitle title="general.type" />
                            <SelectMultipleCustom
                                disabled={false}
                                title="general.type"
                                selectArray={filters.checklistTypes}
                                objectArray={checklistTypes}
                                firstLvlValueProp={checklistTypeId}
                                onMultiSelectChange={onMultiSelectChangeChecklistType}
                                optionProp="name"
                                optionKey={checklistTypeId}/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClearAll}>
                        <IntlMessages id="action.clearAll" />
                    </Button>
                    <Button onClick={onClose}>
                        <IntlMessages id="action.cancel" />
                    </Button>
                    <Button onClick={onSubmit} className="uppercase">
                        <IntlMessages id="action.submit" />
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </div>
    );
}

DialogFormChecklistFilters.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onMultiSelectChangeChecklistType: PropTypes.func.isRequired,
    onStartDateChange: PropTypes.func.isRequired,
    onEndDateChange: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired
}

export default DialogFormChecklistFilters;