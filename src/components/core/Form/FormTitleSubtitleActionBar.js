import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import {makeStyles} from '@mui/styles';
import IntlMessages from '../../../components/core/IntlMessages';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import * as Protected from "../../../protectedAuth";

const useStyles = makeStyles((theme) => ({
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        flex: '0 0 auto',
        color: theme.palette.text.secondary
    },
    titleText: {
        color: theme.palette.primary.contrastText,
        fontWeight: 'bold',
    },
    subtitleText: {
        color: theme.palette.primary.contrastText,
        fontWeight: '300'
    },
    title: {
        flex: '0 0 auto',
    },
    subtitle: {
        flex: '0 0 auto',
        paddingLeft: '5px'
    },
    root: {
        backgroundColor: theme.palette.primary.main,
    },
    iconColor: {
        color: theme.palette.primary.contrastText
    }
}));


const FormTitleSubtitleActionBar = (props) => {

        const classes = useStyles();

        const {
            title,
            subtitle,
            showEdit,
            onDeleteSelect,
            onEditSelect,
            authPermissions
        } = props;

        return (
            <Toolbar className={classes.root}>
                <div className={classes.title}>
                    <Typography classes={{h6: classes.titleText}} variant="h6"><IntlMessages id={title} />:</Typography>
                </div>
                <div className={classes.subtitle}>
                    <Typography classes={{h6: classes.subtitleText}} variant="h6">{subtitle}</Typography>
                </div>
                <div className={classes.spacer}/>
                {
                    Protected.protectedAuth([authPermissions]) ?
                        <div className={classes.actions}>

                            {showEdit ?
                                <Tooltip title="Edit">
                                    <IconButton
                                        className={classes.iconColor}
                                        aria-label="Edit"
                                        onClick={onEditSelect}
                                        size="large">
                                        <Edit/>
                                    </IconButton>
                                </Tooltip> : null}

                            <Tooltip title="Delete">
                                <IconButton
                                    className={classes.iconColor}
                                    aria-label="Delete"
                                    onClick={onDeleteSelect}
                                    size="large">
                                    <Delete/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    :
                        null
                }
            </Toolbar>
        );
}

FormTitleSubtitleActionBar.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
}
export default FormTitleSubtitleActionBar;
