import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContentCustom from './SnackbarContentCustom';

function SnackbarFailed (props) {

    //this is used to prevent snackbar to show on page refresh
    const [firstLoadOver, setFirstLoadOver] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        setFirstLoadOver(true);
    }, []);

    useEffect(() => {
        if(firstLoadOver) {
            setSnackbarOpen(true);
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
            autoHideDuration={10000}
            onClose={handleClose}
        >
            <div>
                <SnackbarContentCustom
                    onClose={handleClose}
                    showIcon
                    variant="error"
                    message={props.messageObject.message}
                />
            </div>
        </Snackbar>
    )
}

function mapStateToProps(state, ownProps) {
    return {
        messageObject: state.Message.failedMessage
    }
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (SnackbarFailed);