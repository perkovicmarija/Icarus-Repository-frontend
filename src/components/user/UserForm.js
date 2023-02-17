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
                    <TypographyFieldTitle title="Name"/>
                    <TextFieldValidation
                        disabled={editDisabled}
                        validators={['required']}
                        errorMessages={['This is required field.']}
                        required
                        id="name"
                        label="Name"
                        name="name"
                        value={user.name}
                        onInputChange={onInputChange}
                        placeholder="Name"
                        type="text"/>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                    <TypographyFieldTitle title="Surname"/>
                    <TextFieldValidation
                        disabled={editDisabled}
                        validators={['required']}
                        errorMessages={['This is required field.']}
                        required
                        id="surname"
                        label="Surname"
                        name="surname"
                        value={user.surname}
                        onInputChange={onInputChange}
                        placeholder="Surname"
                        type="text"/>
                </Grid>
            </Grid>

            <Grid container spacing={gridSpacing} className={classes.container}>
                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <TypographyFieldTitle title="Username"/>
                    <TextFieldValidation
                        disabled={editDisabled}
                        validators={['required']}
                        errorMessages={['This is required field.']}
                        required
                        id="username"
                        label="Username"
                        name="username"
                        value={user.username}
                        onInputChange={onInputChange}
                        placeholder="Username"
                        type="text"/>
                </Grid>
                {
                    user.userId ?
                        <Grid item xl={2} lg={2} md={2} sm={6} xs={12}>
                            <TypographyFieldTitle title="New password"/>
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
                            <TypographyFieldTitle title="Generate password"/>
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
                        <TypographyFieldTitle title="Password"/>
                        <TextFieldValidation
                            disabled={editDisabled}
                            id="password"
                            label="Password"
                            name="password"
                            value={user.password}
                            onInputChange={onInputChange}
                            placeholder="Password"
                            type="password"/>
                    </Grid>
                }

            </Grid>

            <Grid container spacing={gridSpacing} className={classes.container}>
                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <TypographyFieldTitle title="Email"/>
                    <TextFieldValidation
                        disabled={editDisabled}
                        validators={['required']}
                        required
                        id="email"
                        label=""
                        name="email"
                        value={user.email}
                        onInputChange={onInputChange}
                        placeholder="Email"
                        type="email"/>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <TypographyFieldTitle title="Phone 1"/>
                    <TextFieldValidation
                        disabled={editDisabled}
                        id="phone1"
                        label=""
                        name="phone1"
                        value={user.phone1}
                        onInputChange={onInputChange}
                        placeholder="Phone 1"
                        type="text"/>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <TypographyFieldTitle title="Phone 2"/>
                    <TextFieldValidation
                        disabled={editDisabled}
                        id="phone2"
                        label=""
                        name="phone2"
                        value={user.phone2}
                        onInputChange={onInputChange}
                        placeholder="Phone 2"
                        type="text"/>
                </Grid>
            </Grid>

            {Protected.protectedAuth(['PERM_USER_CRUD']) ?
                <Grid container spacing={gridSpacing} className={classes.container}>
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                        <TypographyFieldTitle title="Roles"/>
                        <SelectMultipleCustomAdvanced
                            disabled={editDisabled}
                            title="Roles"
                            selectArray={user.userRoleJoined}
                            objectArray={userRoles}
                            firstLvlValueProp="userRole"
                            secondLvlValueProp="userRoleId"
                            onMultiSelectChange={onMultiSelectChange}
                            optionProp="name"
                            optionKey="userRoleId"/>
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