import React from "react";
import {TreeItem, TreeView} from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";


const ChecklistSubAreasCheckbox = (props) => {

    const {
        checklist,
        selected,
        onSelectCheckboxChange,
        editDisabled
    } = props;


    const renderTree = (checklist) => {
        let result = [];
        if(checklist.auditChecklistSubAreas.length !== 0) {
            checklist.auditChecklistSubAreas.map(subarea => {
                if(subarea.auditChecklistSubAreaId !== selected.auditChecklistSubAreaId) {
                    result.push(
                        <TreeItem
                            key={subarea.auditChecklistSubAreaId}
                            nodeId={subarea.auditChecklistSubAreaId}
                            label={
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            disabled={editDisabled}
                                            checked={
                                                selected.auditChecklistSubArea ?
                                                    subarea.auditChecklistSubAreaId === selected.auditChecklistSubArea.auditChecklistSubAreaId
                                                    :
                                                    false
                                            }
                                            onChange={() =>
                                                onSelectCheckboxChange(subarea.auditChecklistSubAreaId)
                                            }
                                            onClick={e => e.stopPropagation()}
                                        />
                                    }
                                    label={<>{subarea.title}</>}
                                    key={subarea.auditChecklistSubAreaId}
                                />
                            }
                        >
                            {
                                subarea.auditChecklistSubAreas.map(childSubArea => {
                                    return renderChildSubArea(childSubArea);
                                })
                            }
                        </TreeItem>
                    );
                } else {
                    result.push(
                        subarea.auditChecklistSubAreas.map(childSubArea => {
                            return renderChildSubArea(childSubArea);
                        })
                    );
                }
            });
        }
        return result;
    }

    const renderChildSubArea = (subarea) => {
        if(subarea.auditChecklistSubAreaId !== selected.auditChecklistSubAreaId) {
            return(
                <TreeItem
                    key={subarea.auditChecklistSubAreaId}
                    nodeId={subarea.auditChecklistSubAreaId}
                    label={
                        <FormControlLabel
                            control={
                                <Checkbox
                                    disabled={editDisabled}
                                    checked={
                                        selected.auditChecklistSubArea ?
                                            subarea.auditChecklistSubAreaId === selected.auditChecklistSubArea.auditChecklistSubAreaId
                                            :
                                            false
                                    }
                                    onChange={() =>
                                        onSelectCheckboxChange(subarea.auditChecklistSubAreaId)
                                    }
                                    onClick={e => e.stopPropagation()}
                                />
                            }
                            label={<>{subarea.title}</>}
                            key={subarea.auditChecklistSubAreaId}
                        />
                    }
                >
                    {
                        subarea.auditChecklistSubAreas.map(childSubArea => {
                            return renderChildSubArea(childSubArea);
                        })
                    }
                </TreeItem>
            );
        } else {
            return (
                subarea.auditChecklistSubAreas.map(childSubArea => {
                    return renderChildSubArea(childSubArea);
                })
            );
        }
    }


    return (
        <TreeView
            aria-label="multi-select"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ height: 216, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
            {
                renderTree(checklist)
            }
        </TreeView>
    );
}

export default ChecklistSubAreasCheckbox;