import React, {useEffect, useState} from 'react';
import {makeStyles} from "@mui/styles";
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from "react-redux";
import FormTitleSubtitleBar from "../../../components/core/Form/FormTitleSubtitleBar";
import Grid from "@mui/material/Grid";
import { auditChecklistActions } from "../../../redux/auditChecklist/auditChecklistReducer";
import IntlMessages from "../../../components/core/IntlMessages";
import TextFieldMultiline from "../../../components/core/TextField/TextFieldMultiline";
import * as Protected from "../../../protectedAuth";
import Button from "@mui/material/Button";
import NoteAdd from "@mui/icons-material/NoteAdd";
import SwapVert from "@mui/icons-material/SwapVert";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
import { cloneDeep } from "lodash";
import ChecklistItemCreateForm from "../../../components/auditItem/ChecklistItemCreateForm";
import ChecklistSubAreaCreateForm from "../../../components/auditSubArea/ChecklistSubAreaCreateForm";
import DialogDeleteWarning from "../../../components/core/Dialog/DialogDeleteWarning";
import DialogFormSubAreaNew from "../../../components/auditSubArea/dialogs/DialogFormSubAreaNew";
import ChecklistDnDTree from "../../../components/auditChecklist/dnd/ChecklistDnDTree";
import DialogFormExportData from "../../../components/core/Dialog/DialogFormExportData";
import DialogFormUploadCSVFile from "../../../components/core/Dialog/DialogFormUploadCSVFile";

import { auditChecklistSubAreaActions } from "../../../redux/auditChecklistSubArea/AuditChecklistSubAreaReducer";
import { auditChecklistItemActions } from "../../../redux/auditChecklistItem/auditChecklistItemReducer";
import { auditorActionLocationType } from "../../../redux/auditorActionLocationType/AuditorActionLocationTypeReducer";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(3)
    },
    labelCustom:{
        marginLeft: '10px',
        fontWeight: "bold",
    },
    labelCustomValue:{
        paddingLeft: '10px',
    },
    labelCustomValuePublished: {
        paddingLeft: '10px',
        fontWeight: 'bold',
        color: 'green'
    },
    labelCustomValueDraft: {
        paddingLeft: '10px',
        fontWeight: 'bold'
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    container: {
        marginTop: theme.spacing(2)
    },
    treeScrolls:{
        maxHeight:'450px',
        overflow : 'auto'
    },
    objectives:{
        paddingLeft: '10px',
        paddingRight: '10px'
    },
    treeRoot: {
        marginLeft: theme.spacing(1),
        height: '500px',
        overflowY: 'auto'
    }
}));

