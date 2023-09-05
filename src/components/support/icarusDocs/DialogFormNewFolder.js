import React from 'react';
import TextFieldValidation from "../../core/TextField/TextFieldValidation";
import {ValidatorForm} from "react-material-ui-form-validator";
import {DialogActions, DialogContent, FormGroup} from "@mui/material";
import Grid from "@mui/material/Grid";
import TypographyFieldTitle from "../../core/TypographyFieldTitle";
import RadioGroupValidation from "../../core/RadioGroup/RadioGroupValidation";
import SelectMultipleAdvancedValidation from "../../core/Select/SelectMultipleAdvancedValidation";
import Button from "@mui/material/Button";
import IntlMessages from "../../core/IntlMessages";
import PropTypes from "prop-types";
import withValidation from "../../core/HOC/withValidation";
import AutocompleteMultiLargeDatasetValidation from '../../core/Autocomplete/AutocompleteMultiLargeDatasetValidation';

const radioGroupPermissionTypes = [
    {value: "userRole", label: "userRoles.title"},
    {value: "userGroup", label: "users.groups"},
    {value: "department", label: "general.departments"},
    {value: "subdivision", label: "general.subdivisions"},
    {value: "individual", label: "general.individual"}
];

function DialogFormNewFolder (props) {

    const {
        documentationFolder,
        userRoles,
        userGroups,
        departments,
        subdivisions,
        users,
        onClose,
        onSubmit,
        onInputChange,
        onMultiSelectUserRoleChange,
        onMultiSelectUserGroupChange,
        onMultiSelectDepartmentChange,
        onMultiSelectSubdivisionChange,
        onMultiAutocompleteUserChange,
        onRadioButtonChange,
        onValidationError
    } = props;

    return(
        <ValidatorForm
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
            onError={onValidationError}
        >
            <DialogContent>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TypographyFieldTitle title="documentation.folder.name" />
                        <TextFieldValidation
                            disabled={false}
                            id="folderName"
                            label="general.name"
                            name="folderName"
                            value={documentationFolder.folderName}
                            onInputChange={onInputChange}
                            placeholder="general.name"
                            type="text"
                            validators={['required']}
                            errorMessages={['This field is required']}
                            required
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <FormGroup>
                        <RadioGroupValidation
                            row
                            validators={['required']}
                            errorMessages={[<IntlMessages id="general.validation"/>]}
                            required
                            disabled={false}
                            name="permissionType"
                            value={documentationFolder.permissionType}
                            onChange={onRadioButtonChange}
                            label="documentation.permissionType"
                            options={radioGroupPermissionTypes}
                        />
                    </FormGroup>
                </Grid>
                {documentationFolder.permissionType === "userRole" &&
                <Grid item xs={12}>
                    <TypographyFieldTitle title="documentation.permissions"/>
                    <SelectMultipleAdvancedValidation
                        disabled={false}
                        title="userRoles.title"
                        selectArray={documentationFolder.documentationFolderUserRoleJoined}
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
                {documentationFolder.permissionType === "userGroup" &&
                <Grid item xs={12}>
                    <TypographyFieldTitle title="documentation.permissions"/>
                    <SelectMultipleAdvancedValidation
                        disabled={false}
                        title="users.groups"
                        selectArray={documentationFolder.documentationFolderUserGroupJoined}
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
                {documentationFolder.permissionType === "department" &&
                <Grid item xs={12}>
                    <TypographyFieldTitle title="documentation.permissions"/>
                    <SelectMultipleAdvancedValidation
                        disabled={false}
                        title="general.departments"
                        selectArray={documentationFolder.documentationFolderDepartmentJoined}
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
                {documentationFolder.permissionType === "subdivision" &&
                <Grid item xs={12}>
                    <TypographyFieldTitle title="documentation.permissions"/>
                    <SelectMultipleAdvancedValidation
                        disabled={false}
                        title="general.subdivisions"
                        selectArray={documentationFolder.documentationFolderSubdivisionJoined}
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
                {documentationFolder.permissionType === "individual" &&
                <Grid item xs={12}>
                    <TypographyFieldTitle title="documentation.permissions"/>
                    <AutocompleteMultiLargeDatasetValidation
                        disabled={false}
                        label="general.individual"
                        value={documentationFolder.documentationFolderUserJoined}
                        options={users}
                        name="documentationFolderUserJoined"
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
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    <IntlMessages id="action.cancel" />
                </Button>
                <Button type="submit" className="uppercase">
                    <IntlMessages id="action.add" />
                </Button>
            </DialogActions>
        </ValidatorForm>
    )
}
DialogFormNewFolder.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onMultiSelectChange: PropTypes.func.isRequired,
    documentationFolder: PropTypes.object.isRequired,
}

export default withValidation(DialogFormNewFolder);