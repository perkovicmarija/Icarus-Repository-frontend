import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';

import SnackbarContentCustom from './SnackbarContentCustom';

function SnackbarSuccess(props) {

    //this is used to prevent snackbar to show on page refresh
    const [firstLoadOver, setFirstLoadOver] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        setFirstLoadOver(true);
    }, []);

    useEffect(() => {
        if(firstLoadOver) {
            if(props.messageObject.date) {
                setSnackbarOpen(true);
            }
        }
    }, [props.messageObject.date]);

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={snackbarOpen}
            autoHideDuration={5000}
            onClose={handleClose}
        >
            <div>
                <SnackbarContentCustom
                    onClose={handleClose}
                    showIcon
                    variant="success"
                    message={props.messageObject.message}
                />
            </div>
        </Snackbar>
    )
}

function mapStateToProps(state, ownProps) {
    return {
        messageObject: state.Message.successMessage
    }
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (SnackbarSuccess);