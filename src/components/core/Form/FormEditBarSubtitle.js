import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import Edit from '@mui/icons-material/Edit';
import Done from '@mui/icons-material/Done';
import Close from '@mui/icons-material/Close';
import Delete from '@mui/icons-material/Delete';
import IntlMessages from '../../../components/core/IntlMessages';
import Typography from '@mui/material/Typography';
import Print from '@mui/icons-material/Print';
import * as Protected from "../../../protectedAuth";

const useStyles = makeStyles( (theme) => ({
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        flex: '0 0 auto',
        color: theme.palette.text.secondary
    },
    titleText: {
        color: theme.palette.primary.contrastText
    },
    subtitleText: {
        color: theme.palette.primary.contrastText,
        fontWeight: '300'
    },
    subtitleTextWidth: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '900px'
    },
    title: {
        flex: '0 0 auto',
    },
    subtitle: {
        flex: '0 0 auto',
        paddingLeft: '5px',
    },
    root: {
        backgroundColor: theme.palette.primary.main,
    },
    iconColor: {
        color: theme.palette.primary.contrastText
    }
}));


const FormEditBarSubtitle = (props) => {

    const classes = useStyles();

    const {
        title,
        subtitle,
        editDisabled,
        onEditSelect,
        onCancelSelect,
        onSaveSelect,
        showDelete,
        showExport,
        showEdit,
        onDeleteSelect,
        onExportSelect,
        authPermissions
    } = props;

    return (
        <Toolbar className={classes.root}>
            <div className={classes.title}>
                {
                    title &&
                    <Typography classes={{h6: classes.titleText}} variant="h6"><IntlMessages id={title} />: </Typography>
                }
            </div>
            <div className={classes.subtitle}>
                <Typography className={classes.subtitleTextWidth} classes={{h6: classes.subtitleText}} variant="h6">{subtitle}</Typography>
            </div>
            <div className={classes.spacer}/>
            <div className={classes.actions}>
                {
                    showExport &&
                    <Tooltip title="Export">
                        <IconButton className={classes.iconColor} aria-label="Print" onClick={onExportSelect}>
                            <Print/>
                        </IconButton>
                    </Tooltip>
                }
                {editDisabled && showDelete && Protected.protectedAuth(authPermissions) &&
                <Tooltip title="Delete">
                    <IconButton className={classes.iconColor} aria-label="Delete" onClick={onDeleteSelect}>
                        <Delete/>
                    </IconButton>
                </Tooltip>}

                {!editDisabled && Protected.protectedAuth(authPermissions) &&
                <Tooltip title="Save">
                    <IconButton className={classes.iconColor} aria-label="Save" onClick={onSaveSelect}>
                        <Done/>
                    </IconButton>
                </Tooltip>}

                {!editDisabled && Protected.protectedAuth(authPermissions) &&
                <Tooltip title="Cancel edit">
                    <IconButton className={classes.iconColor} aria-label="Cancel" onClick={onCancelSelect}>
                        <Close/>
                    </IconButton>
                </Tooltip>}

                {editDisabled && showEdit && Protected.protectedAuth(authPermissions) &&
                <Tooltip title="Edit">
                    <IconButton className={classes.iconColor} aria-label="Edit form" onClick={onEditSelect}>
                        <Edit/>
                    </IconButton>
                </Tooltip>}
            </div>
        </Toolbar>
    );
}

export default FormEditBarSubtitle;
