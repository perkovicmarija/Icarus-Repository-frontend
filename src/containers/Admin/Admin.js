import React, { useState, useEffect } from "react";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { IntlProvider } from 'react-intl';
import "perfect-scrollbar/css/perfect-scrollbar.css";

import SnackbarLoading from '../../components/core/Snackbar/SnackbarLoading';
import SnackbarSuccess from '../../components/core/Snackbar/SnackbarSuccess';
import SnackbarFailed from '../../components/core/Snackbar/SnackbarFailed';
import Sidebar from '../../components/admin/Sidebar';
import AdminContent from './AdminContent';
import useWindowSize from './useWindowSize';
import CssBaseline from '@mui/material/CssBaseline';
import authAction from '../../redux/auth/authActions';
import { AppLocale } from '../../App';
import routes from "./sidebarRoutes.js";

const useStyles = makeStyles(theme => ({
    root: {
        //display: 'flex',
        position: "relative",
        top: "0",
        height: "100vh"
    },
}));

function Dashboard(props) {
    const classes = useStyles();
    // const theme = useTheme();
    const [open, setOpen] = useState(true);
    const [drawerWidth, setDrawerWidth] = useState(240);
    const size = useWindowSize();

    useEffect(() => {
        if(size.width <= 960) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }, [size]);

    useEffect(() => {
        if(open) {
            setDrawerWidth(240);
        } else {
            setDrawerWidth(57);
        }
    }, [open]);

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleLogoutClick = () => {
        props.authAction.logout();
    }

    const currentAppLocale = AppLocale[props.locale];

    const {...rest} = props;

    return (
        <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}>
            <div className={classes.root}>
                <SnackbarLoading/>
                <SnackbarSuccess/>
                <SnackbarFailed />
                <CssBaseline />
                <Sidebar
                    open={open}
                    onDrawerClose={handleDrawerClose}
                    routes={routes}
                    {...rest}
                />
                <AdminContent
                    open={open}
                    drawerWidth={drawerWidth}
                    onDrawerToggle={handleDrawerToggle}
                    onLogoutClick={handleLogoutClick}
                />
            </div>
        </IntlProvider>
    );
}

Dashboard.propTypes = {
};

function mapStateToProps(state, ownProps) {
    return {
        isLoggedIn: state.Auth.token !== null,
        locale: state.LanguageSwitcher.language.locale,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authAction: bindActionCreators(authAction, dispatch),
    };
}

export default (connect(mapStateToProps, mapDispatchToProps)(Dashboard));
