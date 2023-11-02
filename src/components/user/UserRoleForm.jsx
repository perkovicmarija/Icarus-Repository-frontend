import React from 'react';

import {
    ListItemText,
    Grid,
    Button,
    Input,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Checkbox
} from '@mui/material';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { ValidatorForm } from 'react-material-ui-form-validator';

import TextFieldValidation from '../core/TextField/TextFieldValidation';
import TypographyFieldTitle from '../core/TypographyFieldTitle';
import withValidation from '../../containers/HOC/withValidation';

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
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const UserRoleForm = ({
                          user,
                          authorities,
                          editDisabled,
                          onInputChange,
                          onMultiSelectChange,
                          onUserSave,
                          checkUserRoleInArray,
                          onValidationError
                      }) => {

    const classes = useStyles();
    return (
        <ValidatorForm
            className={classes.root}
            onSubmit={onUserSave}
            onError={onValidationError}
            noValidate>
            <Grid container className={classes.container}>
                <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                    <TypographyFieldTitle title="Name"/>
                    <TextFieldValidation
                        disabled={editDisabled}
                        id="name"
                        label=""
                        name="name"
                        value={user.name}
                        onInputChange={onInputChange}
                        placeholder="Name"
                        type="text"/>
                </Grid>
            </Grid>

            <Grid container className={classes.container}>
                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <TypographyFieldTitle title="Roles"/>
                    <FormControl className={classes.formControl} disabled={editDisabled}>
                        <InputLabel htmlFor="select-multiple-checkbox">Roles</InputLabel>
                        <Select
                            multiple
                            value={userRole.userRoleJoined.map(userRoleJoined => userRoleJoined.userRole.userRoleId)}
                            onChange={onMultiSelectChange}
                            input={<Input id="select-multiple-checkbox"/>}
                            renderValue={selected => selected.map(function (elem) {
                                let userRole = userRoles.find(userRole => userRole.userRoleId === elem);
                                if (userRole) {
                                    return userRole.name;
                                } else {
                                    return "";
                                }
                            }).join(",")}
                            MenuProps={MenuProps}
                        >
                            {authorities.map(authority => (
                                <MenuItem key={authority.authorityId} value={authority.authorityId}>
                                    <Checkbox checked={checkUserRoleInArray(authority.authorityId)}/>
                                    <ListItemText primary={authority.name}/>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            {!user.userId &&
            <Grid container className={classes.container} justify="center">
                <Grid item>
                    <Button type="submit" variant="contained" size="large" color="primary"
                            className={classes.button}>
                        SUBMIT
                    </Button>
                    <Button variant="contained" size="large" color="secondary" className={classes.button}>
                        CANCEL
                    </Button>
                </Grid>
            </Grid>
            }
        </ValidatorForm>
    );
}

UserRoleForm.propTypes = {
    user: PropTypes.object.isRequired,
    onInputChange: PropTypes.func.isRequired,
}
export default withValidation(UserRoleForm);