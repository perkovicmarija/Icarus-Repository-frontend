import React from "react";
import {makeStyles} from "@mui/styles";
import Grid from "@mui/material/Grid";
import TextFieldValidation from "../core/TextField/TextFieldValidation";
import SelectCustomValidation from "../core/Select/SelectCustomValidation";
import Button from "@mui/material/Button";
import IntlMessages from "../core/IntlMessages";
import DeleteIcon from '@mui/icons-material/Delete';

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


const AuditChecklistAuditorActionISAGOCreateForm = (props) => {

    const classes = useStyles();

    const {
        editDisabled,
        selectedItem,
        onInputAuditorActionChange,
        onSelectLocationType,
        locationTypes,
        onAddAuditorActions,
        onDeleteAuditorAction
    } = props;

    return (
        <Grid container spacing={2} className={classes.root}>
            {
                selectedItem.auditorActions?.map((auditorAction, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Grid item sm={6} xs={6}>
                                <TextFieldValidation
                                    disabled={editDisabled}
                                    validators={['required']}
                                    errorMessages={[<IntlMessages id="general.validation"/>]}
                                    required
                                    id="title"
                                    label={"qms.audit.checklist.auditorAction." + (index + 1)}
                                    name="title"
                                    value={auditorAction.title}
                                    onInputChange={(event) => onInputAuditorActionChange(event, index)}
                                    placeholder={"qms.audit.checklist.auditorAction." + (index + 1)}
                                    type="text"/>
                            </Grid>
                            <Grid item sm={4} xs={4}>
                                <SelectCustomValidation
                                    value={auditorAction.locationType}
                                    disabled={editDisabled}
                                    name="locationType"
                                    selectArray={locationTypes}
                                    onSelectChange={(event) => onSelectLocationType(event, index)}
                                    optionProp="translation"
                                    optionKey="locationTypeId"
                                    label="qms.audit.checklist.auditorAction.isago.type"
                                    translate
                                    validators={['required']}
                                    errorMessages={[<IntlMessages id="general.validation"/>]}
                                    required
                                />
                            </Grid>
                            <Grid item sm={2} xs={2}>
                                <Button onClick={() => onDeleteAuditorAction(index)}>
                                    <DeleteIcon/>
                                </Button>
                            </Grid>
                        </React.Fragment>
                    )
                })
            }
            <Button onClick={onAddAuditorActions}>Add auditor actions</Button>
        </Grid>
    );

}

export default AuditChecklistAuditorActionISAGOCreateForm;