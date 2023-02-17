import React from 'react';

import { DialogActions, DialogContent, Button, Grid } from '@mui/material';
import { ValidatorForm } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';

import IntlMessages from '../../components/core/IntlMessages';
import TextFieldValidation from '../core/TextField/TextFieldValidation';
import TypographyFieldTitle from '../core/TypographyFieldTitle';
import DateTimePickerCustom from '../core/DatePicker/DateTimePickerCustom';
import SelectCustomValidation from '../core/Select/SelectCustomValidation';
import withValidation from '../../containers/HOC/withValidation';

function DialogFormSupportItemAdmin(props) {

    const {
        onClose,
        onSubmit,
        supportBug,
        onDateTimeChange,
        modules,
        levels,
        statuses,
        onInputChange,
        onSelectChange,
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
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <TypographyFieldTitle title="general.title"/>
                            <TextFieldValidation
                                disabled={false}
                                id="title"
                                label="general.title"
                                name="title"
                                value={supportBug.title}
                                onInputChange={onInputChange}
                                placeholder="general.title"
                                type="text"
                                validators={['required']}
                                errorMessages={['This is required field.']}
                                required/>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <TypographyFieldTitle title="general.description"/>
                            <TextFieldValidation
                                disabled={false}
                                id="bug"
                                label="general.description"
                                name="bug"
                                value={supportBug.bug}
                                onInputChange={onInputChange}
                                rows="5"
                                placeholder="general.description"
                                type="text"
                                validators={['required']}
                                errorMessages={['This is required field.']}
                                required/>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <TypographyFieldTitle title="support.module"/>
                            <SelectCustomValidation
                                value={supportBug.module}
                                disabled={false}
                                name="module"
                                selectArray={modules}
                                onSelectChange={onSelectChange}
                                optionProp="name"
                                optionKey="supportBugModuleId"
                                label="Module"
                                validators={['required']}
                                errorMessages={['This is required field.']}
                                required/>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <TypographyFieldTitle title="support.severity"/>
                            <SelectCustomValidation
                                value={supportBug.level}
                                disabled={false}
                                name="level"
                                selectArray={levels}
                                onSelectChange={onSelectChange}
                                optionProp="level"
                                optionKey="supportBugLevelId"
                                label="Level"
                                validators={['required']}
                                errorMessages={['This is required field.']}
                                required/>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <DateTimePickerCustom
                                disabled={false}
                                title="general.date"
                                value={supportBug.dueDateDate}
                                onDateTimeChange={onDateTimeChange}
                                name="dueDateDate"/>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <TypographyFieldTitle title="general.status"/>
                            <SelectCustomValidation
                                value={supportBug.status}
                                disabled={false}
                                name="status"
                                selectArray={statuses}
                                onSelectChange={onSelectChange}
                                optionProp="status"
                                optionKey="supportBugStatusId"
                                label="general.status"
                                validators={['required']}
                                errorMessages={['This is required field.']}
                                required/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
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

DialogFormSupportItemAdmin.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSelectChange: PropTypes.func.isRequired,
}

export default withValidation(DialogFormSupportItemAdmin);

