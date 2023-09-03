import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from "@mui/material/Grid";
import {DialogActions, DialogContent, IconButton, Typography} from "@mui/material";
import IntlMessages from "../../core/IntlMessages";
import {ChevronRight, ExpandMore, Remove} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {withStyles} from "@mui/styles";
import TreeNode from "./TreeNode";

const styles = theme => ({
    root: {
        padding: "0px",
    },
});

class DialogFormFileMove extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isOpen: true
        }
    }

    onExpandClick = (event) => {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        const {classes, onClose, onSubmit, onFolderSelected, documentationFolderTree, documentationFolderDestinationMove} = this.props;
        const { isOpen } = this.state;

        let spanClasses = documentationFolderDestinationMove ? 'pointer' : 'tree-node-selected pointer';

        return(
            <div>
                <DialogContent>
                    <Grid container className="p-b-10">
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Typography variant="button">
                                <IntlMessages id="documentation.folder.selected" />: {documentationFolderDestinationMove ? documentationFolderDestinationMove.folderName : "ROOT"}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className="tree-node">
                                {documentationFolderTree.children.length > 0 ?
                                    <IconButton classes={{root: classes.root}} aria-label="Delete" onClick={this.onExpandClick}>
                                        {isOpen ? <ExpandMore/> : <ChevronRight/>}
                                    </IconButton> :
                                    <IconButton classes={{root: classes.root}} disabled>
                                        <Remove/>
                                    </IconButton>
                                }

                                <span className={spanClasses} onClick={(event) => onFolderSelected(event, undefined)}>ROOT</span>
                            </div>
                            { isOpen && documentationFolderTree.children.map(childNode => (
                                <TreeNode onFolderSelected={onFolderSelected} documentationFolderTree={childNode} documentationFolderDestinationMove={documentationFolderDestinationMove} />
                            ))}
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        <IntlMessages id="action.close" />
                    </Button>
                    <Button onClick={onSubmit}>
                        <IntlMessages id="action.submit" />
                    </Button>
                </DialogActions>
            </div>
        )
    }
}

DialogFormFileMove.propTypes = {
    onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(DialogFormFileMove);