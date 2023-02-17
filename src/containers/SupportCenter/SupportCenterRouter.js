import React from 'react';

import { Switch, Route } from 'react-router-dom';

import SupportBugs from './Bug/SupportBugs';
import SupportSoftwareLog from './Logs/SupportSoftwareLog'
import { supportBugs, supportLogs } from "../../consts/routePaths";

function SupportCenter(props) {
    return (
        <Switch>
            <Route
                exact
                path={supportBugs}
                component={SupportBugs}
            />
            <Route
                exact
                path={supportLogs}
                component={SupportSoftwareLog}
            />
        </Switch>
    );
}

export default SupportCenter;
