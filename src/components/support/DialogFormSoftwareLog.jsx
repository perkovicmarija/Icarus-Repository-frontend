import React from 'react';

import {Button, Checkbox, DialogActions, DialogContent, FormControlLabel, FormGroup, Grid} from '@mui/material';
import PropTypes from 'prop-types';
import {ValidatorForm} from 'react-material-ui-form-validator';

import TextFieldValidation from '../core/TextField/TextFieldValidation';
import TypographyFieldTitle from '../core/TypographyFieldTitle';
import withValidation from '../../containers/HOC/withValidation';
import SelectMultipleCustom from '../core/Select/SelectMultipleCustom';
import IntlMessages from '../../components/core/IntlMessages';
import _ from "lodash";
import TextFieldMultiline from "../core/TextField/TextFieldMultiline";

function DialogFormComment(props) {

    const {
        onClose,
        onSubmit,
        softwareLog,
        clients,
        selectedClients,
        onInputChange,
        onMultiSelectChange,
        onValidationError,
        handleNotifyByEmail,
        notifyByEmail,
        gridSpacing
    } = props;

    return (
        <div>
            <ValidatorForm
                onSubmit={onSubmit}
                onError={onValidationError}
                noValidate>
                <DialogContent>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <TypographyFieldTitle title="general.title"/>
                            <TextFieldValidation
                                disabled={false}
                                id="title"
                                label="general.title"
                                name="title"
                                value={softwareLog.title}
                                onInputChange={onInputChange}
                                placeholder="general.title"
                                type="text"
                                validators={['required']}
                                errorMessages={['This field is required']}
                                required/>
                        </Grid>

                        <Grid item xs={12}>
                            <TypographyFieldTitle title="general.description"/>
                            <TextFieldMultiline
                                disabled={false}
                                id="description"
                                label="Description"
                                name="description"
                                value={softwareLog.description}
                                onInputChange={onInputChange}
                                rows="5"
                                placeholder="form.writeDescription"
                                type="text"/>
                        </Grid>

                        <Grid item xs={12}>
                            <TypographyFieldTitle title="general.companies"/>
                            <SelectMultipleCustom
                              disabled={false}
                              title="general.companies"
                              objectArray={clients}
                              selectArray={selectedClients}
                              firstLvlValueProp="clientId"
                              onMultiSelectChange={onMultiSelectChange}
                              optionProp="name"
                              optionKey="clientId"/>
                        </Grid>

                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <FormGroup>

                                <FormControlLabel control={<Checkbox checked={notifyByEmail.notifyAll}/>}
                                                  label={<IntlMessages id="support.notification.notifyAll"/>}
                                                  name="notifyAll"
                                                  onChange={handleNotifyByEmail}/>

                                {/*
                                  If the supportSoftwareLog is not empty, it indicates update functionality.
                                  Therefore, show the checkbox only when updating.
                                */}
                                {!(_.isEmpty(softwareLog.supportSoftwareLog)) &&
                                    <FormControlLabel control={<Checkbox checked={notifyByEmail.notifyUpdated}/>}
                                                      label={<IntlMessages id="support.notification.notifyUpdated"/>}
                                                      name="notifyUpdated"
                                                      onChange={handleNotifyByEmail}/>}

                            </FormGroup>
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" className="uppercase">
                        {/*
                          If the supportSoftwareLog is empty, display the "Add" label to indicate adding new functionality.
                          If the supportSoftwareLog has properties, display the "Update" label to indicate update functionality.
                        */}
                        {_.isEmpty(softwareLog.supportSoftwareLog) ? "Add" : "Update"}
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </div>
    )
}
DialogFormComment.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

export default withValidation(DialogFormComment);

