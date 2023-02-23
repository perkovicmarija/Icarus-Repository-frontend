import React, { useMemo } from 'react';

import {
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Tooltip,
    IconButton,
    ListSubheader
} from "@mui/material";
import { Delete, VerticalAlignBottom } from "@mui/icons-material";
import { useDropzone } from 'react-dropzone';

import IntlMessages from '../IntlMessages'

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

function Dropzone(props) {
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: 'image/*,application/pdf',
        disabled: props.disabled,
        maxSize: props.maxSize,
        multiple: props.multiple,
        onDrop: props.onFileDrop
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject
    ]);

    const {files, maxSizeMb, onDelete, onDownload, disabled, showDownload} = props;
    return (
        <div className="container">
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p><IntlMessages id="general.dragAndDropReceipt" values={{ maxSizeMb: maxSizeMb }}/></p>
            </div>
            {files.length > 0 &&
            <aside>
                <List
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            <IntlMessages id="general.receipt"/>
                        </ListSubheader>
                    }
                    dense
                >
                    {files.map((file, index) => {
                        return (
                            <ListItem key={file}>
                                <ListItemText
                                    primary={file}
                                />
                                <ListItemSecondaryAction>
                                    {showDownload &&
                                    <Tooltip title={<IntlMessages id="general.download"/>}>
                                        <span>
                                            <IconButton edge="end" aria-label="download" disabled={!disabled} onClick={event => onDownload(file, index)}>
                                                <VerticalAlignBottom />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                    }
                                    <Tooltip title={<IntlMessages id="general.delete"/>}>
                                        <span>
                                            <IconButton edge="end" aria-label="delete" disabled={disabled} onClick={event => onDelete(file, index)}>
                                                <Delete />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                </List>
            </aside>
            }
        </div>
    );
}

export default Dropzone;