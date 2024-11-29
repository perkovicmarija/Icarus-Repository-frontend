import {
  AppBar,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ObjectViewer = ({ file, onClose, filename }) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{
        style: { overflow: "hidden", display: "flex" },
      }}
    >
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="Close"
          >
            <Close />
          </IconButton>
          <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
            {filename}
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ background: "#808080", width: "100%", height: "100%" }}>
        <object
          style={{
            width: "100%",
            height: "100%",
          }}
          data={file}
        />
      </div>
    </Dialog>
  );
};
