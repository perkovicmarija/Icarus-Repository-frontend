import React from 'react';

import { Grid, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { red } from '@mui/material/colors';
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator';

import TextFieldValidation from '../core/TextField/TextFieldValidation';
import SelectMultipleCustomAdvanced from '../core/Select/SelectMultipleCustomAdvanced';
import TypographyFieldTitle from '../core/TypographyFieldTitle';
import SwitchCustom from '../core/SwitchCustom';
import FormSubmit from '../core/Form/FormSubmit';
import * as Protected from '../../protectedAuth';

const useStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
    },
    container: {
        marginTop: theme.spacing(2)
    },
    button: {
        margin: theme.spacing(1)
    },
    formControl: {
        width: '100%'
    },
    deactivated: {
        color: red[500]
    },
    reactivateButton: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    }
}));

const UserForm = ({
                      user,
                      userRoles,
                      generatePassword,
                      newPassword,
                      editDisabled,
                      onInputChange,
                      onGeneratePasswordSwitchChange,
                      onNewPasswordSwitchChange,
                      onMultiSelectChange,
                      onUserSave,
                      onReactivateUserClick,
                      onCancelForm,
                      gridSpacing,
                      handleError
                  }) => {

    const classes = useStyles();
    return (
        <ValidatorForm
            onSubmit={onUserSave}
            onError={handleError}
            className={classes.root}
            noValidate>

            <Grid container spacing={gridSpacing} className={classes.container}>
                {user.deactivated &&
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Grid container justify="center" alignItems="center">
                        <Typography className={classes.deactivated} variant="h6">THIS USER IS DEACTIVATED</Typography>
                    </Grid>
                </Grid>
                }
                {user.deactivated &&
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Grid container justify="center" alignItems="center">
                        <Button className={classes.reactivateButton} variant="contained" color="secondary" onClick={onReactivateUserClick}>
                            Reactivate user
                        </Button>
                    </Grid>
                </Grid>
                }

                <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                    <TypographyFieldTitle title="form.name"/>
                    <TextFieldValidation
                        disabled={editDisabled}
                        validators={['required']}
                        errorMessages={['This is required field.']}
                        required
                        id="name"
                        label="form.name"
                        name="name"
                        value={user.name}
                        onInputChange={onInputChange}
                        placeholder="form.name"
                        type="text"/>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                    <TypographyFieldTitle title="form.surname"/>
                    <TextFieldValidation
                        disabled={editDisabled}
                        validators={['required']}
                        errorMessages={['This is required field.']}
                        required
                        id="form.surname"
                        label="form.surname"
                        name="surname"
                        value={user.surname}
                        onInputChange={onInputChange}
                        placeholder="form.surname"
                        type="text"/>
                </Grid>
            </Grid>

            <Grid container spacing={gridSpacing} className={classes.container}>
                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <TypographyFieldTitle title="form.username"/>
                    <TextFieldValidation
                        disabled={editDisabled}
                        validators={['required']}
                        errorMessages={['This is required field.']}
                        required
                        id="form.username"
                        label="form.username"
                        name="username"
                        value={user.username}
                        onInputChange={onInputChange}
                        placeholder="form.username"
                        type="text"/>
                </Grid>
                {
                    user.userId ?
                        <Grid item xl={2} lg={2} md={2} sm={6} xs={12}>
                            <TypographyFieldTitle title="form.newPassword"/>
                            <SwitchCustom
                                disabled={editDisabled}
                                value={newPassword}
                                onSwitchChange={onNewPasswordSwitchChange}
                                name="newPassword"
                            />
                        </Grid>: null
                }

                {
                    (user.userId && newPassword) || !user.userId ?
                        <Grid item xl={2} lg={2} md={2} sm={6} xs={12}>
                            <TypographyFieldTitle title="form.generatePassword"/>
                            <SwitchCustom
                                disabled={editDisabled}
                                value={generatePassword}
                                onSwitchChange={onGeneratePasswordSwitchChange}
                                name="generatePassword"
                            />
                        </Grid>: null
                }
                {
                    !generatePassword &&
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                        <TypographyFieldTitle title="form.password"/>
                        <TextFieldValidation
                            disabled={editDisabled}
                            id="form.password"
                            label="form.password"
                            name="password"
                            value={user.password}
                            onInputChange={onInputChange}
                            placeholder="form.password"
                            type="password"/>
                    </Grid>
                }

            </Grid>

            <Grid container spacing={gridSpacing} className={classes.container}>
                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <TypographyFieldTitle title="form.email"/>
                    <TextFieldValidation
                        disabled={editDisabled}
                        validators={['required']}
                        required
                        id="form.email"
                        label="form.email"
                        name="email"
                        value={user.email}
                        onInputChange={onInputChange}
                        placeholder="form.email"
                        type="email"/>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <TypographyFieldTitle title="form.phone1"/>
                    <TextFieldValidation
                        disabled={editDisabled}
                        id="form.phone1"
                        label="form.phone1"
                        name="phone1"
                        value={user.phone1}
                        onInputChange={onInputChange}
                        placeholder="form.phone1"
                        type="text"/>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <TypographyFieldTitle title="form.phone2"/>
                    <TextFieldValidation
                        disabled={editDisabled}
                        id="form.phone2"
                        label="form.phone2"
                        name="phone2"
                        value={user.phone2}
                        onInputChange={onInputChange}
                        placeholder="form.phone2"
                        type="text"/>
                </Grid>
            </Grid>

            {Protected.protectedAuth(['PERM_USER_CRUD']) ?
                <Grid container spacing={gridSpacing} className={classes.container}>
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                        <TypographyFieldTitle title="form.roles"/>
                        <SelectMultipleCustomAdvanced
                            disabled={editDisabled}
                            title="form.roles"
                            selectArray={user.userRoleJoined}
                            objectArray={userRoles}
                            firstLvlValueProp="userRole"
                            secondLvlValueProp="userRoleId"
                            onMultiSelectChange={onMultiSelectChange}
                            optionProp="name"
                            optionKey="userRoleId"
                            placeholder="form.roles"/>
                    </Grid>
                </Grid> : null
            }

            {!user.userId &&
            <Grid container spacing={gridSpacing} className={classes.container} justify="center">
                <Grid item>
                    <FormSubmit handleCancel={onCancelForm} />
                </Grid>
            </Grid>
            }

        </ValidatorForm>
    );
}

UserForm.propTypes = {
    user: PropTypes.object.isRequired,
    onInputChange: PropTypes.func.isRequired,
}
export default UserForm;