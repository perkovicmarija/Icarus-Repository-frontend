import React from 'react';

import { DialogActions, DialogContent, Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator';

import IntlMessages from '../../components/core/IntlMessages';
import TextFieldValidation from '../core/TextField/TextFieldValidation';
import TypographyFieldTitle from '../core/TypographyFieldTitle';
import SelectCustomValidation from '../core/Select/SelectCustomValidation';
import withValidation from '../../containers/HOC/withValidation';

function DialogFormSupportItem(props) {

    const {
        onClose,
        onSubmit,
        supportItem,
        modules,
        levels,
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

                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <TypographyFieldTitle title="general.title"/>
                            <TextFieldValidation
                                disabled={false}
                                validators={['required']}
                                errorMessages={[<IntlMessages id="general.validation"/>]}
                                required
                                id="title"
                                label="general.title"
                                name="title"
                                value={supportItem.title}
                                onInputChange={onInputChange}
                                placeholder=""
                                type="text"/>
                        </Grid>

                    </Grid>

                    <br/>
                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <TypographyFieldTitle title="general.description"/>
                            <TextFieldValidation
                                disabled={false}
                                validators={['required']}
                                errorMessages={[<IntlMessages id="general.validation"/>]}
                                required
                                id="bug"
                                label="Bug"
                                name="bug"
                                value={supportItem.bug}
                                onInputChange={onInputChange}
                                rows="5"
                                multiline
                                placeholder=""
                                type="text"/>
                        </Grid>
                    </Grid>

                    <br/>

                    <Grid container spacing={2}>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <TypographyFieldTitle title="support.module"/>
                            <SelectCustomValidation
                                value={supportItem.module}
                                disabled={false}
                                name="module"
                                selectArray={modules}
                                onSelectChange={onSelectChange}
                                optionProp="name"
                                optionKey="supportBugModuleId"
                                label="Module"
                                validators={['required']}
                                errorMessages={[<IntlMessages id="general.validation"/>]}
                                required
                            />
                        </Grid>

                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <TypographyFieldTitle title="support.severity"/>
                            <SelectCustomValidation
                                value={supportItem.level}
                                disabled={false}
                                name="level"
                                selectArray={levels}
                                onSelectChange={onSelectChange}
                                optionProp="level"
                                optionKey="supportBugLevelId"
                                label="Level"
                                validators={['required']}
                                errorMessages={[<IntlMessages id="general.validation"/>]}
                                required
                            />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        <IntlMessages id="action.cancel"/>
                    </Button>
                    <Button type="submit" className="uppercase">
                        <IntlMessages id="action.submit"/>
                    </Button>
                </DialogActions>

            </ValidatorForm>
        </div>
    )
}

DialogFormSupportItem.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSelectChange: PropTypes.func.isRequired,
}

export default withValidation(DialogFormSupportItem);

