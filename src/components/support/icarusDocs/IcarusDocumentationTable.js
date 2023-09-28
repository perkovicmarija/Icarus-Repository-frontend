import React, {useState} from 'react';
import * as Protected from '../../../protectedAuth';
import {
    Box,
    IconButton,
    List,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableRow
} from "@mui/material";
import {
    ArrowBack,
    Delete,
    Edit,
    ExitToApp,
    FileCopy,
    Folder,
    History,
    InsertDriveFile,
    MoreHoriz,
    VerticalAlignBottom,
    Visibility
} from "@mui/icons-material";
import IntlMessages from "../../core/IntlMessages";
import EnhancedTableHeaderSimpleActions from "../../core/Table/EnhancedTableHeaderSimpleActions";
import PropTypes from "prop-types";
import {withStyles} from "@mui/styles";


const toolbarStyles = theme => ({
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        flex: '0 0 auto',
        color: theme.palette.text.secondary
    },
    title: {
        flex: '0 0 auto',
    },
    table: {
        minWidth: 700,
    },
    tableWrapper: {
        display: 'flex',
        flexFlow: 'column',
        flex: '1 1 auto',
        overflowY: 'auto',
/*        maxHeight: "100%",
        overflow: 'auto',*/
    },

});

const columnData = [
    { id: 'ext', numeric: false, disablePadding: false, label: 'general.type' },
    { id: 'name', numeric: false, disablePadding: false, label: 'general.name' },
    { id: 'userCreated', numeric: false, disablePadding: false, label: 'general.createdBy' },
    { id: 'size', numeric: false, disablePadding: false, label: 'documentation.size' }
];


