import React from 'react';
import { Toolbar, Grid, Box } from '@mui/material';
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
        paddingLeft: theme.spacing(1),
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '800px'
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
        showOptions,
        showDelete,
        showExport,
        showEdit,
        onDeleteSelect,
        onExportSelect,
        authPermissions
    } = props;

    return (
        <Toolbar className={classes.root}>
            <Grid
                container
            >
                <Grid item xs={12} sm={12} md={12} xl={11}>
                    <Box
                        sx={{
                            display: 'flex'
                        }}
                    >
                        {
                            title &&
                            <Box>
                                <Typography classes={{h6: classes.titleText}} variant="h6"><IntlMessages id={title} />: </Typography>
                            </Box>
                        }
                        <Box>
                            <Typography className={classes.subtitleTextWidth} classes={{h6: classes.subtitleText}} variant="h6">{subtitle}</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} xl={1}>
                    {
                        showOptions &&
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end'
                                }}
                            >
                                {
                                    showExport &&
                                        <Box>
                                            <Tooltip title="Export">
                                                <IconButton className={classes.iconColor} aria-label="Print" onClick={onExportSelect}>
                                                    <Print/>
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                }
                                {
                                    editDisabled && showDelete && Protected.protectedAuth(authPermissions) &&
                                        <Box>
                                            <Tooltip title="Delete">
                                                <IconButton className={classes.iconColor} aria-label="Delete" onClick={onDeleteSelect}>
                                                    <Delete/>
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                }
                                {
                                    !editDisabled && Protected.protectedAuth(authPermissions) &&
                                        <Box>
                                            <Tooltip title="Save">
                                                <IconButton className={classes.iconColor} aria-label="Save" onClick={onSaveSelect}>
                                                    <Done/>
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                }
                                {
                                    !editDisabled && Protected.protectedAuth(authPermissions) &&
                                        <Box>
                                            <Tooltip title="Cancel edit">
                                                <IconButton className={classes.iconColor} aria-label="Cancel" onClick={onCancelSelect}>
                                                    <Close/>
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                }
                                {
                                    editDisabled && showEdit && Protected.protectedAuth(authPermissions) &&
                                        <Box>
                                            <Tooltip title="Edit">
                                                <IconButton className={classes.iconColor} aria-label="Edit form" onClick={onEditSelect}>
                                                    <Edit/>
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                }
                            </Box>
                    }
                </Grid>
            </Grid>
        </Toolbar>
    );
}

export default FormEditBarSubtitle;
