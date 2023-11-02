import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { DialogActions, DialogContent } from '@mui/material';
import IntlMessages from '../../../components/core/IntlMessages';
import TypographyFieldTitle from '../../core/TypographyFieldTitle';
import DateTimePickerCustom from '../../core/DatePicker/DateTimePickerCustom';
import Grid from '@mui/material/Grid';
import TextFieldMultiline from '../../core/TextField/TextFieldMultiline';
import TextFieldValidation from '../../core/TextField/TextFieldValidation';
import { ValidatorForm } from 'react-material-ui-form-validator';
import SelectCustomValidation from '../../core/Select/SelectCustomValidation';

const DialogFormNewChecklistVersion = (props) => {

    const {
        onClose,
        onSubmit,
        checklist,
        domains,
        onInputChange,
        onDateTimeChange,
        onSelectChange,
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
                    <Grid container style={{background:'azure', padding:'10px'}}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <strong><label>CURRENT VERSION</label></strong>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                            <TypographyFieldTitle title="general.title" />
                            <br/>
                            <label>{checklist.title}</label>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                            <TypographyFieldTitle title="qms.checklist.version" />
                            <br/>
                            <label>{checklist.version}</label>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                            <TypographyFieldTitle title="general.abbreviation" />
                            <br/>
                            <label>{checklist.abbreviation}</label>
                        </Grid>
                    </Grid>
                    <br/>
                    <br/>
                    <Grid container spacing={2}>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <TypographyFieldTitle title="qms.checklist.newVersion" />
                            <TextFieldValidation
                                disabled={false}
                                validators={['required']}
                                errorMessages={[<IntlMessages id="general.validation" />]}
                                required
                                id="versionNew"
                                label="qms.checklist.newVersion"
                                name="versionNew"
                                value={checklist.versionNew}
                                onInputChange={onInputChange}
                                placeholder=""
                                type="text"/>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <TypographyFieldTitle title="qms.checklist.newAbbreviation" />
                            <TextFieldValidation
                                disabled={false}
                                validators={['required']}
                                errorMessages={[<IntlMessages id="general.validation" />]}
                                required
                                id="abbreviationNew"
                                label="qms.checklist.newAbbreviation"
                                name="abbreviationNew"
                                value={checklist.abbreviationNew}
                                onInputChange={onInputChange}
                                placeholder=""
                                type="text"/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <DateTimePickerCustom
                                disabled={false}
                                title="qms.checklist.effectiveDate"
                                value={checklist.effective}
                                onDateTimeChange={onDateTimeChange}
                                name="effective" />
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
                                label="qms.checklist.domain"/>
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
                                type="text"/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        <IntlMessages id="action.cancel" />
                    </Button>
                    <Button type="submit" className="uppercase">
                        {
                            isEdit === false ?
                                <IntlMessages id="action.add" />
                                :
                                <IntlMessages id="general.edit" />
                        }
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </div>
    )
}
DialogFormNewChecklistVersion.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSelectChange: PropTypes.func.isRequired,
}

export default DialogFormNewChecklistVersion;