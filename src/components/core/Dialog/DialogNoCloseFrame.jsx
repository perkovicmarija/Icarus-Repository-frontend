import React from "react";

import { Dialog, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";

import IntlMessages from "../IntlMessages";

export default function DialogNoCloseFrame({ title, open, children }) {
  if (!Boolean(open)) {
    return null;
  }
  return (
    <Dialog fullWidth={true} open={open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        <IntlMessages id={title} />
      </DialogTitle>
      {children}
    </Dialog>
  );
}
