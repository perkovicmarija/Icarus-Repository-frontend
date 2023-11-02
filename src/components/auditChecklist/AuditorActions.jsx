import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextFieldValidation from "../core/TextField/TextFieldValidation";
import SelectCustomValidation from "../core/Select/SelectCustomValidation";
import DeleteIcon from '@mui/icons-material/Delete';
import {makeStyles} from "@mui/styles";
import IntlMessages from "../../components/core/IntlMessages";

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
    },
    aaButton: {
        marginTop: "10px"
    }
}));

const AuditorActions = (props) => {

    const classes = useStyles();

    const {
        editDisabled,
        selectedItem,
        checklistType,
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
                                    onInputChange={onInputAuditorActionChange(index)}
                                    placeholder={"qms.audit.checklist.auditorAction." + (index + 1)}
                                    type="text"
                                />
                            </Grid>
                            {
                                checklistType === "ISAGO" &&
                                <Grid item sm={4} xs={4}>
                                    <SelectCustomValidation
                                        value={auditorAction.locationType}
                                        disabled={editDisabled}
                                        name="locationType"
                                        selectArray={locationTypes}
                                        onSelectChange={onSelectLocationType(index)}
                                        optionProp="translation"
                                        optionKey="locationTypeId"
                                        label="qms.audit.checklist.auditorAction.isago.type"
                                        translate
                                        validators={['required']}
                                        errorMessages={[<IntlMessages id="general.validation"/>]}
                                        required
                                    />
                                </Grid>
                            }
                            <Grid item sm={2} xs={2}>
                                <Button disabled={editDisabled} onClick={() => onDeleteAuditorAction(index)}>
                                    <DeleteIcon/>
                                </Button>
                            </Grid>
                        </React.Fragment>
                    )
                })
            }
            <Grid item sm={12} xs={12}>
                <Button
                    className={classes.aaButton}
                    variant="contained"
                    onClick={onAddAuditorActions && onAddAuditorActions}
                    disabled={editDisabled}
                >
                    Add auditor actions
                </Button>
            </Grid>
        </Grid>
    );
}

export default AuditorActions;