const IcarusDocumentationTable = ({
                                     classes,
                                     order,
                                     orderBy,
                                     onRequestSort,
                                     files,
                                     folders,
                                     icarusDocumentationFolderPath,
                                     onFolderDoubleClick,
                                     onFolderDoubleTap,
                                     onBackDoubleClick,
                                     onBackDoubleTap,
                                     onDeleteFolder,
                                     onEditFolder,
                                     onDownloadFile,
                                     onViewFile,
                                     onEditFile,
                                     onDeleteFile,
                                     onHistoryFile,
                                     onMoveFile,
                                     onMoveFolder
                                 }) => {
    const [anchorElFile, setAnchorElFile] = useState(null);
    const [indexSelectedFile, setIndexSelectedFile] = useState(undefined);
    const [anchorElFolder, setAnchorElFolder] = useState(null);
    const [indexSelectedFolder, setIndexSelectedFolder] = useState(undefined);

    const handleFileActionClick = index => event => {
        setAnchorElFile(event.currentTarget);
        setIndexSelectedFile(index);
    };

    const handleFileActionClose = () => {
        setAnchorElFile(null);
        setIndexSelectedFile(undefined);
    };

    const handleFolderActionClick = index => event => {
        setAnchorElFolder(event.currentTarget);
        setIndexSelectedFolder(index);
    };

    const handleFolderActionClose = () => {
        setAnchorElFolder(null);
        setIndexSelectedFolder(undefined);
    };

        return (
            //<div className={classes.tableWrapper}>
            <Table aria-label="sticky table" className={classes.table}>
                <EnhancedTableHeaderSimpleActions
                    columnData={columnData}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={onRequestSort}
                />

                <TableBody>
                    {icarusDocumentationFolderPath?.length > 0 &&
                    <TableRow
                        className="pointer"
                        hover={true}
                        onClick={onBackDoubleClick}
                        onTouchEnd={event => onBackDoubleTap(event)}
                    >
                        <TableCell><ArrowBack/></TableCell>
                        <TableCell>...</TableCell>
                        <TableCell/>
                        <TableCell/>
                        <TableCell/>
                        <TableCell/>
                        <TableCell/>
                    </TableRow>}

                    {folders.map((folder, index) => {
                        return (
                            <TableRow
                                key={folder.icarusDocumentationFolderId}
                                hover={true}
                                onDoubleClick={event => onFolderDoubleClick(event, folder)}
                                onTouchEnd={event => onFolderDoubleTap(event, folder)}
                                className="pointer">

                                <TableCell><Folder color="secondary"/></TableCell>
                                <TableCell>{folder.folderName}</TableCell>
                                <TableCell>{folder.userCreator.fullName}</TableCell>
                                <TableCell/>
                                <TableCell>
                                    {Protected.protectedAuth(['PERM_SUPPORT_ADMIN']) ?
                                        <div>
                                            <IconButton
                                                aria-label="More"
                                                aria-owns={indexSelectedFolder === index  ? 'long-menu' : null}
                                                aria-haspopup="true"
                                                onClick={handleFolderActionClick(index)}
                                            >
                                                <MoreHoriz/>
                                            </IconButton>
                                            <Menu
                                                id="simple-menu"
                                                anchorEl={indexSelectedFolder === index ? anchorElFolder : null}
                                                open={indexSelectedFolder === index}
                                                onClose={handleFolderActionClose}
                                            >
                                                <MenuItem onClick={event => {
                                                    handleFolderActionClose();
                                                    onEditFolder(event, folder);
                                                }}>
                                                    <ListItemIcon>
                                                        <Edit/>
                                                    </ListItemIcon>
                                                    <ListItemText primary={<IntlMessages id="general.edit" />}/>
                                                </MenuItem>
                                                <MenuItem value="delete" onClick={event => {
                                                    handleFolderActionClose();
                                                    onDeleteFolder(event, folder)
                                                }}>
                                                    <ListItemIcon>
                                                        <Delete/>
                                                    </ListItemIcon>
                                                    <ListItemText primary={<IntlMessages id="general.delete" />}/>
                                                </MenuItem>
                                                <MenuItem onClick={(event) => {
                                                    handleFolderActionClose();
                                                    onMoveFolder(event, folder)
                                                }}>
                                                    <ListItemIcon>
                                                        <ExitToApp/>
                                                    </ListItemIcon>
                                                    <ListItemText primary={<IntlMessages id="general.move" />}/>
                                                </MenuItem>
                                                {/*                                        <MenuItem onClick={handleFileActionClose}>
                                            <ListItemIcon>
                                                <ExitToApp/>
                                            </ListItemIcon>
                                            <ListItemText primary="Move"/>
                                        </MenuItem>*/}
                                            </Menu>
                                        </div>: null
                                    }



                                </TableCell>
                            </TableRow>
                        );
                    })}
                    {files.map((file, index) => {
                        return (
                            <TableRow
                                key={index}
                                hover={true}>
                                <TableCell onClick={handleFileActionClick(index)}
                                           className="pointer"><InsertDriveFile color="primary"/>
                                </TableCell>
                                <TableCell onClick={handleFileActionClick(index)} className="pointer">
                                    {file.fullPath ?
                                        <React.Fragment>
                                            <Box>
                                                {file.name}
                                            </Box>
                                            <Box pt={1} fontStyle="italic" fontSize="caption.fontSize">
                                                {file.fullPath}
                                            </Box>
                                        </React.Fragment> :
                                        <React.Fragment>{file.name}</React.Fragment>
                                    }

                                </TableCell>
                                <TableCell>{file.userCreator.fullName}</TableCell>
                                <TableCell>{file.sizeFormatted}</TableCell>
                                <TableCell>

                                    <IconButton
                                        aria-label="More"
                                        aria-owns={indexSelectedFile === index  ? 'long-menu' : null}
                                        aria-haspopup="true"
                                        onClick={handleFileActionClick(index)}
                                    >
                                        <MoreHoriz/>
                                    </IconButton>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={indexSelectedFile === index ? anchorElFile: null}
                                        open={indexSelectedFile === index}
                                        onClose={handleFileActionClose}
                                    >
                                        {!file.protectedFile &&
                                            <MenuItem onClick={(event) => {
                                                handleFileActionClose();
                                                onDownloadFile(event, file);
                                            }}>
                                                <ListItemIcon>
                                                    <VerticalAlignBottom/>
                                                </ListItemIcon>
                                                <ListItemText primary={<IntlMessages id="general.download" />}/>
                                            </MenuItem>
                                        }

                                        <MenuItem onClick={(event) => {
                                            handleFileActionClose();
                                            onViewFile(event, file);
                                        }}>
                                            <ListItemIcon>
                                                <Visibility/>
                                            </ListItemIcon>
                                            <ListItemText primary={<IntlMessages id="general.view" />}/>
                                        </MenuItem>
                                        {Protected.protectedAuth(['PERM_SUPPORT_ADMIN']) ?
                                            <div>
                                                <MenuItem onClick={(event) => {
                                                    handleFileActionClose();
                                                    onEditFile(event, file);
                                                }}>
                                                    <ListItemIcon>
                                                        <Edit/>
                                                    </ListItemIcon>
                                                    <ListItemText primary={<IntlMessages id="general.edit" />}/>
                                                </MenuItem>
                                                <MenuItem onClick={(event) => {
                                                    handleFileActionClose();
                                                    onMoveFile(event, file)
                                                }}>
                                                    <ListItemIcon>
                                                        <ExitToApp/>
                                                    </ListItemIcon>
                                                    <ListItemText primary={<IntlMessages id="general.move" />}/>
                                                </MenuItem>
                                                <MenuItem onClick={event => {
                                                    handleFileActionClose();
                                                    onDeleteFile(event, file)
                                                }}>
                                                    <ListItemIcon>
                                                        <Delete/>
                                                    </ListItemIcon>
                                                    <ListItemText primary={<IntlMessages id="general.delete" />}/>
                                                </MenuItem>
                                                <MenuItem onClick={(event) => {
                                                    handleFileActionClose();
                                                    onHistoryFile(event, file)
                                                }}>
                                                    <ListItemIcon>
                                                        <History/>
                                                    </ListItemIcon>
                                                    <ListItemText primary={<IntlMessages id="general.history" />}/>
                                                </MenuItem>
{/*                                                <MenuItem onClick={handleFileActionClose}>
                                                    <ListItemIcon>
                                                        <Info/>
                                                    </ListItemIcon>
                                                    <ListItemText primary="Info"/>
                                                </MenuItem>*/}
                                            </div> : null
                                        }
                                    </Menu>

                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
           //</div>
        );

}

IcarusDocumentationTable.propTypes = {
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
}
export default withStyles(toolbarStyles)(IcarusDocumentationTable);