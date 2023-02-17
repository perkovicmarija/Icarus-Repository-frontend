import React from 'react';

import { Dialog, DialogTitle} from '@mui/material';
import PropTypes from 'prop-types';

import IntlMessages from '../IntlMessages';

export default function DialogFormFrame ({onClose, title, open, children}) {

    return(
        <Dialog
            fullWidth={true}
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"><IntlMessages id={title} /></DialogTitle>
            {children}
        </Dialog>
    )
}
DialogFormFrame.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    formComponent: PropTypes.node
}