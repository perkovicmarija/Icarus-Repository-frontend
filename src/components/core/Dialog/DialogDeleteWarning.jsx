import React from 'react';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Button
} from '@mui/material';
import PropTypes from 'prop-types';

import IntlMessages from '../IntlMessages';

export default function DialogDeleteWarning ({onClose, onDelete, open, text}) {

    return(
        <Dialog
            fullWidth={true}
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"><IntlMessages id="general.warning" /></DialogTitle>
            <DialogContent>

                <Typography variant="subtitle2" gutterBottom>
                    <IntlMessages id={text} />
                </Typography>

            </DialogContent>
            <DialogActions>
                <Button onClick={onDelete}>
                    <IntlMessages id="action.submit" />
                </Button>
                <Button variant="outlined" onClick={onClose} className="uppercase" color="primary">
                    <IntlMessages id="action.cancel" />
                </Button>
            </DialogActions>
        </Dialog>
    )
}
DialogDeleteWarning.propTypes = {
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    formComponent: PropTypes.node
}