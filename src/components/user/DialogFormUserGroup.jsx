import React from 'react';

import { DialogActions, DialogContent, Button, Grid } from '@mui/material';
import { ValidatorForm } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';

import TextFieldValidation from '../core/TextField/TextFieldValidation';
import TypographyFieldTitle from '../core/TypographyFieldTitle';
import SelectMultipleCustom from '../core/Select/SelectMultipleCustom';
import withValidation from '../../containers/HOC/withValidation';

const DialogFormUserGroup = ({
    userGroup,
    users,
    onClose,
    onSubmit,
    onInputChange,
    onMultiSelectChange,
    onValidationError,
}) => {

    return (
        <div>
            <ValidatorForm
                onSubmit={onSubmit}
                onError={onValidationError}
                noValidate>

                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <TypographyFieldTitle title="Name"/>
                            <TextFieldValidation
                                disabled={false}
                                validators={['required']}
                                errorMessages="This field is required"
                                required
                                id="name"
                                label="Name"
                                name="name"
                                value={userGroup.name}
                                onInputChange={onInputChange}
                                placeholder=""
                                type="text"/>

                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <TypographyFieldTitle title="Users"/>
                            <SelectMultipleCustom
                                disabled={false}
                                required
                                title="Users"
                                selectArray={userGroup.userGroupJoined}
                                objectArray={users}
                                firstLvlValueProp="user"
                                secondLvlValueProp="userId"
                                onMultiSelectChange={onMultiSelectChange}
                                optionProp="fullName"
                                optionKey="userId"/>
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} className="uppercase">
                        Add
                    </Button>
                </DialogActions>
            </ValidatorForm>

        </div>
    )
}
DialogFormUserGroup.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    userGroup: PropTypes.object.isRequired
}

export default withValidation(DialogFormUserGroup);