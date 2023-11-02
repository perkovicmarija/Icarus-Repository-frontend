import React, { useState } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    MenuItem,
    ListItemIcon,
    Menu
} from '@mui/material';
import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material";
import { makeStyles } from '@mui/styles';
import clsx from 'classnames';

import * as languageSwitcherActions from '../../redux/languageSwitcher/languageSwitcherActions';
import IntlMessages from '../../components/core/IntlMessages';
import config from '../../helpers/LanguageProvider/config';


const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'absolute',
        //width: `calc(100% - ${theme.spacing(7) + 1}px)`,
/*        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${theme.spacing(9) + 1}px)`,
        },*/
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        //marginLeft: drawerWidth,
        //width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
}));


function Header(props) {
    const classes = useStyles();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElLanguage, setAnchorElLanguage] = useState(null);
    const openUserMenu = Boolean(anchorElUser);
    const openBooleanMenu = Boolean(anchorElLanguage);

    const handleMenuUser = event => {
        setAnchorElUser(event.currentTarget);
    };

    const handleMenuLanguage = event => {
        setAnchorElLanguage(event.currentTarget);
    };

    const handleCloseMenuUser = () => {
        setAnchorElUser(null);
    };

    const handleLogoutClick = () => {
        setAnchorElUser(null);
        props.onLogoutClick();
    }

    const handleCloseMenuLanguage = () => {
        setAnchorElLanguage(null);
    };

    const handleClickLanguage = (languageId) => {
        setAnchorElLanguage(null);
        props.languageSwitcherActions.changeLanguage(languageId);
    };

    const {language, open, onDrawerToggle} = props;

    return (
        <AppBar
            color="inherit"
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onDrawerToggle}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        //[classes.hide]: open,
                    })}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                </Typography>
                <div>
                    <IconButton
                        aria-label="current language"
                        aria-controls="menu-appbar-language"
                        aria-haspopup="true"
                        onClick={handleMenuLanguage}
                        color="inherit"
                    >
                        <img className="languageIcon" src={language.icon} alt="flag" />
                    </IconButton>
                    <Menu
                        id="menu-appbar-language"
                        anchorEl={anchorElLanguage}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={openBooleanMenu}
                        onClose={handleCloseMenuLanguage}
                    >
                        {config.options.map(option => {
                            const { languageId, icon, intlId } = option;

                            return (
                                <MenuItem key={languageId} onClick={() => handleClickLanguage(languageId)}>
                                    <ListItemIcon>
                                        <img className="languageIcon" src={icon} alt="flag" />
                                    </ListItemIcon>
                                    <Typography variant="inherit"><IntlMessages id={intlId} /></Typography>
                                </MenuItem>
                            );
                        })}
                    </Menu>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar-user"
                        aria-haspopup="true"
                        onClick={handleMenuUser}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar-user"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={openUserMenu}
                        onClose={handleCloseMenuUser}
                    >
                        <MenuItem onClick={handleCloseMenuUser}>My profile</MenuItem>
                        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    )
}

function mapStateToProps(state, ownProps) {
    return {
        language: state.LanguageSwitcher.language
    };
}

function mapDispatchToProps(dispatch) {
    return {
        languageSwitcherActions: bindActionCreators(languageSwitcherActions, dispatch),
    };
}

export default (connect(mapStateToProps, mapDispatchToProps)(Header));