import React from 'react';
import {makeStyles} from "@mui/styles";
import {AppBar, Dialog, IconButton, Slide, Toolbar, Typography} from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from '@mui/icons-material/Close';
import PdfFrame from './PdfFrame';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    background: {
        backgroundColor: '#808080',
    },
}));

function DialogPdfFullView(props) {
    const classes = useStyles();

    const {open, onClose, file, filename, showDownload, onDownloadClick} = props;
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
        >
            <AppBar position="relative">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={onClose} aria-label="Close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.flex}>
                        {filename}
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.background}>
                <PdfFrame
                    file={file}
                    showDownload={showDownload}
                    onDownloadClick={onDownloadClick}
                />
            </div>
        </Dialog>
    )

}

DialogPdfFullView.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default DialogPdfFullView;