import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@mui/styles';
import { Tabs, Tab, Paper, AppBar } from '@mui/material';

import IntlMessages from '../../components/core/IntlMessages';
import TabContainer from '../../components/core/TabContainer';
import SupportCenterRouter from './SupportCenterRouter';
import FormTitleBarRich from '../../components/core/Form/FormTitleBarRich';
import {supportLogs, getSupportBugsPath, getSupportLogsPath} from "../../consts/routePaths";

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

function SupportCenterFrame(props) {
    const classes = useStyles();
    const theme = useTheme();

    const [tabSelected, setTabSelected] = useState(0);

    const handleTabChange = (event, value) => {
        setTabSelected(value);
    }

    return (
        <div className={classes.root}>
            <Paper>
                <FormTitleBarRich title="support.title" />
                <AppBar position="static" color="default">
                    <Tabs
                        value={tabSelected}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        indicatorColor="secondary">

                        <Tab label={<IntlMessages id="support.logs" />} className={classes.tabLink} component={Link}
                             to={getSupportLogsPath(0, 10)}/>
                        <Tab label={<IntlMessages id="support.bugs" />} className={classes.tabLink} component={Link}
                             to={getSupportBugsPath(0, 10)}/>
                    </Tabs>
                </AppBar>
                <TabContainer dir={theme.direction}>
                    <SupportCenterRouter/>
                </TabContainer>
            </Paper>
        </div>
    )
}

export default SupportCenterFrame;