import React from 'react';
import Grid from '@mui/material/Grid';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextFieldValidation from '../core/TextField/TextFieldValidation';
import { makeStyles } from '@mui/styles';
import IntlMessages from '../core/IntlMessages';

import AuditChecklistAuditorActionCreateForm from './AuditChecklistAuditorActionCreateForm';

import ChecklistSubAreasCheckbox from "../auditSubArea/ChecklistSubAreasCheckbox";

import TypographyReportField from "../core/Typography/FormFieldTitle";

import FormEditBarSubtitle from "../core/Form/FormEditBarSubtitle";
import FormSubmit from "../core/Form/FormSubmit";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '10px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        color: "#c3922e",
        fontWeight: "bold",
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: "#FF0000",

    }
}));


const ChecklistItemCreateForm = (props) => {

    const classes = useStyles();

    const {
        editDisabled,
        selectedItem,
        checklist,
        checklistType,
        onInputChange,
        handleChecklistSave,
        onSelectCheckboxChange,
        handleCancel,
        handleDelete,
        handleError,
        onEditSelect
    } = props;

    return (
        <div>
            <ValidatorForm
                onSubmit={handleChecklistSave}
                onError={handleError}
                noValidate
            >
                <FormEditBarSubtitle
                    title="qms.item"
                    subtitle={selectedItem.title}
                    editDisabled={editDisabled}
                    showOptions={selectedItem.auditItemId !== null}
                    showDelete={selectedItem.auditItemId !== null}
                    onDeleteSelect={handleDelete}
                    authPermissions={['PERM_AUDIT_CRUD', 'PERM_AUDIT_ENTRY']}
                    showEdit={selectedItem.auditItemId !== null}
                    onEditSelect={onEditSelect}
                    onSaveSelect={handleChecklistSave}
                    onCancelSelect={handleCancel}
                />
                <Grid container spacing={2} className={classes.root}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <TextFieldValidation
                            disabled={editDisabled}
                            validators={['required']}
                            errorMessages={[<IntlMessages id="general.validation"/>]}
                            required
                            id="title"
                            label="general.title"
                            name="title"
                            value={selectedItem.title}
                            onInputChange={onInputChange}
                            placeholder="general.title"
                            type="text"
                        />
                    </Grid>
                    {
                        checklist.auditChecklistSubAreas.length > 0 ?
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                <TypographyReportField title="qms.checklist.addSubArea" />
                                <ChecklistSubAreasCheckbox
                                    checklist={checklist}
                                    selected={selectedItem}
                                    onSelectCheckboxChange={onSelectCheckboxChange}
                                    editDisabled={editDisabled}
                                />
                            </Grid>
                            :
                            null
                    }
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <TextFieldValidation
                            disabled={editDisabled}
                            id="question"
                            label="qms.checklist.question"
                            validators={['required']}
                            errorMessages={[<IntlMessages id="general.validation"/>]}
                            required
                            name="question"
                            value={selectedItem.question}
                            onInputChange={onInputChange}
                            multiline
                            rows="5"
                            placeholder="qms.checklist.question"
                            type="text"
                        />
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <TextFieldValidation
                            disabled={editDisabled}
                            id="guidance"
                            label="qms.checklist.guidance"
                            name="guidance"
                            value={selectedItem.guidance}
                            onInputChange={onInputChange}
                            multiline
                            rows="5"
                            placeholder="qms.checklist.guidance"
                            type="text"/>
                    </Grid>
                    <Grid container spacing={2} className={classes.root}>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <TextFieldValidation
                                disabled={editDisabled}
                                id="regReference"
                                label="qms.checklist.regReference"
                                name="regReference"
                                value={selectedItem.regReference}
                                onInputChange={onInputChange}
                                placeholder="qms.checklist.regReference"
                                type="text"/>
                        </Grid>
                    </Grid>
                    {
                        checklistType === "IOSA" ?
                            <AuditChecklistAuditorActionCreateForm
                                editDisabled={editDisabled}
                                selectedItem={selectedItem}
                                onInputChange={onInputChange}
                            />
                            :
                            null
                    }
                </Grid>
                {
                    !selectedItem.auditItemId &&
                    <FormSubmit handleCancel={handleCancel}/>
                }
            </ValidatorForm>
        </div>
    );

}
export default ChecklistItemCreateForm;
