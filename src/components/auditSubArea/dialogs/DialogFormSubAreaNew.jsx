import React from 'react';
import {ValidatorForm} from "react-material-ui-form-validator";
import {DialogActions, DialogContent} from "@mui/material";
import Grid from "@mui/material/Grid";
import TypographyReportField from "../../core/Typography/FormFieldTitle";
import TextFieldValidation from "../../core/TextField/TextFieldValidation";
import IntlMessages from "../../../components/core/IntlMessages";
import Button from "@mui/material/Button";
import ChecklistSubAreasCheckbox from "../ChecklistSubAreasCheckbox";

const DialogFormSubAreaNew = (props) => {

    const {
        checklist,
        subarea,
        onClose,
        onSubmit,
        onInputChange,
        handleError,
        onSelectCheckboxChange
    } = props;

    return (
        <div>
            <ValidatorForm
                onSubmit={onSubmit}
                onError={handleError}
                noValidate
            >
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item sm={12} xs={12}>
                            <TypographyReportField title="qms.checklist.addSubArea" />
                            {
                                checklist.auditChecklistSubAreas.length > 0 ?
                                    <ChecklistSubAreasCheckbox
                                        checklist={checklist}
                                        selected={subarea}
                                        onSelectCheckboxChange={onSelectCheckboxChange}
                                    />
                                    :
                                    null
                            }
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <TypographyReportField title="general.title" />
                            <TextFieldValidation
                                disabled={false}
                                validators={['required']}
                                errorMessages={[<IntlMessages id="general.validation" />]}
                                required
                                id="title"
                                label="general.title"
                                name="title"
                                value={subarea.title}
                                onInputChange={onInputChange}
                                placeholder=""
                                type="text"/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        <IntlMessages id="action.cancel" />
                    </Button>
                    <Button type="submit" className="uppercase">
                        <IntlMessages id="action.submit" />
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </div>
    );

}

export default DialogFormSubAreaNew;