import React from 'react';
import { Dialog, DialogTitle} from '@mui/material';

const withDialogFrame = ComposedComponent =>  {
    return function(props) {
        return (
            <Dialog
                fullWidth={true}
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
                <ComposedComponent {...props} />
            </Dialog>
        )
    }
};

export default withDialogFrame;
