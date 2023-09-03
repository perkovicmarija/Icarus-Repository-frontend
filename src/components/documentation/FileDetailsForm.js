import React from 'react';
import {makeStyles} from "@mui/styles";
import {ValidatorForm} from 'react-material-ui-form-validator';
import Grid from "@mui/material/Grid";
import DropzoneCustom from "../core/Dropzone/DropzoneCustom";
import TypographyFieldTitle from "../core/TypographyFieldTitle";
import TextFieldValidation from "../core/TextField/TextFieldValidation";
import {Box, FormControlLabel, FormGroup, IconButton, Tooltip} from "@mui/material";
import IntlMessages from "../core/IntlMessages";
import {Info} from "@mui/icons-material";
import SwitchCustom from "../core/SwitchCustom";
import SelectCustom from "../core/Select/SelectCustom";
import RadioGroupValidation from "../core/RadioGroup/RadioGroupValidation";
import SelectMultipleAdvancedValidation from "../core/Select/SelectMultipleAdvancedValidation";
import AutocompleteMultiLargeDatasetValidation from '../core/Autocomplete/AutocompleteMultiLargeDatasetValidation';
import TextFieldMultiline from "../core/TextField/TextFieldMultiline";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CheckboxReport from "../core/CheckboxReport";
import FormSubmit from "../core/Form/FormSubmit";
import PropTypes from "prop-types";
import withValidation from "../core/HOC/withValidation";
import classnames from "classnames";
import DatePickerCustom from "../core/DatePicker/DatePickerCustom";

const useStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
    },
    container: {
        marginTop: theme.spacing(2)
    },
    button: {
        margin: theme.spacing(1)
    },
    formControl: {
        width: '100%'
    },
    input: {
        display: 'none',
    },
    noMaxWidth: {
        maxWidth: 'none',
    },
    rcaBc: {
        backgroundColor: "#e3f2fd"
    },
    infoIcon: {
        paddingTop: 3,
        paddingBottom: 3
    },
    notificationPart:{
        padding: theme.spacing(2),
        background: "aliceblue",
    },
    leftIcon: {
        marginRight: theme.spacing(1),
        display:'inline-block',
        verticalAlign : 'middle'
    },
    iconTitle: {
        fontSize: "25px",
        verticalAlign : 'middle'
    },
}));

const radioGroupPermissionTypes = [
    {value: "userRole", label: "userRoles.title"},
    {value: "userGroup", label: "users.groups"},
    {value: "department", label: "general.departments"},
    {value: "subdivision", label: "general.subdivisions"},
    {value: "individual", label: "general.individual"}

    /*, {value: "all", label: "All"}*/
];

