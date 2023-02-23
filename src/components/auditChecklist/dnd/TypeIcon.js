import React from 'react';
import FolderIcon from '@mui/icons-material/Folder';

export const TypeIcon = (props) => {
    if (props.droppable) {
        return <FolderIcon />;
    } else {
        return null;
    }
}