import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { cloneDeep } from 'lodash';

import DialogFormUserGroup from '../../../components/user/DialogFormUserGroup';
import DialogDeleteWarning from '../../../components/core/Dialog/DialogDeleteWarning';
import UserGroupList from './UserGroupList';
import DialogFormFrame from '../../../components/core/Dialog/DialogFormFrame';
import * as userGroupActions from '../../../redux/user/group/userGroupActions';
import * as userAction from "../../../redux/user/userActions";
import { getUserGroupsPath } from "../../../consts/routePaths";

function UserGroups(props) {
    const [userGroup, setUserGroup] = useState({
        userGroupJoined: []
    });
    const [userGroupIdForDelete, setUserGroupIdForDelete] = useState(undefined);
    const [dialogUserGroupDetailsOpen, setDialogUserGroupDetailsOpen] = useState(false);
    const [dialogWarningOpen, setDialogWarningOpen] = useState(false);

    useEffect(() => {
        const viewModel = {
            page: props.page,
            rowsPerPage: props.rowsPerPage
        }
        props.userGroupActions.loadAllPagination(viewModel);

        props.userGroupActions.loadAllPagination(viewModel);
        props.userAction.loadAll();
    }, []);

    const handleChangePage = (event, page) => {
        props.history.push(getUserGroupsPath(page, props.rowsPerPage));
    };

    const handleChangeRowsPerPage = event => {
        props.history.push(getUserGroupsPath(props.page, event.target.value));
    };

    const handleGroupNewClick = (event) => {
        let userGroup = {
            userGroupId: undefined,
            name: undefined,
            userGroupJoined: [],
        };
        setUserGroup(userGroup);
        setDialogUserGroupDetailsOpen(true);
    }

    const handleGroupEdit = (event, userGroup) => {
        setUserGroup(userGroup);
        setDialogUserGroupDetailsOpen(true);
    }

    const handleGroupDelete = (event, role) => {
        setUserGroupIdForDelete(role.userGroupId);
        setDialogWarningOpen(true);
    }

    const handleUserGroupDetailsInputChange = ({target: { name, value }}) => {
        let userGroupClone = cloneDeep(userGroup);
        userGroupClone[name] = value;
        setUserGroup(userGroupClone);
    };

    const handleUserGroupDialogDetailsClose = () => {
        setDialogUserGroupDetailsOpen(false);
    }

    const handleUserGroupDialogDetailsSubmit = () => {
        setDialogUserGroupDetailsOpen(false);

        if (userGroup.userGroupId) {
            let viewModel = {
                requestBody: userGroup,
                params: {
                    page: props.page,
                    rowsPerPage: props.rowsPerPage
                }
            }
            props.userGroupActions.update(viewModel);
        }
        else {
            props.userGroupActions.create(userGroup)
        }
    }

    const handleDeleteUserGroupConfirmed = () => {
        if (userGroupIdForDelete) {
            let viewModel = {
                userGroupId: userGroupIdForDelete
            }
            props.userGroupActions.deleteAction(viewModel);
        }

        setDialogWarningOpen(false);
    }

    const handleDeleteUserGroupClose = () => {
        setDialogWarningOpen(false);
    }

    const handleUserGroupDialogDetailsMultiSelectChange = (event) => {
        let selectedUsers = [];
        let lastSelected = event.target.value[event.target.value.length - 1];
        if (lastSelected === "SelectAll") {
            props.users.forEach(user => {
                selectedUsers.push({
                    user
                });
            });
        } else if (lastSelected === "DeselectAll") {
            selectedUsers = [];
        } else {
            const selectedUsersId = event.target.value;
            for (let i = 0, l = selectedUsersId.length; i < l; i++) {
                const userObject = props.users.find(user => user.userId === selectedUsersId[i]);
                selectedUsers.push({
                    user: userObject
                });
            }
        }
        let userGroupClone = cloneDeep(userGroup);
        userGroupClone.userGroupJoined = selectedUsers;
        setUserGroup(userGroupClone);
    }

    const {userGroups, totalCount, users, page, rowsPerPage} = props;

    return (
        <div>
            <UserGroupList
                userGroups={userGroups}
                totalCount={totalCount}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                page={page}
                rowsPerPage={rowsPerPage}
                onGroupNewClick={handleGroupNewClick}
                onGroupEdit={handleGroupEdit}
                onGroupDelete={handleGroupDelete}
            />
            <DialogFormFrame
                onClose={handleUserGroupDialogDetailsClose}
                title="User groups"

                open={dialogUserGroupDetailsOpen}
            >
                <DialogFormUserGroup
                    onClose={handleUserGroupDialogDetailsClose}
                    onSubmit={handleUserGroupDialogDetailsSubmit}
                    onInputChange={handleUserGroupDetailsInputChange}
                    onMultiSelectChange={handleUserGroupDialogDetailsMultiSelectChange}
                    userGroup={userGroup}
                    users={users}
                />
            </DialogFormFrame>
            <DialogDeleteWarning
                open={dialogWarningOpen}
                text="Are you sure you want to delete this item?"
                onDelete={handleDeleteUserGroupConfirmed}
                onClose={handleDeleteUserGroupClose}/>
        </div>

    );
}


function mapStateToProps(state, ownProps) {
    let page = 0;
    let rowsPerPage = 25;
    if (ownProps.match.params.page) {
        page = parseInt(ownProps.match.params.page);
    }
    if (ownProps.match.params.rowsPerPage) {
        rowsPerPage = parseInt(ownProps.match.params.rowsPerPage);
    }
    return {
        userGroups: state.UserGroup.userGroupsPagination,
        totalCount: state.UserGroup.totalCount,
        users: state.User.users,
        page: page,
        rowsPerPage: rowsPerPage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userGroupActions: bindActionCreators(userGroupActions, dispatch),
        userAction: bindActionCreators(userAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserGroups)