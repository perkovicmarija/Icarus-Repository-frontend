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
        </Grid>
    );

}
export default AuditChecklistAuditorActionCreateForm;
