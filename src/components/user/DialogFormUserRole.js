import React from 'react';

import { DialogActions, DialogContent, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ValidatorForm } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';

import TextFieldValidation from '../core/TextField/TextFieldValidation';
import SelectMultipleCustomAdvanced from '../core/Select/SelectMultipleCustomAdvanced';
import TypographyFieldTitle from '../core/TypographyFieldTitle';
import withValidation from '../../containers/HOC/withValidation';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2)
    },
    noMaxWidth: {
        maxWidth: 'none',
    },
}));

const DialogFormUserRole = ({
                                userRole,
                                authorities,
                                onClose,
                                onSubmit,
                                onInputChange,
                                onMultiSelectChange,
                                onValidationError,
                            }) => {
    const classes = useStyles();

    return (
        <div>
            <ValidatorForm
                onSubmit={onSubmit}
                onError={onValidationError}
                noValidate>
                <DialogContent>
                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <TypographyFieldTitle title="Role name"/>
                            <TextFieldValidation
                                disabled={false}
                                id="name"
                                label=""
                                name="name"
                                value={userRole.name}
                                onInputChange={onInputChange}
                                placeholder="Role name"
                                type="text"/>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.container}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <TypographyFieldTitle title="Permissions"/>
                            <SelectMultipleCustomAdvanced
                                disabled={false}
                                title="Permissions"
                                selectArray={userRole.userRoleAuthorityJoined}
                                objectArray={authorities}
                                firstLvlValueProp="authority"
                                secondLvlValueProp="authorityId"
                                onMultiSelectChange={onMultiSelectChange}
                                optionProp="nameSimple"
                                optionKey="authorityId"/>
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
DialogFormUserRole.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    userRole: PropTypes.object.isRequired
}

export default withValidation(DialogFormUserRole);