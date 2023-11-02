import React from 'react';
import Button from "@mui/material/Button";
import IntlMessages from "../../core/IntlMessages";
import {ChevronRight} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import PropTypes from "prop-types";
import {withStyles} from "@mui/styles";

const styles = theme => ({
    root: {
        paddingLeft: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.contrastText
    },
    iconColor: {
        color: theme.palette.primary.contrastText,
        cursor: 'default',
        pointerEvents: 'none',
    },
    folderName: {
        fontWeight: '500',
        fontSize: '1.1em',
        textTransform: 'uppercase',
        color: theme.palette.primary.contrastText,
    }
});

function DocumentationFolderPath ({classes, documentationFolderPath, onDocumentationFolderRootClick, onDocumentationFolderPathClick}) {
    return(
        <div className={classes.root}>
            <Button className={classes.folderName} onClick={onDocumentationFolderRootClick}><IntlMessages id="general.homeFolder"/></Button>
            <IconButton className={classes.iconColor} aria-label="Delete" >
                <ChevronRight/>
            </IconButton>
            {documentationFolderPath.map((folder, index) => {
                return (
                    <span className="centerParent" key={index}>
                        <Button className={classes.folderName} onClick={event => onDocumentationFolderPathClick(folder)}>{folder.folderName}</Button>
                        {index + 1 < documentationFolderPath.length &&
                            <IconButton className={classes.iconColor} aria-label="Delete" >
                                <ChevronRight/>
                            </IconButton>
                        }
                    </span>
                )
            })}
        </div>
    )
}
DocumentationFolderPath.propTypes = {
    documentationFolderPath: PropTypes.array.isRequired,
}

export default withStyles(styles) (DocumentationFolderPath);