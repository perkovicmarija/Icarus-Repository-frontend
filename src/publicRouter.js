import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import {connect} from 'react-redux';

import Dashboard from './containers/Admin/Admin';
import FourZeroFour from './containers/404/404';
import Login from './containers/Login/Login';
import ConfirmationSignUp from './containers/Login/ConfirmSignUp';
import {root, fourZeroFour, signIn, adminRoot, confirmationCode} from "./consts/routePaths";

const RestrictedRoute = ({component: Component, isLoggedIn, ...rest}) => (
    <Route
        {...rest}
        render={props => isLoggedIn
            ? <Component {...props} />
            : <Redirect
                to={{
                    pathname: signIn,
                    state: {from: props.location},
                }}
            />}
    />
);
const PublicRoutes = ({history, isLoggedIn}) => {
    return (
        <ConnectedRouter history={history}>
            <div>
                <Route
                    exact
                    path={root}
                    component={Login}
                />
                <Route
                    exact
                    path={fourZeroFour}
                    component={FourZeroFour}
                />
                <Route
                    exact
                    path={signIn}
                    component={Login}
                />
                <Route
                    exact
                    path={confirmationCode}
                    component={ConfirmationSignUp}
                />
                <RestrictedRoute
                    path={adminRoot}
                    component={Dashboard}
                    isLoggedIn={isLoggedIn}
                />
            </div>
        </ConnectedRouter>
    );
};

function mapStateToProps(state, ownProps) {
    return {
        isLoggedIn: state.Auth.token !== null
    }
}

export default connect(mapStateToProps)(PublicRoutes);
