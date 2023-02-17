import React from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function SignUpDialogForm(props) {

    const {
        classes,
        handleClickOpen,
        open,
        handleClose,
        email,
    } = props;

    return (

        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"REGISTRATION PENDING"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You have successfully applied for Datenn registration.
              <br/>
              We will evaluate your request and provide to you the feedback on email:
              <strong>{email}</strong>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Continue
            </Button>
          </DialogActions>
        </Dialog>
    );
}

export default SignUpDialogForm;