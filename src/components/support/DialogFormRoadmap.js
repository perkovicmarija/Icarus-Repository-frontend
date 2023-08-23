import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import {DialogActions, DialogContent} from '@mui/material';
import TextFieldValidation from '../core/TextField/TextFieldValidation';
import TextFieldMultiline from '../core/TextField/TextFieldMultiline';
import Grid from '@mui/material/Grid';
import TypographyFieldTitle from "../core/TypographyFieldTitle";
import {ValidatorForm} from 'react-material-ui-form-validator';
import _ from "lodash";
import SelectBasicCustomValidation from "../core/Select/SelectBasicCustomValidation";
import DateTimePickerCustomValidation from "../core/DatePicker/DateTimePickerCustomValidation";

const statusArray = ["completed", "in-progress", "future"]

export default function DialogFormRoadmap ({
                                               onClose,
                                               onSubmit,
                                               roadmapLog,
                                               onInputChange,
                                               onValidationError,
                                               onSelectChange,
                                               onDateTimeChange
}) {

    return(
        <div>
            <ValidatorForm
                onSubmit={onSubmit}
                onError={onValidationError}
                noValidate>
                <DialogContent>

                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>

                            <TypographyFieldTitle title="general.title" />
                            <TextFieldValidation
                                disabled={false}
                                id="title"
                                label="general.title"
                                name="title"
                                value={roadmapLog.title}
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
                            <TextFieldMultiline
                                disabled={false}
                                id="description"
                                label="general.description"
                                name="description"
                                value={roadmapLog.description}
                                onInputChange={onInputChange}
                                rows="5"
                                placeholder="form.writeDescription"
                                type="text"/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>

                            <TypographyFieldTitle title="general.status" />
                            <SelectBasicCustomValidation
                                disabled={false}
                                value={roadmapLog.status}
                                name="status"
                                selectArray={statusArray}
                                label="general.status"
                                onSelectChange={onSelectChange} />
                        </Grid>

                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <DateTimePickerCustomValidation
                                title="general.created"
                                disabled={false}
                                value={roadmapLog.created}
                                onDateTimeChange={onDateTimeChange}
                                required
                                validators={["required"]}
                                errorMessages={["This field is required"]}
                                name="created"
                            />
                        </Grid>

                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <DateTimePickerCustomValidation
                                disabled={false}
                                title="support.estimatedTime"
                                value={roadmapLog.estimatedTime}
                                onDateTimeChange={onDateTimeChange}
                                name="estimatedTime" />
                        </Grid>

                    </Grid>



                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" className="uppercase">
                        {/*
                          If the supportSoftwareLog is empty, display the "Create" label to indicate adding new functionality.
                          If the supportSoftwareLog has properties, display the "Update" label to indicate update functionality.
                        */}
                        {_.isEmpty(roadmapLog.icarusRoadmapLogId) ? "Create" : "Update"}
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </div>
    )
}
DialogFormRoadmap.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

