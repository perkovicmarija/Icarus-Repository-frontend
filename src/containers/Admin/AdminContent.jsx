import React from "react";

import { makeStyles } from "@mui/styles";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import Header from "../../components/admin/Header";
import AdminRouter from "./adminRouter";
import { LayoutWrapper } from "../../components/core/LayoutWrapper";

const useStyles = makeStyles((theme) => ({
  contentWrapper: {
    float: "right",
    position: "relative",
    maxHeight: "100%",
    height: "100%",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: (props) => `calc(100% - ${props.drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  content: {
    marginTop: 64,
    background: "#F9F9F9",
    flexGrow: 1,
    width: "100%",
    overflow: "hidden",
  },
}));

function AdminContent(props) {
  const classes = useStyles(props);

  const { open, onDrawerToggle, onLogoutClick } = props;
  return (
    <div className={classes.contentWrapper}>
      <Header
        open={open}
        onDrawerToggle={onDrawerToggle}
        onLogoutClick={onLogoutClick}
      />
      <div className={classes.content}>
        <LayoutWrapper>
          <AdminRouter />
        </LayoutWrapper>
      </div>
    </div>
  );
}

export default AdminContent;
