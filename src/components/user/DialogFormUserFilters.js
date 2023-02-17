import React from 'react';

import { DialogActions, DialogContent, Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';

import TypographyFieldTitle from '../core/TypographyFieldTitle';
import SelectMultipleCustom from '../core/Select/SelectMultipleCustom';
import SwitchCustom from '../core/SwitchCustom';

function DialogFormUserFilters(props) {

    const {
        filters,
        userRoles,
        onClearAll,
        onClose,
        onSubmit,
        onMultiSelectChangeUserRoles,
        onSwitchShowDeactivatedChange
    } = props;

    return (
        <div>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <TypographyFieldTitle title="Role name"/>
                        <SelectMultipleCustom
                            disabled={false}
                            title="Role name"
                            selectArray={filters.userRoles}
                            objectArray={userRoles}
                            firstLvlValueProp="userRoleId"
                            onMultiSelectChange={onMultiSelectChangeUserRoles}
                            optionProp="name"
                            optionKey="userRoleId"/>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <TypographyFieldTitle title="user.showDeactivated"/>
                        <SwitchCustom
                            disabled={false}
                            value={filters.showDeactivated}
                            onSwitchChange={onSwitchShowDeactivatedChange}
                            name="showDeactivated"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClearAll}>
                    Clear all
                </Button>
                <Button onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={onSubmit} className="uppercase">
                    Submit
                </Button>
            </DialogActions>
        </div>
    )
}

DialogFormUserFilters.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired
}

export default DialogFormUserFilters;