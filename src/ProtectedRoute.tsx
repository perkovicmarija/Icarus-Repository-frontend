import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    Route,
    Redirect
} from "react-router-dom";
import authAction from './redux/auth/authActions';
import * as Protected from './protectedAuth';

const { logout } = authAction;

class ProtectedRoute extends Component {

    hasAuthority =  (protectedAuthorities) => {
        if(!localStorage.getItem('authorities')) {
            return false;
        }
        if(Protected.protectedAuth(protectedAuthorities)) {
            return true;
        }
        this.props.logout();
        return false;
    };

    render() {
        const { component: Component, protectedAuthorities, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={props =>
                    this.hasAuthority(protectedAuthorities) ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: props.location }
                            }}
                        />
                    )
                }
            />
        )
    }
}


export default connect(null, { logout })(ProtectedRoute);