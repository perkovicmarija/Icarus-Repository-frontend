import React from "react";

import { makeStyles } from "@mui/styles";
import { Drawer, Divider, List, Hidden, Box } from "@mui/material";
import clsx from "classnames";

import Logo from "./Logo";
import SidebarListItemFrame from "./SidebarListItemFrame";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    backgroundColor: theme.palette.primary.main,
  },
  drawerPaper: {
    top: 0,
    left: 0,
    width: 240,
    border: "none",
    bottom: 0,
    zIndex: 1,
    position: "fixed",
    boxShadow:
      "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    backgroundColor: theme.palette.primary.main,
  },
  drawerOpen: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      height: "100%",
      position: "fixed",
    },
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7),
    /*        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },*/
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    background: theme.palette.primary.dark,
    ...theme.mixins.toolbar,
  },
}));

function Sidebar(props) {
  const classes = useStyles();

  const { open, routes, location, onDrawerClose } = props;

  return (
    <React.Fragment>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          classes={{
            paper: clsx(classes.drawerPaper, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          open={open}
          onKeyDown={onDrawerClose}
          onClose={onDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <Box className={classes.toolbar}>
            <Logo open={open} />
          </Box>
          <Divider />
          <List sx={{ flexGrow: 1 }}>
            {routes
              .filter((route) => route.sidebar)
              .map((route) => {
                return (
                  <SidebarListItemFrame
                    route={route}
                    location={location}
                    key={route.key}
                  />
                );
              })}
          </List>
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          variant="permanent"
          /*                className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}*/
          classes={{
            paper: clsx(classes.drawerPaper, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          open={open}
        >
          <div className={classes.toolbar}>
            <Logo open={open} />
          </div>
          <Divider />
          <List sx={{ flexGrow: 1 }}>
            {routes
              .filter((route) => route.sidebar)
              .map((route) => {
                return (
                  <SidebarListItemFrame
                    route={route}
                    location={location}
                    key={route.key}
                  />
                );
              })}
          </List>
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
}

export default Sidebar;
