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
        const {classes, onFolderSelected, documentationFolderTree, documentationFolderDestinationMove} = this.props;
        const {isOpen} = this.state;

        let spanClasses = documentationFolderDestinationMove && documentationFolderDestinationMove.documentationFolderId === documentationFolderTree.documentationFolder.documentationFolderId ? 'tree-node-selected pointer' : 'pointer';

        const style = {
            marginLeft: this.props.documentationFolderTree.level * 20 + 'px',
        }

        return(
            <div>
                <div className="tree-node" style={style}>
                    {documentationFolderTree.children.length > 0 ?
                        <IconButton classes={{root: classes.root}} aria-label="Delete" onClick={this.onExpandClick}>
                            {isOpen ? <ExpandMore/> : <ChevronRight/>}
                        </IconButton> :
                        <IconButton disabled classes={{root: classes.root}}>
                            <Remove/>
                        </IconButton>
                    }
                    <span className={spanClasses}
                          onClick={(event) => onFolderSelected(event, documentationFolderTree.documentationFolder)}>{documentationFolderTree.documentationFolder.folderName}</span>
                </div>

                { isOpen && documentationFolderTree.children.map(childNode => (
                    <TreeNodeRecursive onFolderSelected={onFolderSelected} documentationFolderTree={childNode} documentationFolderDestinationMove={documentationFolderDestinationMove} />
                ))}
            </div>

        )
    }
}

TreeNode.propTypes = {
    onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(TreeNode);