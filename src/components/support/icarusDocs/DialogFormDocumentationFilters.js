import React from 'react';
import {DialogActions, DialogContent} from "@mui/material";
import Grid from "@mui/material/Grid";
import DatePickerCustom from "../../core/DatePicker/DatePickerCustom";
import Button from "@mui/material/Button";
import IntlMessages from "../../core/IntlMessages";
import PropTypes from "prop-types";
import withValidation from "../../core/HOC/withValidation";
import {ValidatorForm} from "react-material-ui-form-validator";

function DialogFormDocumentationFilters(props) {

    const {
        filters,
        onClearAll,
        onClose,
        onSubmit,
        onExpirationBeforeDateChange,
        onValidationError
    } = props;
    return (
        <ValidatorForm
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
            onError={onValidationError}
        >
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <DatePickerCustom
                            disabled={false}
                            title="general.expiresBefore"
                            value={filters.expirationBeforeDate}
                            onDateTimeChange={onExpirationBeforeDateChange}
                            name="expirationBeforeDate"/>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClearAll}>
                    <IntlMessages id="action.clearAll"/>
                </Button>
                <Button onClick={onClose}>
                    <IntlMessages id="action.cancel"/>
                </Button>
                <Button type="submit" className="uppercase">
                    <IntlMessages id="action.submit"/>
                </Button>
            </DialogActions>
        </ValidatorForm>
    )
}
DialogFormDocumentationFilters.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired
}

export default withValidation(DialogFormDocumentationFilters);