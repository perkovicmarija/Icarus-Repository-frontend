import React, {useMemo, useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import IntlMessages from '../../../components/core/IntlMessages';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import VerticalAlignBottom from '@mui/icons-material/VerticalAlignBottom';
import ListSubheader from '@mui/material/ListSubheader';
import DialogGenericWarning from '../../core/Dialog/DialogGenericWarning';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#043076',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: 'inherit',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer'
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

function DropzoneCustom(props) {

    const [dialogWarningSizeOpen, setDialogWarningSizeOpen] = useState(false);

    const onDropRejected = useCallback(() => {
        setDialogWarningSizeOpen(true);
    }, [])

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        //accept: 'image/*,application/pdf',
        disabled: props.disabled,
        maxSize: props.maxSize,
        multiple: props.multiple,
        onDropAccepted: props.onFileDrop,
        onDropRejected: onDropRejected
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

    const handleDialogWarningSizeClose = () => {
        setDialogWarningSizeOpen(false);
    }

    const {files, maxSizeMb, onDelete, onDownload, disabled, showDownload, showDelete, title} = props;
    return (
        <div className="container">
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p><IntlMessages id="general.dragAndDropFile"/></p>
                <p><IntlMessages id="general.dragAndDropFileMaxSize" values={{ maxSizeMb: maxSizeMb }}/></p>
            </div>
            {files.length > 0 &&
            <aside>
                <List
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            <IntlMessages id={title}/>
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
                                        <>
                                        <span>
                                            <IconButton edge="end" aria-label="download" disabled={!disabled} onClick={() => onDownload(file, index)}>
                                                <VerticalAlignBottom />
                                            </IconButton>
                                        </span>
                                        </>
                                    </Tooltip>
                                    }
                                    {showDelete &&
                                    <Tooltip title={<IntlMessages id="general.delete"/>}>
                                        <>
                                        <span>
                                            <IconButton edge="end" aria-label="delete" disabled={disabled} onClick={() => onDelete(file, index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </span>
                                        </>
                                    </Tooltip>
                                    }
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                </List>
            </aside>
            }
            <DialogGenericWarning
                open={dialogWarningSizeOpen}
                onClose={handleDialogWarningSizeClose}
                text="attachments.maxSize.warning"
            />
        </div>
    );
}

export default DropzoneCustom;