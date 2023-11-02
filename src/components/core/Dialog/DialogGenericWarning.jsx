import React from 'react';

import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';

import IntlMessages from '../IntlMessages';

export default function DialogGenericWarning ({onClose, open, text}) {

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
                <Button onClick={onClose} className="uppercase">
                    <IntlMessages id="action.close" />
                </Button>
            </DialogActions>
        </Dialog>
    )
}
DialogGenericWarning.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
}