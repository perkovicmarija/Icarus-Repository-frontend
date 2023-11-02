import React from 'react';
import Grid from '@mui/material/Grid';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextFieldValidation from '../core/TextField/TextFieldValidation';
import FormTitleSubtitleActionBar from '../core/Form/FormTitleSubtitleActionBar';
import IntlMessages from '../../components/core/IntlMessages';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles( (theme) => ({
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
}));

const ChecklistItemCreateForm = (props) => {

    const classes = useStyles();

    const {
        editDisabled,
        item,
        onInputChange,
        handleItemSave,
        handleDelete,
        handleEdit,
        handleError
    } = props;

    return (
        <div>
            <ValidatorForm
                onSubmit={handleItemSave}
                onError={handleError}
                noValidate>
                <FormTitleSubtitleActionBar
                    title="qms.checklist.subArea" subtitle={item.title}
                    showEdit={true}
                    authPermissions={'PERM_AUDIT_CRUD'}
                    onEditSelect={handleEdit}
                    onDeleteSelect={handleDelete}
                />
                <Grid container spacing={2} className={classes.root}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <TextFieldValidation
                            disabled={editDisabled}
                            validators={['required']}
                            errorMessages={[<IntlMessages id="general.validation" />]}
                            required
                            id="title"
                            label="general.title"
                            name="title"
                            value={item.title}
                            onInputChange={onInputChange}
                            placeholder="general.title"
                            type="text"/>
                    </Grid>
                </Grid>
                {/*{Protected.protectedAuth(['PERM_AUDIT_CRUD']) ?
                                <FormSubmit handleCancel={handleCancel}/> : null}*/}
            </ValidatorForm>
        </div>
    );

}
export default ChecklistItemCreateForm;
