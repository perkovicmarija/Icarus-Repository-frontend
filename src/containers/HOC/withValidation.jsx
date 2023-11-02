import React, { Component } from 'react';

import DialogGenericWarning from '../../components/core/Dialog/DialogGenericWarning';

const withValidation = ComposedComponent =>  {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                dialogValidationWarningOpen: false
            };
        }

        handleValidationError = errors => {
            this.setState({ dialogValidationWarningOpen: true})
        }

        handleDialogValidationWarningClose = () => {
            this.setState({ dialogValidationWarningOpen: false})
        }

        render() {
            const { dialogValidationWarningOpen } = this.state;

            return (
                <React.Fragment>
                    <ComposedComponent {...this.props} onValidationError={this.handleValidationError} />
                    <DialogGenericWarning
                        open={dialogValidationWarningOpen}
                        onClose={this.handleDialogValidationWarningClose}
                        text="general.warningValidation"
                    />
                </React.Fragment>
            )
        }
    }
};

export default withValidation;
