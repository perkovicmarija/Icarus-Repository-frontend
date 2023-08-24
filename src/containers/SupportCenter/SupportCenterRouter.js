import React from 'react';

import { Switch, Route } from 'react-router-dom';

import SupportBugs from './Bug/SupportBugs';
import SupportSoftwareLog from './Logs/SupportSoftwareLog'
import { supportBugs, supportLogs, supportRoadmap } from "../../consts/routePaths";
import Roadmap from "./Roadmap/Roadmap";

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
            <Route
                exact
                path={supportRoadmap}
                component={Roadmap}
            />
        </Switch>
    );
}

export default SupportCenter;
