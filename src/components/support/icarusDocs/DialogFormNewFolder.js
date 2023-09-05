import React from 'react';
import TextFieldValidation from "../../core/TextField/TextFieldValidation";
import {ValidatorForm} from "react-material-ui-form-validator";
import {DialogActions, DialogContent} from "@mui/material";
import Grid from "@mui/material/Grid";
import TypographyFieldTitle from "../../core/TypographyFieldTitle";
import Button from "@mui/material/Button";
import IntlMessages from "../../core/IntlMessages";
import PropTypes from "prop-types";
import withValidation from "../../core/HOC/withValidation";


function DialogFormNewFolder (props) {

    const {
        icarusDocumentationFolder,
        onClose,
        onSubmit,
        onInputChange,
        onValidationError
    } = props;

    return(
        <ValidatorForm
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
            onError={onValidationError}
        >
            <DialogContent>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TypographyFieldTitle title="documentation.folder.name" />
                        <TextFieldValidation
                            disabled={false}
                            id="folderName"
                            label="general.name"
                            name="folderName"
                            value={icarusDocumentationFolder.folderName}
                            onInputChange={onInputChange}
                            placeholder="general.name"
                            type="text"
                            validators={['required']}
                            errorMessages={['This field is required']}
                            required
                        />
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    <IntlMessages id="action.cancel" />
                </Button>
                <Button type="submit" className="uppercase">
                    <IntlMessages id="action.add" />
                </Button>
            </DialogActions>
        </ValidatorForm>
    )
}
DialogFormNewFolder.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    icarusDocumentationFolder: PropTypes.object.isRequired,
}

export default withValidation(DialogFormNewFolder);