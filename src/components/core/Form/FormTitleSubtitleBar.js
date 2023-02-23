import React, {PureComponent} from 'react';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@mui/styles';
import IntlMessages from '../IntlMessages';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Print from '@mui/icons-material/Print';
import CloudUpload from '@mui/icons-material/CloudUpload';

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


const FormTitleSubtitleBar = (props) => {

    const classes = useStyles();

    const {
        title,
        subtitle,
        onExportSelect,
        onImportSelect,
        showExport,
        showImport
    } = props;

    return (
        <Toolbar className={classes.root}>
            <div className={classes.title}>
                <Typography classes={{h6: classes.titleText}} variant="h6"><IntlMessages id={title} />: </Typography>
            </div>
            <div className={classes.subtitle}>
                <Typography classes={{h6: classes.subtitleText}} variant="h6">{subtitle}</Typography>
            </div>
            <div className={classes.spacer}/>
            <div className={classes.actions}>
                {
                    showImport &&
                    <Tooltip title={<IntlMessages id="general.import" />}>
                        <IconButton className={classes.iconColor} aria-label="Import form" onClick={onImportSelect}>
                            <CloudUpload/>
                        </IconButton>
                    </Tooltip>
                }
                {
                    showExport &&
                    <Tooltip title={<IntlMessages id="general.export" />}>
                        <IconButton className={classes.iconColor} aria-label="Edit form" onClick={onExportSelect}>
                            <Print/>
                        </IconButton>
                    </Tooltip>
                }
            </div>
        </Toolbar>
    );
}

export default FormTitleSubtitleBar;
