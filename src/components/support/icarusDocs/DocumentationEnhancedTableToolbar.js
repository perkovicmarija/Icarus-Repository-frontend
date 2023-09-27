import React, {useState} from 'react';
import {makeStyles} from "@mui/styles";
import IntlMessages from "../../core/IntlMessages";
import {IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography} from "@mui/material";
import ToolbarSearch from "../../core/ToolbarSearch";
import {CreateNewFolder, Info, NoteAdd, PlaylistAdd} from "@mui/icons-material";
import FilterIconCustom from "../../core/FilterIconCustom";
import classNames from "classnames";


const useStyles = makeStyles(theme => ({
    root: {
        paddingRight: theme.spacing(1)
    },
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
}));


function DocumentationEnhancedTableToolbar(props) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(false);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const {
        onNewFolderClick,
        onNewFileClick,
        searchValue,
        onInputSearchChange,
        onSearchSubmit,
        searchPlaceholder,
        showAddNew,
        titleLabel,
        onStorageInfoClick,
        filtersActive,
        onFilterClick,
        showFilters = true
    } = props;

    return (
        <Toolbar
            className={classNames(classes.root)}>

            <div className={classes.title}>
                <Typography variant="h6"><IntlMessages id={titleLabel}/></Typography>
            </div>

            <ToolbarSearch
                value={searchValue}
                onInputSearchChange={onInputSearchChange}
                onSearchSubmit={onSearchSubmit}
                placeholder={searchPlaceholder}
            />

            <div className={classes.spacer}/>

            <div className={classes.actions}>
                <Tooltip title={<IntlMessages id="documentation.storageInfo"/>}>
                    <IconButton aria-label="Storage info"
                                onClick={onStorageInfoClick}>
                        <Info/>
                    </IconButton>
                </Tooltip>
                {showFilters &&
                    <Tooltip title={<IntlMessages id="action.filters"/>}>
                    <span>
                        <FilterIconCustom onFilterClick={onFilterClick} filtersActive={filtersActive}/>
                    </span>
                    </Tooltip>
                }
                {showAddNew &&
                    <React.Fragment>
                        <Tooltip title="Add new">
                            <IconButton aria-label="Add new"
                                        aria-owns={anchorEl ? 'simple-menu' : null}
                                        aria-haspopup="true"
                                        onClick={handleClick}>
                                <PlaylistAdd/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={onNewFileClick}>
                                <ListItemIcon className={classes.icon}>
                                    <NoteAdd/>
                                </ListItemIcon>
                                <ListItemText primary={<IntlMessages id="documentation.addNewFile"/>}/>
                            </MenuItem>
                            <MenuItem onClick={(event) => {
                                handleClose();
                                onNewFolderClick();
                            }}>
                                <ListItemIcon className={classes.icon}>
                                    <CreateNewFolder/>
                                </ListItemIcon>
                                <ListItemText primary={<IntlMessages id="documentation.addNewFolder"/>}/>
                            </MenuItem>
                        </Menu>
                    </React.Fragment>
                }
            </div>
        </Toolbar>
    );
}

DocumentationEnhancedTableToolbar.propTypes = {
}
export default DocumentationEnhancedTableToolbar;