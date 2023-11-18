import React from "react";
import { makeStyles } from "@mui/styles";
import { DialogTitle, IconButton, Tooltip, Typography } from "@mui/material";
import IntlMessages from "../IntlMessages";
import { SaveAlt } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

function DialogTitleWithExport(props) {
  const classes = useStyles();

  const { children, onExportClick } = props;
  return (
    <DialogTitle className={classes.root}>
      <Tooltip title={<IntlMessages id="general.export" />}>
        <IconButton
          aria-label="general.export"
          aria-haspopup="true"
          onClick={onExportClick}
          className={classes.closeButton}
        >
          <SaveAlt />
        </IconButton>
      </Tooltip>
    </DialogTitle>
  );
}

export default DialogTitleWithExport;
