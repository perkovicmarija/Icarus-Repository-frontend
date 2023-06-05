import React from 'react';
import Grid from '@mui/material/Grid';
import TextFieldValidation from '../core/TextField/TextFieldValidation';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding:'10px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        color:"#c3922e",
        fontWeight: "bold",
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: "#FF0000",
    }
}));

const AuditChecklistAuditorActionCreateForm = (props) => {

    const classes = useStyles();

    const {
        editDisabled,
        selectedItem,
        onInputChange
    } = props;

    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextFieldValidation
                    disabled={editDisabled}
                    id="aa1"
                    label="qms.audit.checklist.auditorAction.1"
                    name="aa1"
                    value={selectedItem.aa1}
                    onInputChange={onInputChange}
                    placeholder="qms.audit.checklist.auditorAction.1"
                    type="text"/>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextFieldValidation
                    disabled={editDisabled}
                    id="aa2"
                    label="qms.audit.checklist.auditorAction.2"
                    name="aa2"
                    value={selectedItem.aa2}
                    onInputChange={onInputChange}
                    placeholder="qms.audit.checklist.auditorAction.2"
                    type="text"/>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextFieldValidation
                    disabled={editDisabled}
                    id="aa3"
                    label="qms.audit.checklist.auditorAction.3"
                    name="aa3"
                    value={selectedItem.aa3}
                    onInputChange={onInputChange}
                    placeholder="qms.audit.checklist.auditorAction.3"
                    type="text"/>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextFieldValidation
                    disabled={editDisabled}
                    id="aa4"
                    label="qms.audit.checklist.auditorAction.4"
                    name="aa4"
                    value={selectedItem.aa4}
                    onInputChange={onInputChange}
                    placeholder="qms.audit.checklist.auditorAction.4"
                    type="text"/>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextFieldValidation
                    disabled={editDisabled}
                    id="aa5"
                    label="qms.audit.checklist.auditorAction.5"
                    name="aa5"
                    value={selectedItem.aa5}
                    onInputChange={onInputChange}
                    placeholder="qms.audit.checklist.auditorAction.5"
                    type="text"/>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextFieldValidation
                    disabled={editDisabled}
                    id="aa6"
                    label="qms.audit.checklist.auditorAction.6"
                    name="aa6"
                    value={selectedItem.aa6}
                    onInputChange={onInputChange}
                    placeholder="qms.audit.checklist.auditorAction.6"
                    type="text"/>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextFieldValidation
                    disabled={editDisabled}
                    id="aa7"
                    label="qms.audit.checklist.auditorAction.7"
                    name="aa7"
                    value={selectedItem.aa7}
                    onInputChange={onInputChange}
                    placeholder="qms.audit.checklist.auditorAction.7"
                    type="text"/>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextFieldValidation
                    disabled={editDisabled}
                    id="aa8"
                    label="qms.audit.checklist.auditorAction.8"
                    name="aa8"
                    value={selectedItem.aa8}
                    onInputChange={onInputChange}
                    placeholder="qms.audit.checklist.auditorAction.8"
                    type="text"/>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextFieldValidation
                    disabled={editDisabled}
                    id="aa9"
                    label="qms.audit.checklist.auditorAction.9"
                    name="aa9"
                    value={selectedItem.aa9}
                    onInputChange={onInputChange}
                    placeholder="qms.audit.checklist.auditorAction.9"
                    type="text"/>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextFieldValidation
                    disabled={editDisabled}
                    id="aa10"
                    label="qms.audit.checklist.auditorAction.10"
                    name="aa10"
                    value={selectedItem.aa10}
                    onInputChange={onInputChange}
                    placeholder="qms.audit.checklist.auditorAction.10"
                    type="text"/>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextFieldValidation
                    disabled={editDisabled}
                    id="aa11"
                    label="qms.audit.checklist.auditorAction.11"
                    name="aa11"
                    value={selectedItem.aa11}
                    onInputChange={onInputChange}
                    placeholder="qms.audit.checklist.auditorAction.11"
                    type="text"/>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextFieldValidation
                    disabled={editDisabled}
                    id="aa12"
                    label="qms.audit.checklist.auditorAction.12"
                    name="aa12"
                    value={selectedItem.aa12}
                    onInputChange={onInputChange}
                    placeholder="qms.audit.checklist.auditorAction.12"
                    type="text"/>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextFieldValidation
                    disabled={editDisabled}
                    id="aa13"
                    label="qms.audit.checklist.auditorAction.13"
                    name="aa13"
                    value={selectedItem.aa13}
                    onInputChange={onInputChange}
                    placeholder="qms.audit.checklist.auditorAction.13"
                    type="text"/>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextFieldValidation
                    disabled={editDisabled}
                    id="aa14"
                    label="qms.audit.checklist.auditorAction.14"
                    name="aa14"
                    value={selectedItem.aa14}
                    onInputChange={onInputChange}
                    placeholder="qms.audit.checklist.auditorAction.14"
                    type="text"/>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextFieldValidation
                    disabled={editDisabled}
                    id="aa15"
                    label="qms.audit.checklist.auditorAction.15"
                    name="aa15"
                    value={selectedItem.aa15}
                    onInputChange={onInputChange}
                    placeholder="qms.audit.checklist.auditorAction.15"
                    type="text"/>
            </Grid>
        </Grid>
    );

}
export default AuditChecklistAuditorActionCreateForm;
