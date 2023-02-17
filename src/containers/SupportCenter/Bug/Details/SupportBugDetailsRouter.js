import React from 'react';

import { Switch, Route } from 'react-router-dom';

import SupportBugComments from './SupportBugComments';
import SupportBugAttachments from './SupportBugAttachments'
import { supportBugComments, supportBugAttachments } from "../../../../consts/routePaths";

function SupportCenter(props) {
    return (
        <Switch>
            <Route
                exact
                path={supportBugComments}
                component={SupportBugComments}
            />
            <Route
                exact
                path={supportBugAttachments}
                component={SupportBugAttachments}
            />
        </Switch>
    );
}

export default SupportCenter;
