import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { DialogActions, DialogContent } from '@mui/material';
import IntlMessages from '../../core/IntlMessages';
import TypographyFieldTitle from "../../core/TypographyFieldTitle";
import DateTimePickerCustom from "../../core/DatePicker/DateTimePickerCustom";
import Grid from '@mui/material/Grid';
import TextFieldMultiline from "../../core/TextField/TextFieldMultiline";
import TextFieldValidation from "../../core/TextField/TextFieldValidation";
import { ValidatorForm } from 'react-material-ui-form-validator';
import SelectCustomValidation from '../../core/Select/SelectCustomValidation';

const DialogFormNewChecklist = (props) => {

    const {
        domains,
        types,
        onClose,
        onSubmit,
        checklist,
        onInputChange,
        onSelectChange,
        onDateTimeChange,
        handleError,
        isEdit
    } = props;

    return(
        <div>
            <ValidatorForm
                onSubmit={onSubmit}
                onError={handleError}
                noValidate>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <TypographyFieldTitle title="general.title" />
                            <TextFieldValidation
                                disabled={false}
                                validators={['required']}
                                errorMessages={[<IntlMessages id="general.validation" />]}
                                required
                                id="title"
                                label="general.title"
                                name="title"
                                value={checklist.title}
                                onInputChange={onInputChange}
                                placeholder=""
                                type="text"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <TypographyFieldTitle title="qms.checklist.version" />
                            <TextFieldValidation
                                disabled={false}
                                validators={['required']}
                                errorMessages={[<IntlMessages id="general.validation" />]}
                                required
                                id="version"
                                label="qms.checklist.version"
                                name="version"
                                value={checklist.version}
                                onInputChange={onInputChange}
                                placeholder="qms.checklist.version"
                                type="text"
                            />
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <TypographyFieldTitle title="general.abbreviation" />
                            <TextFieldValidation
                                disabled={false}
                                validators={['required']}
                                errorMessages={[<IntlMessages id="general.validation" />]}
                                required
                                id="abbreviation"
                                label="general.abbreviation"
                                name="abbreviation"
                                value={checklist.abbreviation}
                                onInputChange={onInputChange}
                                placeholder="general.abbreviation"
                                type="text"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <DateTimePickerCustom
                                disabled={false}
                                title="qms.checklist.effectiveDate"
                                value={checklist.effective}
                                onDateTimeChange={onDateTimeChange}
                                name="effective"
                            />
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <TypographyFieldTitle title="qms.checklist.domain" />
                            <SelectCustomValidation
                                value={checklist.domain}
                                disabled={false}
                                name="domain"
                                selectArray={domains}
                                onSelectChange={onSelectChange}
                                optionProp="name"
                                optionKey="domainId"
                                label="qms.checklist.domain"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <TextFieldMultiline
                                disabled={false}
                                id="objectives"
                                label="qms.checklist.objectives"
                                name="objectives"
                                value={checklist.objectives}
                                onInputChange={onInputChange}
                                rows="5"
                                placeholder=""
                                type="text"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <SelectCustomValidation
                                value={checklist.auditChecklistType}
                                disabled={false}
                                name="auditChecklistType"
                                selectArray={types}
                                onSelectChange={onSelectChange}
                                optionProp="name"
                                optionKey="auditChecklistTypeId"
                                label="general.type"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        <IntlMessages id="action.cancel" />
                    </Button>
                    <Button type="submit" className="uppercase">
                        {isEdit === false ?
                            <IntlMessages id="action.add" />
                            : <IntlMessages id="general.edit" />}
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </div>
    )
}

DialogFormNewChecklist.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSelectChange: PropTypes.func.isRequired,
}

export default DialogFormNewChecklist;