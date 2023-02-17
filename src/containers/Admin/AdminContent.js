import React from 'react';

import { makeStyles } from '@mui/styles';
import "perfect-scrollbar/css/perfect-scrollbar.css";

import Header from '../../components/admin/Header';
import AdminRouter from './adminRouter';

const useStyles = makeStyles(theme => ({
    contentWrapper: {
        float: 'right',
        position: 'relative',
        maxHeight: '100%',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: (props) => `calc(100% - ${props.drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
    },
    content: {
        padding: theme.spacing(3),
        marginTop: 70,
    },
}));

function AdminContent(props) {
    const classes = useStyles(props);

    const {open, onDrawerToggle, onLogoutClick} = props;
    return (
        <div className={classes.contentWrapper}>
            <Header
                open={open}
                onDrawerToggle={onDrawerToggle}
                onLogoutClick={onLogoutClick}
            />
            <div className={classes.content}>
                {/*<div className={classes.toolbar} />*/}
                <AdminRouter/>
            </div>
        </div>
    )
}

export default AdminContent;