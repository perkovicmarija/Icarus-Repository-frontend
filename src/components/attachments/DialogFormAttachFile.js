import React, { Component } from 'react';

import { Grid, DialogContent, DialogActions, Button } from '@mui/material';
import { withStyles } from '@mui/styles';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

import TextFieldValidation from '../core/TextField/TextFieldValidation';
import withValidation from '../../containers/HOC/withValidation';
import TypographyFieldTitle from '../core/TypographyFieldTitle';
import { ValidatorForm } from 'react-material-ui-form-validator';
import IntlMessages from '../core/IntlMessages';

const styles = theme => ({
    container: {
        marginTop: theme.spacing(2)
    },
});

class DialogFormAttachFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attachment: {
                description: undefined,
                filename: undefined
            },
            file: {}
        };
    }

    onFileDrop = (file) => {
        if (file && file.length > 0) {
            let selectedFile = file[0];
            let attachment = Object.assign({}, this.state.attachment);
            attachment.filename = selectedFile.name;
            this.setState({file: selectedFile, attachment})
        }
    }
    onInputChange = (name, event) => {
        let attachment = Object.assign({}, this.state.attachment);
        attachment[name] = event.target.value;
        return this.setState({attachment})
    };
    onSubmit = () => {
        this.props.onSubmit(this.state.file, this.state.attachment);
    }

    render() {
        const {onClose, classes, onValidationError} = this.props;
        const { attachment} = this.state;
        return (
            <div>
                <ValidatorForm
                    onSubmit={this.onSubmit}
                    onError={onValidationError}
                    noValidate>
                    <DialogContent>
                        <Grid container>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <TypographyFieldTitle title="general.description"/>
                                <TextFieldValidation
                                    disabled={false}
                                    id="description"
                                    label=""
                                    name="description"
                                    value={attachment.description}
                                    onInputChange={this.onInputChange}
                                    placeholder="general.description"
                                    type="text"/>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.container}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Dropzone
                                    onDrop={this.onFileDrop}
                                    className="file-dropzone"
                                    multiple={false}
                                >
                                    <p><IntlMessages id="attachments.dropzone"/></p>
                                </Dropzone>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.container}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <TypographyFieldTitle title="attachments.filename"/>
                                <TextFieldValidation
                                    disabled={true}
                                    id="filename"
                                    label=""
                                    name="filename"
                                    value={attachment.filename}
                                    onInputChange={this.onInputChange}
                                    placeholder=""
                                    type="text"/>
                            </Grid>
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose}>
                            <IntlMessages id="action.cancel"/>
                        </Button>
                        <Button type="submit" className="uppercase" variant="outlined" color="primary">
                            <IntlMessages id="action.submit"/>
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </div>
        )
    }
}

DialogFormAttachFile.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

export default withStyles(styles)(withValidation(DialogFormAttachFile));