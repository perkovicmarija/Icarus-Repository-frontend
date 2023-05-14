import React from 'react';

import {
    DialogActions,
    DialogContent,
    Button,
    Grid, Checkbox, FormGroup, FormControlLabel
} from '@mui/material';
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator';

import TextFieldValidation from '../core/TextField/TextFieldValidation';
import TypographyFieldTitle from '../core/TypographyFieldTitle';
import withValidation from '../../containers/HOC/withValidation';
import SelectMultipleCustom from '../core/Select/SelectMultipleCustom';

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
        notifyByEmail
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

                    </Grid>

                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <TypographyFieldTitle title="general.description"/>
                            <TextFieldValidation
                                disabled={false}
                                id="description"
                                label="general.description"
                                name="description"
                                value={softwareLog.description}
                                onInputChange={onInputChange}
                                rows="5"
                                placeholder="form.writeDescription"
                                type="text"
                                validators={['required']}
                                errorMessages={['This field is required']}
                                required/>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
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
                    </Grid>

                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <FormGroup>

                                <FormControlLabel control={<Checkbox checked={notifyByEmail.notifyAll}/>} label="Notify all clients by email" name="notifyAll" onChange={handleNotifyByEmail}/>

                                {Object.keys(softwareLog.supportSoftwareLog).length !== 0 &&
                                <FormControlLabel control={<Checkbox checked={notifyByEmail.notifyUpdated}/>} label="Notify updated clients by email" name="notifyUpdated" onChange={handleNotifyByEmail}/>}

                            </FormGroup>
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" className="uppercase">
                        {Object.keys(softwareLog.supportSoftwareLog).length === 0 ? "Add" : "Update"}
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

