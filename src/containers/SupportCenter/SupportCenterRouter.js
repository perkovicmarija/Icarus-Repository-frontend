import React from 'react';

import {Route, Switch} from 'react-router-dom';

import SupportBugs from './Bug/SupportBugs';
import SupportSoftwareLog from './Logs/SupportSoftwareLog'
import {getSupportBugsPath, getSupportLogsPath, supportRoadmap} from "../../consts/routePaths";
import Roadmap from "./Roadmap/Roadmap";

function SupportCenter(props) {
    return (
        <Switch>
            <Route
                exact
                path={getSupportBugsPath(0, 25)}
                component={SupportBugs}
            />
            <Route
                exact
                path={getSupportLogsPath(0, 25)}
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
