import React from 'react';

import { NavLink } from "react-router-dom";
import { ListItem, ListItemText, Box } from "@mui/material";
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
    nav: {
        textDecoration: "none",
    },
    itemNested: {
        paddingLeft: theme.spacing(9),
        color: "rgba(200, 200, 200, 0.8)",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "rgba(200, 200, 200, 0.2)"
        },
    },
    itemIcon: {
        color: "inherit",
    },
    itemIconActive: {
        color: "rgba(255, 255, 255, 1)",
    },
    active: {
        color: "rgba(255, 255, 255, 1) !important",
    },
}));

function SidebarListItemNestedNavLink(props) {
    const classes = useStyles();
    const { route, location } = props;

    function activeRoute(routeName) {
        return location.pathname.indexOf(routeName) > -1;
    }

    let listItemClasses = classNames({
        [" " + classes.active]: activeRoute(route.path)
    });

    return (
        <NavLink
            className={classes.nav}
            key={route.key}
            to={route.path}
            activeStyle={{
                fontWeight: "bold",
                color: "white"
            }}
        >
            <ListItem button className={classes.itemNested + listItemClasses}>
                <ListItemText
                    primary={
                        <Box fontWeight="fontWeightLight" fontSize="fontSize">
                            {route.name}
                        </Box>
                    }
                />
            </ListItem>
        </NavLink>
    )
}

export default SidebarListItemNestedNavLink;