import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Paper } from '@mui/material';
import { cloneDeep } from 'lodash';

import DialogDeleteWarning from '../../../components/core/Dialog/DialogDeleteWarning';
import DialogGenericWarning from '../../../components/core/Dialog/DialogGenericWarning';
import UserForm from '../../../components/user/UserForm';
import FormEditBar from '../../../components/core/Form/FormEditBar';
import FormTitleBar from '../../../components/core/Form/FormTitleBarRich';
import * as userRoleActions from '../../../redux/user/role/userRoleActions';
import * as userActions from '../../../redux/user/userActions';
import * as Protected from '../../../protectedAuth';
import { withRouter } from 'react-router-dom';
import { getUsersPath } from "../../../consts/routePaths";

function User(props) {

    const [user, setUser] = useState({
        userRoleJoined: []
    })
    const [editDisabled, setEditDisabled] = useState(false);
    const [dialogDeleteWarningOpen, setDialogDeleteWarningOpen] = useState(false);
    const [dialogReactivateWarningOpen, setDialogReactivateWarningOpen] = useState(false);
    const [generatePassword, setGeneratePassword] = useState(true);
    const [newPassword, setNewPassword] = useState(false);

    useEffect(() => {
        if (props.userId !== "-1") {
            const viewModel = {
                userId: props.userId
            }
            props.userActions.load(viewModel);
            setEditDisabled(true);
        }
        props.userRoleActions.loadAll();
    }, []);

    useEffect(() => {
        if (props.user.userId) {
            setUser(props.user);
            setEditDisabled(true);
        }
    }, [props.user.userId]);

    const handleInputChange = ({target: { name, value }}) => {
        let userClone = cloneDeep(user);
        userClone[name] = value;
        setUser(userClone);
    };

    const handleSelectChange = (event, name) => {
        let userClone = cloneDeep(user);
        userClone[event.target.name] = {
            [name]: event.target.value
        }
        setUser(userClone);
    }

    const handleSwitchChange = name => event => {
        let userClone = cloneDeep(user);
        userClone[name] = event.target.checked;
        setUser(userClone);
    }

    const handleGeneratePasswordSwitchChange = () => event => {
        let generatePasswordClone = event.target.checked;
        setGeneratePassword(generatePasswordClone);
    }

    const handleNewPasswordSwitchChange = name => event => {
        let newPasswordClone = cloneDeep(newPassword);
        newPasswordClone = event.target.checked;
        setNewPassword(newPasswordClone);
    }

    const handleUserRoleSelectChange = (event) => {
        let selectedUserRoles = [];
        let lastSelected = event.target.value[event.target.value.length - 1];
        if (lastSelected === "SelectAll") {
            props.userRoles.forEach(userRole => {
                selectedUserRoles.push({
                    userRole
                });
            });
        } else if (lastSelected === "DeselectAll") {
            selectedUserRoles = [];
        } else {
            const selectedUserRoleIds = event.target.value;
            for (let i = 0, l = selectedUserRoleIds.length; i < l; i++) {
                const userRoleObject = props.userRoles.find(userRole => userRole.userRoleId === selectedUserRoleIds[i]);
                selectedUserRoles.push({
                    userRole: userRoleObject
                });
            }
        }

        let userClone = cloneDeep(user);
        userClone.userRoleJoined = selectedUserRoles;
        setUser(userClone);
    }

    const handleUserSave = event => {
        event.preventDefault();
        let viewModel = {
            user: user,
            generatePassword: generatePassword,
            newPassword: newPassword
        }
        if (user.userId) {
            props.userActions.update(viewModel);
            setEditDisabled(true);
        } else {
            props.userActions.create(viewModel);
        }
    }

    const handleDeleteConfirmed = event => {
        let viewModel = {
            userId: user.userId
        }
        props.userActions.deleteAction(viewModel)
    }

    const handleReactivateUserClick = event => {
        let viewModel = {
            userId: user.userId
        }
        props.userActions.reactivate(viewModel);
        setDialogReactivateWarningOpen(true);
    }

    const handleEditUser = event => {
        setEditDisabled(false);
    }

    const handleCancelEditUser = event => {
        setEditDisabled(true);
    }

    const handleDeleteUser = event => {
        setDialogDeleteWarningOpen(true);
    }

    const handleCancelForm = event => {
        props.history.push(getUsersPath(0, 25));
    }

    const checkUserRoleInArray = (userRoleId) => {
        for (let i = 0, l = user.userRoleJoined.length; i < l; i++) {
            if (user.userRoleJoined[i].userRole.userRoleId === userRoleId) {
                return true;
            }
        }
        return false;
    }

    const handleDeleteClose = event => {
        setDialogDeleteWarningOpen(false);
    }

    const handleReactivateWarningClose = event => {
        setDialogReactivateWarningOpen(false);
    }

    const handleRenewCodeClick = event => {
        let viewModel = {
            userId: user.userId
        }
        props.userActions.renewCode(viewModel);

    }

    const {userId, userRoles} = props;

    return (
        <Paper>
            {userId !== "-1" ?
                (user.deactivated ?
                    <FormTitleBar title="user.title"/> :
                    (Protected.protectedAuth(['PERM_USER_CRUD']) ?
                        <FormEditBar title="form.user"
                                     editDisabled={editDisabled}
                                     onEditSelect={handleEditUser}
                                     onSaveSelect={handleUserSave}
                                     onCancelSelect={handleCancelEditUser}
                                     showDelete={true}
                                     onDeleteSelect={handleDeleteUser}/> :
                        <FormEditBar title="form.user"
                                     editDisabled={editDisabled}
                                     onEditSelect={handleEditUser}
                                     onSaveSelect={handleUserSave}
                                     onCancelSelect={handleCancelEditUser}/>)) :
                <FormTitleBar title="form.user"/>}

            <UserForm
                user={user}
                editDisabled={editDisabled}
                generatePassword={generatePassword}
                newPassword={newPassword}
                onInputChange={handleInputChange}
                onSelectChange={handleSelectChange}
                onMultiSelectChange={handleUserRoleSelectChange}
                onUserSave={handleUserSave}
                onReactivateUserClick={handleReactivateUserClick}
                onSwitchChange={handleSwitchChange}
                onGeneratePasswordSwitchChange={handleGeneratePasswordSwitchChange}
                onNewPasswordSwitchChange={handleNewPasswordSwitchChange}
                onCancelForm={handleCancelForm}
                checkUserRoleInArray={checkUserRoleInArray}
                userRoles={userRoles}
                gridSpacing={2}
                onRenewCode={handleRenewCodeClick}
            />

            <DialogDeleteWarning
                open={dialogDeleteWarningOpen}
                text="Are you sure you want to delete this user?"
                onDelete={handleDeleteConfirmed}
                onClose={handleDeleteClose}/>

            <DialogGenericWarning
                open={dialogReactivateWarningOpen}
                text="Please update the password when user reactivates."
                onClose={handleReactivateWarningClose}/>
        </Paper>
    );
}

function mapStateToProps(state, ownProps) {
    const {id} = ownProps.match.params;
    return {
        user: state.User.user,
        userRoles: state.UserRole.userRoles,
        userId: id
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        userRoleActions: bindActionCreators(userRoleActions, dispatch),

    };
}

export default (connect(mapStateToProps, mapDispatchToProps)(withRouter(User)));