import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { Tabs, Tab, Paper, AppBar } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';

import TabContainer from '../../components/core/TabContainer';
import UserRouter from './UserRouter';
import FormTitleBarRich from '../../components/core/Form/FormTitleBarRich';
import { getUsersPath, getUserGroupsPath, getUserRolesPath } from "../../consts/routePaths";
import IntlMessages from "../../components/core/IntlMessages";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    tabLink: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

function UserRoleFrame(props) {
    const classes = useStyles();
    const theme = useTheme();

    const [tabSelected, setTabSelected] = useState(0);

    const handleTabChange = (event, value) => {
        setTabSelected(value);
    }

    return (
        <div className={classes.root}>
            <Paper>
                <FormTitleBarRich title="general.userManagement" />
                <AppBar position="static" color="default">
                    <Tabs
                        value={tabSelected}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        indicatorColor="secondary">

                        <Tab label={<IntlMessages id="form.users" />} className={classes.tabLink} component={Link}
                             to={getUsersPath(0, 25)}/>
                        <Tab label={<IntlMessages id="form.userGroups" />} className={classes.tabLink} component={Link}
                             to={getUserGroupsPath(0, 25)}/>
                        <Tab label={<IntlMessages id="form.roles" />} className={classes.tabLink} component={Link}
                             to={getUserRolesPath(0, 25)}/>
                    </Tabs>
                </AppBar>
                <TabContainer dir={theme.direction}>
                    <UserRouter/>
                </TabContainer>
            </Paper>
        </div>
    )
}

export default UserRoleFrame;