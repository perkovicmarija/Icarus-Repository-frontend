import React from "react";

import { ListItemIcon, Collapse, ListItemText, ListItem, List } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { makeStyles } from '@mui/styles';
import classNames from "classnames";

import SidebarListItemNestedNavLink from './SidebarListItemNestedNavLink';

const useStyles = makeStyles(theme => ({
    itemNested: {
        color: "rgba(200, 200, 200, 0.8)",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "rgba(200, 200, 200, 0.2)"
        },
    },
    itemChildActive: {
        backgroundColor: "rgba(200, 200, 200, 0.2)",
        outline: "none",
        boxShadow: "none",
    },
    itemIconNested: {
        color: "inherit",
    },
    nestedList: {
        backgroundColor: theme.palette.primary.dark
    }
}))

const SidebarListItemNested = (props) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const {route, location} = props;

    function handleClick() {
        setOpen(!open);
    }

    // verifies if routeName is the one active (in browser input)
    function activeRoute(children) {
        let childActive = false;
        for(let i = 0, l = children.length; i< l; i++) {
            if(location.pathname.indexOf(children[i].path) > -1) {
                childActive = true;
            }
        }
        return childActive;
    }

    return (
        <React.Fragment>
            <ListItem
                className={classNames(classes.itemNested, {
                    [classes.itemChildActive]: activeRoute(route.children) || open,
                })} onClick={handleClick}>
                <ListItemIcon className={classes.itemIconNested}>
                    <route.icon />
                </ListItemIcon>
                <ListItemText
                    primary={route.name}
                />
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List disablePadding className={classes.nestedList}>
                    {route.children.map((routeChild) => {
                        return (
                            <SidebarListItemNestedNavLink
                                route={routeChild}
                                location={props.location}
                                key={routeChild.key}
                            />
                        );
                    })}
                </List>
            </Collapse>
        </React.Fragment>
    )
}

export default SidebarListItemNested;