const FileDetailsForm = (props) => {
    const classes = useStyles();

    const {
        documentationFile,
        documentationFileRevision,
        notifyByEmail,
        notifyByMessageBoard,
        userRoles,
        userGroups,
        departments,
        subdivisions,
        users,
        editDisabled,
        onInputFileChange,
        onDateTimeChange,
        onSelectChange,
        onInputRevisionChange,
        onSwitchFileChange,
        onSwitchRevisionChange,
        onRadioButtonChange,
        onMultiSelectUserRoleChange,
        onMultiSelectUserGroupChange,
        onMultiSelectDepartmentChange,
        onMultiSelectSubdivisionChange,
        onMultiAutocompleteUserChange,
        onCheckboxNotifyByEmailChange,
        onCheckboxNotifyByMessageBoardChange,
        onDocumentationFileSave,
        gridSpacing,
        onValidationError,
        onFileDrop,
        onCancelDocumentationFile
    } = props;
    return (
        <div className={classes.root}>
            <ValidatorForm
                noValidate
                autoComplete="off"
                onSubmit={onDocumentationFileSave}
                onError={onValidationError}
            >

                <Grid container spacing={gridSpacing} className={classnames(classes.container, classes.rcaBc)}>
                    <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                        <DropzoneCustom
                            onFileDrop={onFileDrop}
                            disabled={editDisabled}
                            title="documentation.clickToChoose"
                            maxSize={262144000}
                            maxSizeMb="250MB"
                            files={[]}
                        />
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                        <TypographyFieldTitle title="general.filename"/>
                        <TextFieldValidation
                            disabled={true}
                            id="filename"
                            label=""
                            name="general.filename"
                            value={documentationFile.filename}
                            onInputChange={onInputFileChange}
                            placeholder="general.filename"
                            type="text"
                            validators={['required']}
                            errorMessages={['Please add the document file']}
                            required
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={gridSpacing} className={classes.container} alignItems="center">
                    <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                        <TypographyFieldTitle title="general.name"/>
                        <TextFieldValidation
                            validators={['required']}
                            errorMessages={['This field is required']}
                            required
                            disabled={editDisabled}
                            id="name"
                            label=""
                            name="name"
                            value={documentationFile.name}
                            onInputChange={onInputFileChange}
                            placeholder="general.name"
                            type="text"/>
                    </Grid>

                    <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
                        <TypographyFieldTitle title="documentation.revision"/>
                        <TextFieldValidation
                            validators={['required']}
                            errorMessages={['This field is required']}
                            required
                            disabled={editDisabled}
                            id="revision"
                            label="documentation.revision"
                            name="revision"
                            value={documentationFileRevision.revision}
                            onInputChange={onInputRevisionChange}
                            placeholder="documentation.revision"
                            type="text"/>
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
                        <DatePickerCustom
                            title="documentation.revision.date"
                            value={documentationFileRevision.dateRevision}
                            onDateTimeChange={onDateTimeChange}
                            name="dateRevision"
                            required
                            validators={["required"]}
                            errorMessages={["Revision date is required"]}
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={2} sm={6} xs={12}>
                        <DatePickerCustom
                            title="documentation.approved.date"
                            value={documentationFileRevision.dateApproved}
                            onDateTimeChange={onDateTimeChange}
                            name="dateApproved"
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={2} sm={6} xs={12}>
                        <TypographyFieldTitle title="documentation.temporaryRevision"/>
                        <SwitchCustom
                            disabled={editDisabled}
                            value={documentationFileRevision.temporary}
                            onSwitchChange={onSwitchRevisionChange}
                            name="temporary"
                        />
                    </Grid>


                </Grid>

                <Grid container spacing={gridSpacing} className={classes.container}>
                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
                        <DatePickerCustom
                            title="general.expirationDate"
                            value={documentationFile.expirationDate}
                            onDateTimeChange={onDateTimeChange}
                            name="expirationDate"
                        />
                    </Grid>

                    <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                        <Grid container alignItems="center">
                            <TypographyFieldTitle title="general.responsiblePerson"/>
                            <Tooltip title={<IntlMessages id="documentation.responsiblePerson.message"/>}
                                     classes={{tooltip: classes.noMaxWidth}}>
                                <IconButton aria-label="Info" className={classes.infoIcon}>
                                    <Info/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <SelectCustom
                            value={documentationFile.userResponsible}
                            disabled={false}
                            name="userResponsible"
                            selectArray={users}
                            onSelectChange={onSelectChange}
                            optionProp="fullName"
                            optionKey="userId"
                            label="users.title"/>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                        <TypographyFieldTitle title="documentation.protectedFromDownload"/>
                        <SwitchCustom
                            disabled={editDisabled}
                            value={documentationFile.protectedFile}
                            onSwitchChange={onSwitchFileChange}
                            name="protectedFile"
                        />
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                        <Grid container alignItems="center">
                            <TypographyFieldTitle title="documentation.uncontrolledCopy"/>
                            <Tooltip title={<IntlMessages id="documentation.uncontrolledCopy.message"/>}
                                     classes={{tooltip: classes.noMaxWidth}}>
                                <IconButton aria-label="Info" className={classes.infoIcon}>
                                    <Info/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <Box fontSize={12} fontStyle="oblique" color="primary.main">
                                    <IntlMessages id="documentation.uncontrolledCopy.warning"/>
                                </Box>
                            </Grid>
                        </Grid>
                        <SwitchCustom
                            disabled={editDisabled}
                            value={documentationFile.uncontrolledCopy}
                            onSwitchChange={onSwitchFileChange}
                            name="uncontrolledCopy"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={gridSpacing} >

                </Grid>
                <Grid container spacing={gridSpacing} className={classes.container}>
                    <Grid item xl={5} lg={5} md={6} sm={12} xs={12} container className={classes.rcaBc}>
                        <Grid item xs={12}>
                            <FormGroup>
                                <RadioGroupValidation
                                    row
                                    validators={['required']}
                                    errorMessages={[<IntlMessages id="general.validation"/>]}
                                    required
                                    disabled={editDisabled}
                                    name="permissionType"
                                    value={documentationFile.permissionType}
                                    onChange={onRadioButtonChange}
                                    label="documentation.permissionType"
                                    options={radioGroupPermissionTypes}
                                />
                            </FormGroup>
                        </Grid>
                        {documentationFile.permissionType === "userRole" &&
                            <Grid item xs={12}>
                                <TypographyFieldTitle title="documentation.permissions"/>
                                <SelectMultipleAdvancedValidation
                                    disabled={editDisabled}
                                    title="userRoles.title"
                                    selectArray={documentationFile.documentationFileUserRoleJoined}
                                    objectArray={userRoles}
                                    firstLvlValueProp="userRole"
                                    secondLvlValueProp="userRoleId"
                                    onMultiSelectChange={onMultiSelectUserRoleChange}
                                    optionProp="name"
                                    optionKey="userRoleId"
                                    required
                                />
                            </Grid>
                        }
                        {documentationFile.permissionType === "userGroup" &&
                            <Grid item xs={12}>
                                <TypographyFieldTitle title="documentation.permissions"/>
                                <SelectMultipleAdvancedValidation
                                    disabled={editDisabled}
                                    title="users.groups"
                                    selectArray={documentationFile.documentationFileUserGroupJoined}
                                    objectArray={userGroups}
                                    firstLvlValueProp="userGroup"
                                    secondLvlValueProp="userGroupId"
                                    onMultiSelectChange={onMultiSelectUserGroupChange}
                                    optionProp="name"
                                    optionKey="userGroupId"
                                    required
                                />
                            </Grid>
                        }
                        {documentationFile.permissionType === "department" &&
                            <Grid item xs={12}>
                                <TypographyFieldTitle title="documentation.permissions"/>
                                <SelectMultipleAdvancedValidation
                                    disabled={editDisabled}
                                    title="general.departments"
                                    selectArray={documentationFile.documentationFileDepartmentJoined}
                                    objectArray={departments}
                                    firstLvlValueProp="department"
                                    secondLvlValueProp="departmentId"
                                    onMultiSelectChange={onMultiSelectDepartmentChange}
                                    optionProp="name"
                                    optionKey="departmentId"
                                    required
                                />
                            </Grid>
                        }
                        {documentationFile.permissionType === "subdivision" &&
                            <Grid item xs={12}>
                                <TypographyFieldTitle title="documentation.permissions"/>
                                <SelectMultipleAdvancedValidation
                                    disabled={editDisabled}
                                    title="general.subdivisions"
                                    selectArray={documentationFile.documentationFileSubdivisionJoined}
                                    objectArray={subdivisions}
                                    firstLvlValueProp="subdivision"
                                    secondLvlValueProp="subdivisionId"
                                    onMultiSelectChange={onMultiSelectSubdivisionChange}
                                    optionProp="name"
                                    optionKey="subdivisionId"
                                    required
                                />
                            </Grid>
                        }
                        {documentationFile.permissionType === "individual" &&
                            <Grid item xs={12}>
                                <TypographyFieldTitle title="documentation.permissions"/>
                                <AutocompleteMultiLargeDatasetValidation
                                    disabled={false}
                                    label="users.title"
                                    value={documentationFile.documentationFileUserJoined}
                                    options={users}
                                    name="documentationFileUserJoined"
                                    nestedPropName="user"
                                    onAutocompleteMultiChange={onMultiAutocompleteUserChange}
                                    labelProp="fullName"
                                    keyProp="userId"
                                    required
                                    validators={['required']}
                                    errorMessages={['This is required field.']}
                                />
                            </Grid>
                        }
                    </Grid>
                    <Grid item xs={6}>
                        <TypographyFieldTitle title="general.note"/>
                        <TextFieldMultiline
                            rows={3}
                            id="note"
                            label=""
                            name="note"
                            value={documentationFile.note}
                            onInputChange={onInputFileChange}
                            placeholder="general.note"
                            type="text"/>
                    </Grid>
                </Grid>
                <Grid container spacing={gridSpacing} className={classes.container}>


                </Grid>

                <Grid container className={classes.notificationPart}>

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div className={classes.actions}>
                            <NotificationsActiveIcon className={classes.leftIcon}/>
                            <strong className={classes.iconTitle}><IntlMessages id="promotion.news.notification"/></strong>
                        </div>

                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <TypographyFieldTitle title="promotion.news.notificationType"/>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <CheckboxReport
                                        disabled={editDisabled}
                                        checked={notifyByEmail}
                                        onCheckboxChange={onCheckboxNotifyByEmailChange}
                                        value="notifyByEmail"
                                    />
                                }
                                label={<IntlMessages id="documentation.notifyByEmail"/>}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <CheckboxReport
                                        disabled={editDisabled}
                                        checked={notifyByMessageBoard}
                                        onCheckboxChange={onCheckboxNotifyByMessageBoardChange}
                                        value="notifyByMessageBoard"
                                    />
                                }
                                label={<IntlMessages id="documentation.notifyByMessageBoard"/>}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container spacing={gridSpacing} className={classes.container} justify="center">
                    <Grid item>
                        <FormSubmit handleCancel={onCancelDocumentationFile}/>
                    </Grid>
                </Grid>


            </ValidatorForm>
        </div>
    );
}

FileDetailsForm.propTypes = {
    documentationFile: PropTypes.object.isRequired,
    onInputFileChange: PropTypes.func.isRequired,
}
export default withValidation(FileDetailsForm);