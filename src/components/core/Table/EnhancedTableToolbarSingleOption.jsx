import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import {makeStyles} from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Help from '@mui/icons-material/Help';
import ExportIcon from '@mui/icons-material/SaveAlt';
import ViewColumn from '@mui/icons-material/ViewColumn';
import IntlMessages from '../IntlMessages';
import FilterIconCustom from '../FilterIconCustom';
import ToolbarSearch from '../ToolbarSearch';
import * as Protected from "../../../protectedAuth";
import Grid from '@mui/material/Grid';
import More from '@mui/icons-material/MoreVert';
import AppBar from '@mui/material/AppBar';
import Notifications from '@mui/icons-material/Notifications';
import CloudUpload from "@mui/icons-material/CloudUpload";

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


function EnhancedTableToolbarSingleOption(props) {
    const classes = useStyles();

    const {
        title,
        noAdd,
        onNewClick,
        tooltipNew,
        noFilter,
        onFilterClick,
        filtersActive,
        tooltipExport,
        onExportClick,
        showExport,
        showImport,
        onImportSelect,
        showSearch,
        searchValue,
        onInputSearchChange,
        onSearchSubmit,
        searchPlaceholder,
        showHelp,
        tooltipHelp,
        onHelpClick,
        showMore,
        onMoreClick,
        tooltipMore,
        showNotifyAll,
        tooltipNotifyAll,
        onNotifyAllClick,
        authPermissions,
        tooltipColumnEdit,
        showColumnEdit,
        onColumnEditClick
    } = props;

    return (
        <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
                <Grid container spacing={1}>
                    <Grid item>
                        <div className={classes.title}>
                            <Typography variant="h6"><IntlMessages id={title}/></Typography>
                        </div>
                    </Grid>
                    <Grid item>
                        {showSearch &&
                        <ToolbarSearch
                            value={searchValue}
                            onInputSearchChange={onInputSearchChange}
                            onSearchSubmit={onSearchSubmit}
                            placeholder={searchPlaceholder}
                        />}
                    </Grid>
                </Grid>

                {/*<div className={classes.spacer} />*/}

                <div className={classes.actions}>
                    {
                        showImport &&
                        <Tooltip title={<IntlMessages id="general.import" />}>
                            <>
                                <IconButton className={classes.iconColor} aria-label="Import form" onClick={onImportSelect}>
                                    <CloudUpload/>
                                </IconButton>
                            </>
                        </Tooltip>
                    }
                    {showHelp &&
                    <Tooltip title={<IntlMessages id={tooltipHelp}/>}>
                        <>
                            <IconButton aria-label={tooltipHelp}
                                        aria-haspopup="true"
                                        onClick={onHelpClick}>
                                <Help/>
                            </IconButton>
                        </>
                    </Tooltip>
                    }
                    {showColumnEdit &&
                    <Tooltip title={<IntlMessages id={tooltipColumnEdit}/>}>
                        <>
                            <IconButton aria-label={tooltipColumnEdit}
                                        aria-haspopup="true"
                                        onClick={onColumnEditClick}>
                                <ViewColumn/>
                            </IconButton>
                        </>
                    </Tooltip>
                    }
                    {showExport &&
                    <Tooltip title={<IntlMessages id={tooltipExport}/>}>
                        <>
                            <IconButton aria-label={tooltipExport}
                                        aria-haspopup="true"
                                        onClick={onExportClick}>
                                <ExportIcon/>
                            </IconButton>
                        </>
                    </Tooltip>
                    }

                    {showNotifyAll &&
                    <Tooltip title={<IntlMessages id={tooltipNotifyAll}/>}>
                        <>
                            <IconButton aria-label={tooltipNotifyAll}
                                        aria-haspopup="true"
                                        onClick={onNotifyAllClick}>
                                <Notifications/>
                            </IconButton>
                        </>
                    </Tooltip>
                    }

                    {!noAdd && Protected.protectedAuth(authPermissions) ?
                        <Tooltip title={<IntlMessages id={tooltipNew}/>}>
                            <>
                                <IconButton aria-label={tooltipNew}
                                            aria-haspopup="true"
                                            onClick={onNewClick}>
                                    <NoteAddIcon/>
                                </IconButton>
                            </>
                        </Tooltip>
                        : null}
                    {!noFilter &&
                        <Tooltip title={<IntlMessages id="action.filter"/>}>
                            <>
                            <FilterIconCustom onFilterClick={onFilterClick} filtersActive={filtersActive}/>
                            </>
                        </Tooltip>
                    }
                    {showMore && Protected.protectedAuth(authPermissions) ?
                        <Tooltip title={<IntlMessages id="action.more"/>}>
                            <>
                                <IconButton aria-label={tooltipMore}
                                            aria-haspopup="true"
                                            onClick={onMoreClick}>
                                    <More/>
                                </IconButton>
                            </>
                        </Tooltip> : null}
                </div>
            </Toolbar>
        </AppBar>
    );
}

EnhancedTableToolbarSingleOption.propTypes = {
    title: PropTypes.string.isRequired,
}
export default EnhancedTableToolbarSingleOption;