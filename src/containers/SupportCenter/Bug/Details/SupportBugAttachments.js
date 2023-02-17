import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { cloneDeep } from 'lodash';
import { makeStyles } from '@mui/styles';

import Attachments from '../../../../components/attachments/Attachments';
import FormEditBar from '../../../../components/core/Form/FormEditBar';
import * as supportActions from '../../../../redux/support/supportActions';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3),
    },
}));

function SupportBugAttachments(props) {
    const classes = useStyles();

    const [editDisabled, setEditDisabled] = useState(true);
    const [supportBug, setSupportBug] = useState({
        comments: [],
        supportBugAttachments: []
    });
    const [newAttachments, setNewAttachments] = useState([]);

    useEffect(() => {
        if (props.supportBug.supportBugId) {
            setSupportBug(props.supportBug);
        }
    }, [props.supportBug]);

    const handleEditDisabled = () => {
        setEditDisabled(!editDisabled);
    }

    const handleUploadAttachments = () => {
        if (newAttachments.length > 0) {
            let viewModel = {
                files: newAttachments,
                data: JSON.stringify(supportBug)
            }
            props.supportActions.updateWithAttachments(viewModel)
        }
        setEditDisabled(true);
        setNewAttachments([]);
    }

    const handleNewAttachSubmit = (file, attachment) => {
        let supportBugClone = cloneDeep(supportBug);
        supportBugClone.supportBugAttachments.push(attachment);

        setNewAttachments([...newAttachments, file]);
        setSupportBug(supportBugClone);
    }

    const handleAttachDelete = (event, attachment) => {
        let supportBugClone = cloneDeep(supportBug);
        for (let i = 0, l = supportBugClone.supportBugAttachments.length; i < l; i++) {
            if (supportBugClone.supportBugAttachments[i].filename === attachment.filename) {
                supportBugClone.supportBugAttachments.splice(i, 1);
                setSupportBug(supportBugClone);
                break;
            }
        }

        for (let i = 0, l = newAttachments.length; i < l; i++) {
            if (newAttachments[i].name === attachment.filename) {
                setNewAttachments([...newAttachments.slice(0, i), ...newAttachments.slice(i + 1)]);
                break;
            }
        }
    }

    const handleAttachDownload = (event, attachment) => {
        let viewModel = {
            id: supportBug.supportBugId,
            filename: attachment.filename
        };
        props.supportActions.download(viewModel);
    }

    return (
        <React.Fragment>
            <FormEditBar
                title="attachments.label"
                editDisabled={editDisabled}
                onEditSelect={handleEditDisabled}
                onCancelSelect={handleEditDisabled}
                onSaveSelect={handleUploadAttachments}
            />
            <div className={classes.root}>
                <Attachments
                    attachments={supportBug.supportBugAttachments}
                    onNewAttachSubmit={handleNewAttachSubmit}
                    onAttachDelete={handleAttachDelete}
                    onAttachDownload={handleAttachDownload}
                    editDisabled={editDisabled}
                />
            </div>
        </React.Fragment>
    )
}

function mapStateToProps(state, ownProps) {
    return {
        supportBug: state.SupportCenter.supportBug,
        progress: state.Progress.progress,
        progressBarOpened: state.Progress.progressOpened
    }
}

function mapDispatchToProps(dispatch) {
    return {
        supportActions: bindActionCreators(supportActions, dispatch),

    };
}

export default (connect(mapStateToProps, mapDispatchToProps)(SupportBugAttachments));