const AuditChecklist = (props) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    //Storage
    const checklistDnd = useSelector((state) => state.AuditChecklist.auditDndChecklist);
    const checklistItem = useSelector((state) => state.AuditChecklistItem.auditItem);
    const checklistSubArea = useSelector((state) => state.AuditChecklistSubArea.auditChecklistSubArea);
    const locationTypes = useSelector((state) => state.AuditorActionLocationType.locationTypes);

    //Visibility
    const [editDisabled, setEditDisabled] = useState(false);
    const [itemVisible, setItemVisible] = useState(false);
    const [subAreaVisible, setSubAreaVisible] = useState(false);

    //Dialogs
    const [dialogSubAreaOpen, setDialogSubAreaOpen] = useState(false);
    const [dialogDeleteSubareaOpen, setDialogDeleteSubareaOpen] = useState(false);
    const [dialogDeleteItemOpen, setDialogDeleteItemOpen] = useState(false);
    const [dialogExportOpen, setDialogExportOpen] = useState(false);
    const [dialogUploadCsv, setDialogUploadCsv] = useState(false);
    const [dialogPublish, setDialogPublish] = useState(false);

    //Export
    const [radioValue, setRadioValue] = useState("pdf");

    //DnD
    const [selectedChecklistDnd, setSelectedChecklistDnd] = useState([]);

    //Selected
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedSubArea, setSelectedSubArea] = useState({
        auditChecklistSubAreaId: undefined,
        title: "",
        auditItems: []
    });

    //DnD
    const [selectedDnDElement, setSelectedDndElement] = useState({});
    const [affectedParents, setAffectedParents] = useState([]);

    useEffect(() => {
        const viewModel = {
            id: props.match.params.id
        }
        dispatch(auditChecklistActions.getAuditDndChecklistRequest(viewModel));
        dispatch(auditorActionLocationType.getLocationTypes());
    }, [dispatch, props.match.params.id]);

    useEffect(() => {
        setSelectedItem(checklistItem);
    }, [checklistItem]);

    useEffect(() => {
        setSelectedSubArea(checklistSubArea);
    }, [checklistSubArea]);

    useEffect(() => {
        setSelectedChecklistDnd(checklistDnd.dndTreeViewData);
    }, [checklistDnd]);

    //Upload
    const handleUploadCSV = () => {
        setDialogUploadCsv(true);
    };

    const handleUploadCSVClose = () => {
        setDialogUploadCsv(false);
    };

    const handleAttachmentNewSubmit = (file) => {
        setDialogUploadCsv(false);
        let dataViewModel = {
            auditChecklistId: props.match.params.id,
        }

        const viewModel = {
            checklistData: {
                file: file,
                data: JSON.stringify(dataViewModel),
            },
            checklistId: {
                id: props.match.params.id
            }
        };
        dispatch(auditChecklistActions.uploadCSVChecklistRequest(viewModel));
    };

    const handleInputChangeChecklist = () => {}

    const onNewItemClick = () => {
        let viewModel = {
            auditItemId: null,
            question:"",
            guidance:"",
            showAuditorAction:false,
            title:"",
            auditChecklistSubArea: null,
            auditorActions: [{
                title: "",
                locationType: {}
            }]
        };
        setSelectedItem(viewModel);
        setItemVisible(true);
        setSubAreaVisible(false);
        setEditDisabled(false);
    }

    const onUpdateOrderClick = () => {
        const affectedParentsCopy = cloneDeep(affectedParents);
        const uniqueAffectedParents = Array.from(new Set(affectedParentsCopy));

        const selectedChecklistDndCopy = cloneDeep(selectedChecklistDnd);

        let dndElementsToUpdate = []

        selectedChecklistDndCopy.map(dndElement => {
            const contains = uniqueAffectedParents.find(parentAffected => parentAffected === dndElement.parent);
            if(contains) {
                dndElementsToUpdate.push(dndElement);
            }
        });

        const viewModel = {
            auditChecklistId: props.match.params.id,
            data: {
                dndTreeViewData: dndElementsToUpdate
            }
        };
        dispatch(auditChecklistActions.updateAuditChecklistOrderRequest(viewModel));
    }

    const handleNewSubArea = () => {
        let viewModel = {
            auditChecklistSubAreaId: null,
            title:"",
            auditChecklist: {
                auditChecklistId: props.match.params.id
            }
        };
        setSelectedSubArea(viewModel);
        setDialogSubAreaOpen(true);
        setItemVisible(false);
    }

    const handleNewSubAreaClose = () => {
        setDialogSubAreaOpen(false);
    }

    const handleInputSubAreaChange = event => {
        const { name, value } = event.target;
        setSelectedSubArea({
            ...selectedSubArea,
            [name]: value
        });
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSelectedItem({
            ...selectedItem,
            [name]: value
        });
    }

    const handleChecklistItemSave = event => {
        event.preventDefault();
        setItemVisible(false);

        let viewModel = {}
        viewModel.selectedItem = cloneDeep(selectedItem);

        let checklistCopy = cloneDeep(checklistDnd.auditChecklist);
        viewModel.auditChecklist = { auditChecklistId: checklistCopy.auditChecklistId }

        if(!selectedItem.auditChecklistSubArea) {
            viewModel.selectedItem.auditChecklist = {
                auditChecklistId: checklistCopy.auditChecklistId
            };
        }

        if(viewModel.selectedItem.auditItemId) {
            dispatch(auditChecklistItemActions.updateAuditChecklistItemRequest(viewModel));
        } else {
            debugger;
            dispatch(auditChecklistItemActions.createAuditChecklistItemRequest(viewModel));
        }
    }

    const handleCancelClick = () => {
        const viewModel = {
            auditItemId: null,
            question:"",
            guidance:"",
            showAuditorAction:false,
            title:"",
            auditorActionsISAGO: []
        };
        setSelectedItem(viewModel);
        setItemVisible(false);
    };

    const handleDeleteItemClick = () => {
        setDialogDeleteItemOpen(true);
    };

    const handleSwitchChange = name => event => {
        let selectedItemClone = cloneDeep(selectedItem);
        selectedItemClone[name] = event.target.checked;
        setSelectedItem(selectedItemClone);
    };

    const handleDeleteSubareaClick = () => {
        setDialogDeleteSubareaOpen(true);
    };

    const handleDeleteSubareaClose = () => {
        setDialogDeleteSubareaOpen(false);
    };

    const handleDeleteSubArea = () => {
        let viewModel = {};
        viewModel.auditChecklistSubArea = {
            auditChecklistSubAreaId: selectedSubArea.auditChecklistSubAreaId
        }
        viewModel.checklistId = props.match.params.id;
        dispatch(auditChecklistSubAreaActions.deleteAuditChecklistSubAreaRequest(viewModel));
        setDialogDeleteSubareaOpen(false);
        setSubAreaVisible(false);
    }

    const handleEditSubArea = () => {
        setDialogSubAreaOpen(true);
    };

    const onSelectTreeItem = (subArea, id) => {
        if(subArea) {
            const viewModelSelectedSubArea = {
                auditChecklistSubAreaId: null,
                title: null,
                auditItems: [],
                auditCheckListSubAreas: []
            }
            setItemVisible(false);
            setSubAreaVisible(true);
            setSelectedSubArea(viewModelSelectedSubArea);
            const viewModel = {
                id: id
            }
            dispatch(auditChecklistSubAreaActions.getAuditChecklistSubAreaRequest(viewModel));
        } else {
            const viewModelSelectedItem = {
                auditItemId: null,
                question: null,
                guidance: null,
                showAuditorAction: false,
                title: "",
                auditChecklist: {
                    auditChecklistId: "",
                    title: null
                },
                auditChecklistSubArea: {
                    auditChecklistSubAreaId: "",
                    title: null
                },
                auditorActions: []
            };
            setSelectedItem(viewModelSelectedItem);
            setItemVisible(true);
            setSubAreaVisible(false);
            const viewModel = {
                id: id
            }
            dispatch(auditChecklistItemActions.getAuditChecklistItemRequest(viewModel));
        }
        setEditDisabled(true);
    }

    const handleDeleteItemClose = () => {
        setDialogDeleteItemOpen(false);
    }

    const handleDeleteItem = () => {
        const viewModel = cloneDeep(selectedItem);
        viewModel.auditChecklist = {};
        viewModel.auditChecklist.auditChecklistId = props.match.params.id;
        dispatch(auditChecklistItemActions.deleteAuditChecklistItemRequest(viewModel));
        setDialogDeleteItemOpen(false);
        setItemVisible(false);
    }

    const handleSelectCheckboxChangeItem = (selectedSubAreaId) => {
        let viewModel = cloneDeep(selectedItem);
        if(viewModel.auditChecklist) {
            viewModel.auditChecklist = null;
        }

        if(selectedItem.auditChecklistSubArea) {
            if(selectedItem.auditChecklistSubArea.auditChecklistSubAreaId === selectedSubAreaId) {
                viewModel.auditChecklistSubArea = null;
                viewModel.auditChecklist = { auditChecklistId: props.match.params.id};
            } else {
                viewModel.auditChecklistSubArea = { auditChecklistSubAreaId: selectedSubAreaId };
                viewModel.auditChecklist = null;
            }
        } else {
            viewModel.auditChecklistSubArea = { auditChecklistSubAreaId: selectedSubAreaId };
            viewModel.auditChecklist = null;
        }

        setSelectedItem(viewModel);
    }

    const handleSelectCheckboxChangeSubArea = (selectedSubAreaId) => {
        let viewModel = cloneDeep(selectedSubArea);
        if(viewModel.auditChecklist) {
            viewModel.auditChecklist = null;
        }

        if(selectedSubArea.auditChecklistSubArea) {
            if(selectedSubArea.auditChecklistSubArea.auditChecklistSubAreaId === selectedSubAreaId) {
                viewModel.auditChecklistSubArea = null;
                viewModel.auditChecklist = { auditChecklistId: props.match.params.id};
            } else {
                viewModel.auditChecklistSubArea = { auditChecklistSubAreaId: selectedSubAreaId };
                viewModel.auditChecklist = null;
            }
        } else {
            viewModel.auditChecklistSubArea = { auditChecklistSubAreaId: selectedSubAreaId };
            viewModel.auditChecklist = null;
        }

        setSelectedSubArea(viewModel);
    }

    const handleDialogSubAreaSubmit = () => {
        let viewModel = {};

        viewModel.checklistId = props.match.params.id;
        viewModel.auditChecklistSubArea = cloneDeep(selectedSubArea);

        if(viewModel.auditChecklistSubArea.auditChecklistSubAreaId === null) {
            dispatch(auditChecklistSubAreaActions.createAuditChecklistSubAreaRequest(viewModel));
        } else {
            dispatch(auditChecklistSubAreaActions.updateAuditChecklistSubAreaRequest(viewModel));

        }
        setDialogSubAreaOpen(false);
    }

    const handleEdit = () => {
        setEditDisabled(false);
    }

    const handleError = () => {}

    const handleDragStart = (item) => {
        setSelectedDndElement(item);
    }

    //This is executed before handleDragEnd
    const handleDrop = (newChecklistDnd) => {
        const newChecklistDndCopy = cloneDeep(newChecklistDnd);
        setDndElementParents(newChecklistDndCopy);
        setDndElementSequence(newChecklistDndCopy);

        affectedParentsSetter(newChecklistDndCopy);

        setSelectedChecklistDnd(newChecklistDndCopy);
    };

    const affectedParentsSetter = (checklistDnd) => {
        const selectedDndElementCopy = cloneDeep(selectedDnDElement);
        const changedDndElement = checklistDnd.find(dndElement => dndElement.id === selectedDndElementCopy.id);

        const affectedParentsCopy = cloneDeep(affectedParents);

        if(selectedDndElementCopy.parent !== changedDndElement.parent) {
            affectedParentsCopy.push(selectedDndElementCopy.parent, changedDndElement.parent);
        } else if(selectedDndElementCopy.data.sequence !== changedDndElement.data.sequence) {
            affectedParentsCopy.push(selectedDndElementCopy.parent);
        }

        setAffectedParents(affectedParentsCopy);
    }

    const setDndElementParents = (newChecklistDnd) => {
        newChecklistDnd.forEach(dndElement => {
            if(dndElement.parent === props.match.params.id) {
                setParentAuditChecklist(dndElement);
                dndElement.data.auditChecklistSubArea = null;
            } else {
                if(dndElement.data.auditChecklist) {
                    dndElement.data.auditChecklist = null;
                }

                if(dndElement.data.auditChecklistSubArea) {
                    dndElement.data.auditChecklistSubArea.auditChecklistSubAreaId = dndElement.parent;
                } else {
                    dndElement.data.auditChecklistSubArea = {};
                    dndElement.data.auditChecklistSubArea.auditChecklistSubAreaId = dndElement.parent;
                }
            }
        });
    }

    const setParentAuditChecklist = (dndElement) => {
        if(dndElement.data.auditChecklist) {
            dndElement.data.auditChecklist.auditChecklistId = props.match.params.id;
        } else {
            dndElement.data.auditChecklist = {};
            dndElement.data.auditChecklist.auditChecklistId = props.match.params.id;
        }
    }

    const setDndElementSequence = (newChecklistDnd) => {
        const seqDb = [];
        for(let i=0; i<newChecklistDnd.length; i++) {
            const dndElement = newChecklistDnd[i];
            const seqResult = seqDb.find(element => element.parent === dndElement.parent);
            if(!seqResult) {
                seqDb.push({
                    parent: dndElement.parent,
                    count: 1
                });
                dndElement.data.sequence = 1;
            } else {
                seqResult.count++;
                dndElement.data.sequence = seqResult.count;
            }
        }
    }

    const handleElementClick = (data) => {
        if(data.auditItemId !== undefined) {
            onSelectTreeItem(false, data.auditItemId);
        } else if(data.auditChecklistSubAreaId !== undefined) {
            onSelectTreeItem(true, data.auditChecklistSubAreaId);
        }
    };

    //Export checklist
    const handleExportClick = () => {
        setDialogExportOpen(true);
    };

    const handleExportSubmit = () => {
        let viewModel = cloneDeep(checklistDnd);

        if (radioValue === "pdf") {
            dispatch(auditChecklistActions.downloadPDFRequest(viewModel));
        } else {
            dispatch(auditChecklistActions.downloadExcelRequest(viewModel));
        }
        setDialogExportOpen(false);
    };

    const handleExportDialogClose = () => {
        setDialogExportOpen(false);
    };

    const handleRadioChange = event => {
        setRadioValue(event.target.value);
    };

    const onPublishSelect = () => {
        setDialogPublish(true);
    };

    const handleDialogPublishClose = () => {
        setDialogPublish(false);
    };

    const handlePublish = () => {
        let viewModel = {
            id: props.match.params.id,
            published: !checklistDnd.auditChecklist.published
        };
        dispatch(auditChecklistActions.publishChecklistRequest(viewModel));
        setDialogPublish(false);
    };

    //ISAGO
    const handleSelectLocationType = (event, index) => {
        const selectedItemCopy = cloneDeep(selectedItem);
        selectedItemCopy.auditorActions[index].locationType = locationTypes.find(locationType => {
            return locationType.locationTypeId === event.target.value;
        });
        setSelectedItem(selectedItemCopy);
    }

    const handleAddAuditorActions = () => {
        const selectedItemCopy = cloneDeep(selectedItem);
        selectedItemCopy.auditorActions.push({
            title: '',
            locationType: {}
        });
        setSelectedItem(selectedItemCopy);
    }

    const handleInputAuditorActionChange = (event, index) => {
        const selectedItemCopy = cloneDeep(selectedItem);
        selectedItemCopy.auditorActions[index].title = event.target.value;
        setSelectedItem(selectedItemCopy);
    }

    const handleDeleteAuditorAction = (index) => {
        const selectedItemCopy = cloneDeep(selectedItem);
        selectedItemCopy.auditorActions = selectedItemCopy.auditorActions.filter((auditorAction, aaIndex) => {
            return aaIndex !== index;
        });
        setSelectedItem(selectedItemCopy);
    }

    const {
        clientName
    } = props;

    return (
        <div className={classes.root}>
            <Paper>
                <FormTitleSubtitleBar
                    title="qms.checklist"
                    subtitle={checklistDnd.auditChecklist.title}
                    showExport={true}
                    onExportSelect={handleExportClick}
                    showImport={true}
                    onImportSelect={handleUploadCSV}
                    showPublish={checklistDnd.auditChecklist.published}
                    onPublishSelect={onPublishSelect}
                />
                <Grid container spacing={2}>
                    <Grid item sm={2} xs={12} >
                        <label className={classes.labelCustom}><IntlMessages id="general.id" />:</label>
                        <label className={classes.labelCustomValue}>{checklistDnd.auditChecklist.abbreviation}</label>
                    </Grid>
                    <Grid item sm={2} xs={12} >
                        <label className={classes.labelCustom}><IntlMessages id="qms.checklist.domain" />:</label>
                        <label className={classes.labelCustomValue}>{checklistDnd.auditChecklist.domain !== null ?
                            checklistDnd.auditChecklist.domain.name : "-"}</label>
                    </Grid>
                    <Grid item sm={2} xs={12} >
                        <label className={classes.labelCustom}><IntlMessages id="qms.checklist.version" />:</label>
                        <label className={classes.labelCustomValue}>{checklistDnd.auditChecklist.version}</label>
                    </Grid>
                    <Grid item sm={2} xs={12} >
                        <label className={classes.labelCustom}><IntlMessages id="qms.checklist.effectiveDate" />:</label>
                        <label className={classes.labelCustomValue}>{checklistDnd.auditChecklist.effectiveDate}</label>
                    </Grid>
                    <Grid item sm={2} xs={12} >
                        <label className={classes.labelCustom}><IntlMessages id="qms.checklist.createdBy" />:</label>
                        <label className={classes.labelCustomValue}>{checklistDnd.auditChecklist.userCreated !== null ? checklistDnd.auditChecklist.userCreated.surname
                            + " " + checklistDnd.auditChecklist.userCreated.name : "-"}</label>
                    </Grid>
                    <Grid item sm={2} xs={12} >
                        <label className={classes.labelCustom}><IntlMessages id="general.status" />:</label>
                        {
                            checklistDnd.auditChecklist.published ?
                                <label className={classes.labelCustomValuePublished}>PUBLISHED</label>
                            :
                                <label className={classes.labelCustomValueDraft}>DRAFT</label>
                        }

                    </Grid>
                </Grid>
            </Paper>
            <Grid container className={classes.container} spacing={2}>
                <Grid item sm={4} xs={12} >
                    <Grid item sm={12} xs={12} >
                        <Paper className={classes.objectives}>
                            <TextFieldMultiline
                                disabled={true}
                                id="criteria"
                                multiline
                                rows={3}
                                label="qms.checklist.objectives"
                                name="criteria"
                                value={checklistDnd.auditChecklist.objectives}
                                onInputChange={handleInputChangeChecklist}
                                placeholder="qms.checklist.objectives"
                                type="text"/>
                        </Paper>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <Paper>
                            {
                                Protected.protectedAuth(['PERM_AUDIT_CRUD', 'PERM_AUDIT_ENTRY']) ?
                                    <Button disabled={false} className={classes.button} color="secondary" onClick={onNewItemClick}>
                                        <IntlMessages id="qms.checklist.addItem"/>
                                        <NoteAdd className={classes.rightIcon}/>
                                    </Button>
                                    :
                                    null
                            }
                            {
                                Protected.protectedAuth(['PERM_AUDIT_CRUD', 'PERM_AUDIT_ENTRY']) ?
                                    <Button disabled={false} className={classes.button} color="primary" onClick={onUpdateOrderClick}>
                                        <IntlMessages id="qms.checklist.updateOrder"/>
                                        <SwapVert className={classes.rightIcon}/>
                                    </Button>
                                    :
                                    null
                            }
                            {
                                Protected.protectedAuth(['PERM_AUDIT_CRUD', 'PERM_AUDIT_ENTRY']) ?
                                    <Button disabled={false} className={classes.button} color="primary" onClick={handleNewSubArea}>
                                        <IntlMessages id="qms.checklist.addSubArea"/>
                                        <PlaylistAddIcon className={classes.rightIcon}/>
                                    </Button>
                                    :
                                    null
                            }
                            <div className={classes.treeRoot}>
                                <ChecklistDnDTree
                                    onDrop={handleDrop}
                                    onDragStart={handleDragStart}
                                    checklist={selectedChecklistDnd}
                                    onClick={handleElementClick}
                                    rootElement={props.match.params.id}
                                />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item sm={8} xs={12}>
                    <Paper>
                        <div>
                            {
                                itemVisible ?
                                    <ChecklistItemCreateForm
                                        editDisabled={editDisabled}
                                        checklist={checklistDnd.auditChecklist}
                                        locationTypes={locationTypes}
                                        onSelectCheckboxChange={handleSelectCheckboxChangeItem}
                                        checklistType={checklistDnd.auditChecklist.auditChecklistType ? checklistDnd.auditChecklist.auditChecklistType.name : ""}
                                        selectedItem={selectedItem}
                                        onInputChange={handleInputChange}
                                        handleChecklistSave={handleChecklistItemSave}
                                        handleCancel={handleCancelClick}
                                        handleDelete={handleDeleteItemClick}
                                        onSwitchChange={handleSwitchChange}
                                        clientName={clientName}
                                        onEditSelect={handleEdit}

                                        onInputAuditorActionChange={handleInputAuditorActionChange}
                                        onSelectLocationType={handleSelectLocationType}
                                        onAddAuditorActions={handleAddAuditorActions}
                                        onDeleteAuditorAction={handleDeleteAuditorAction}
                                    />
                                    :
                                    null
                            }
                            {
                                subAreaVisible ?
                                    <ChecklistSubAreaCreateForm
                                        editDisabled={true}
                                        item={selectedSubArea}
                                        onInputChange={handleInputSubAreaChange}
                                        handleItemSave={handleDialogSubAreaSubmit}
                                        showEdit={true}
                                        handleCancel={handleCancelClick}
                                        handleDelete={handleDeleteSubareaClick}
                                        handleEdit={handleEditSubArea}
                                        clientName={clientName}
                                    />
                                    :
                                    null
                            }
                            {
                                itemVisible === false && subAreaVisible === false ?
                                    <div style={{paddingTop: '75px', height: '200px', textAlign: 'center'}}>
                                        <label><IntlMessages id="qms.checklist.noItemSelected"/></label>
                                    </div>
                                    : null
                            }
                        </div>
                    </Paper>
                </Grid>
            </Grid>
            <DialogFormFrame
                onClose={handleNewSubAreaClose}
                title="qms.checklist.subArea"
                open={dialogSubAreaOpen}
            >
                <DialogFormSubAreaNew
                    checklist={checklistDnd.auditChecklist}
                    subarea={selectedSubArea}
                    onClose={handleNewSubAreaClose}
                    onSubmit={handleDialogSubAreaSubmit}
                    onInputChange={handleInputSubAreaChange}
                    onSelectCheckboxChange={handleSelectCheckboxChangeSubArea}
                    handleError={handleError}
                />
            </DialogFormFrame>
            <DialogDeleteWarning
                onDelete={handlePublish}
                text="qms.checklist.publish"
                onClose={handleDialogPublishClose}
                open={dialogPublish}
            />
            <DialogDeleteWarning
                onClose={handleDeleteSubareaClose}
                onDelete={handleDeleteSubArea}
                open={dialogDeleteSubareaOpen}
                text="qms.checklist.deleteSubarea"
            />
            <DialogDeleteWarning
                onClose={handleDeleteItemClose}
                onDelete={handleDeleteItem}
                open={dialogDeleteItemOpen}
                text="qms.audit.deleteItem"
            />
            <DialogFormFrame
                onClose={handleUploadCSVClose}
                title="general.import"
                open={dialogUploadCsv}
                formComponent={
                    <DialogFormUploadCSVFile
                        onClose={handleUploadCSVClose}
                        onSubmit={handleAttachmentNewSubmit}
                    />
                }
            />
            <DialogFormFrame
                onClose={handleExportDialogClose}
                title="general.export"
                open={dialogExportOpen}
                formComponent={
                    <DialogFormExportData
                        onClose={handleExportDialogClose}
                        onSubmit={handleExportSubmit}
                        onRadioChange={handleRadioChange}
                        radioValue={radioValue}
                    />
                }
            />
        </div>
    );
}

export default AuditChecklist;