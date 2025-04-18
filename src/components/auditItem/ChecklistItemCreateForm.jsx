import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextFieldValidation from '../core/TextField/TextFieldValidation';
import { makeStyles } from '@mui/styles';
import IntlMessages from '../core/IntlMessages';
import ChecklistSubAreasCheckbox from "../auditSubArea/ChecklistSubAreasCheckbox";
import TypographyReportField from "../core/Typography/FormFieldTitle";
import FormEditBarSubtitle from "../core/Form/FormEditBarSubtitle";
import FormSubmit from "../core/Form/FormSubmit";
import AuditorActions from "../auditChecklist/AuditorActions";
import {$generateHtmlFromNodes, $generateNodesFromDOM} from "@lexical/html";
import {$getRoot, $insertNodes} from "lexical";
import LexicalEditorWrapper from "../rich_text_editor_lexical/plugins/LexicalEditorWrapper/LexicalEditorWrapper.js";
import {cloneDeep} from "lodash";

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
        locationTypes,
        checklistType,
        onInputChange,
        handleChecklistSave,
        onSelectCheckboxChange,
        handleCancel,
        handleDelete,
        handleError,
        onEditSelect,
        onInputAuditorActionChange,
        onSelectLocationType,
        onAddAuditorActions,
        onDeleteAuditorAction,
    } = props;

    const [editorQuestion, setEditorQuestion] = useState(undefined);
    const [editorGuidance, setEditorGuidance] = useState(undefined);

    useEffect(() => {
        editorQuestion?.update(() => {
            $getRoot().clear()
            // In the browser you can use the native DOMParser API to parse the HTML string.
            const parser = new DOMParser();
            const dom = parser.parseFromString(selectedItem?.question, "text/html");

            // Once you have the DOM instance it's easy to generate LexicalNodes.
            const nodes = $generateNodesFromDOM(editorQuestion, dom);

            // Select the root
            $getRoot().select();

            // Insert them at a selection.
            $insertNodes(nodes);
        });
    }, [editorQuestion, selectedItem?.question]);

    useEffect(() => {
        editorGuidance?.update(() => {
            $getRoot().clear()
            const parser = new DOMParser();
            const dom = parser.parseFromString(selectedItem?.guidance, "text/html");

            const nodes = $generateNodesFromDOM(editorGuidance, dom);

            // Select the root
            $getRoot().select();

            // Insert them at a selection.
            $insertNodes(nodes);
        });
    }, [editorGuidance, selectedItem?.guidance]);

    const checklistItemSave = () => {
        const newItem = cloneDeep(selectedItem);
        editorQuestion.getEditorState().read(() => {
            // @ts-ignore
            newItem.question = $generateHtmlFromNodes(editorQuestion);
        });
        editorGuidance.getEditorState().read(() => {
            // @ts-ignore
            newItem.guidance = $generateHtmlFromNodes(editorGuidance);
        });
        handleChecklistSave(newItem);
    }
    return (
        <div>
            <ValidatorForm
                onSubmit={checklistItemSave}
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
                    onSaveSelect={checklistItemSave}
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
                        <TypographyReportField title={"qms.checklist.question"} />
                        <LexicalEditorWrapper setEditor={setEditorQuestion} />
                        {/*<TextFieldValidation*/}
                        {/*    disabled={editDisabled}*/}
                        {/*    id="question"*/}
                        {/*    label="qms.checklist.question"*/}
                        {/*    validators={['required']}*/}
                        {/*    errorMessages={[<IntlMessages id="general.validation"/>]}*/}
                        {/*    required*/}
                        {/*    name="question"*/}
                        {/*    value={selectedItem.question}*/}
                        {/*    onInputChange={onInputChange}*/}
                        {/*    multiline*/}
                        {/*    rows="5"*/}
                        {/*    placeholder="qms.checklist.question"*/}
                        {/*    type="text"*/}
                        {/*/>*/}
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <TypographyReportField title={"qms.checklist.guidance"} />
                        <LexicalEditorWrapper setEditor={setEditorGuidance} />
                        {/*<TextFieldValidation*/}
                        {/*    disabled={editDisabled}*/}
                        {/*    id="guidance"*/}
                        {/*    label="qms.checklist.guidance"*/}
                        {/*    name="guidance"*/}
                        {/*    value={selectedItem.guidance}*/}
                        {/*    onInputChange={onInputChange}*/}
                        {/*    multiline*/}
                        {/*    rows="5"*/}
                        {/*    placeholder="qms.checklist.guidance"*/}
                        {/*    type="text"/>*/}
                    </Grid>
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
                    <Grid item sm={12} xs={12}>
                        {
                            (checklistType === "IOSA" || checklistType === "ISAGO") &&
                            <AuditorActions
                                editDisabled={editDisabled}
                                selectedItem={selectedItem}
                                checklistType={checklistType}
                                onInputAuditorActionChange={onInputAuditorActionChange}
                                onSelectLocationType={onSelectLocationType}
                                locationTypes={locationTypes}
                                onAddAuditorActions={onAddAuditorActions}
                                onDeleteAuditorAction={onDeleteAuditorAction}
                            />
                        }
                    </Grid>
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
