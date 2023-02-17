import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CircularProgress, Snackbar } from '@mui/material';
import { blue } from '@mui/material/colors';

import SnackbarContentCustom from './SnackbarContentCustom';
import * as ajaxStatusActions from '../../../redux/ajaxCall/ajaxStatusActions';

class SnackbarLoading extends Component {

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.props.ajaxStatusActions.resetLoading();
    };

    render() {
        const {loading} = this.props;
        return(
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={loading}
                onClose={this.handleClose}
            >
                <div>
                    <SnackbarContentCustom
                        onClose={this.handleClose}
                        variant="info"
                        message={<CircularProgress style={{marginLeft: '90px', color: blue[50]}}/>}
                    />
                </div>
            </Snackbar>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        loading: state.AjaxStatus.ajaxCallsInProgress > 0
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ajaxStatusActions: bindActionCreators(ajaxStatusActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (SnackbarLoading);