import React from 'react';

import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import PropTypes from 'prop-types';
import IntlMessages from '../IntlMessages';

const DialogFormFrame = (props) => {

    const {
        onClose,
        title,
        formComponent,
        open,
        children,
        customDialogTitle
    } = props;

    return(
        <Dialog
            fullWidth={true}
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            {
                !customDialogTitle &&
                <DialogTitle id="form-dialog-title"><IntlMessages id={title} /></DialogTitle>
            }
            <DialogContent>
                {formComponent}
                {children}
            </DialogContent>
        </Dialog>
    )
}
DialogFormFrame.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    formComponent: PropTypes.node
}

export default DialogFormFrame;