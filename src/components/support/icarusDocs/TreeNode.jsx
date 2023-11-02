import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {IconButton} from "@mui/material";
import {ChevronRight, ExpandMore, Remove} from "@mui/icons-material";
import TreeNodeRecursive from './TreeNode';
import {withStyles} from "@mui/styles";

const styles = theme => ({
    root: {
        padding: "0px",
    },
});

class TreeNode extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isOpen: false
        }
    }

    onExpandClick = (event) => {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        const {classes, onFolderSelected, icarusDocumentationFolderTree, icarusDocumentationFolderDestinationMove} = this.props;
        const {isOpen} = this.state;

        let spanClasses = icarusDocumentationFolderDestinationMove && icarusDocumentationFolderDestinationMove.icarusDocumentationFolderId === icarusDocumentationFolderTree.icarusDocumentationFolder.icarusDocumentationFolderId ? 'tree-node-selected pointer' : 'pointer';

        const style = {
            marginLeft: this.props.icarusDocumentationFolderTree.level * 20 + 'px',
        }

        return(
            <div>
                <div className="tree-node" style={style}>
                    {icarusDocumentationFolderTree.children.length > 0 ?
                        <IconButton classes={{root: classes.root}} aria-label="Delete" onClick={this.onExpandClick}>
                            {isOpen ? <ExpandMore/> : <ChevronRight/>}
                        </IconButton> :
                        <IconButton disabled classes={{root: classes.root}}>
                            <Remove/>
                        </IconButton>
                    }
                    <span className={spanClasses}
                          onClick={(event) => onFolderSelected(event, icarusDocumentationFolderTree.icarusDocumentationFolder)}>{icarusDocumentationFolderTree.icarusDocumentationFolder.folderName}</span>
                </div>

                { isOpen && icarusDocumentationFolderTree.children.map(childNode => (
                    <TreeNodeRecursive onFolderSelected={onFolderSelected} icarusDocumentationFolderTree={childNode} icarusDocumentationFolderDestinationMove={icarusDocumentationFolderDestinationMove} />
                ))}
            </div>

        )
    }
}

TreeNode.propTypes = {
    // onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(TreeNode);