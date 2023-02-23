import React from 'react';
import { Tree } from "@minoru/react-dnd-treeview";
import CustomDnDTreeNode from "./CustomDnDTreeNode";
import Placeholder from "./Placeholder";

const ChecklistDnDTree = (props) => {

    const {
        onDrop,
        onDragStart,
        checklist,
        onClick,
        rootElement
    } = props;

    return (
        <div>
            <Tree
            tree={checklist}
            rootId={rootElement}
            insertDroppableFirst={false}
            render={(node, { depth, isOpen, onToggle }) => (
                <CustomDnDTreeNode
                    node={node}
                    depth={depth}
                    isOpen={isOpen}
                    onToggle={onToggle}
                    onClick={onClick}
                />
            )}
            dragPreviewRender={(monitorProps) => (
                <div>{monitorProps.item.text}</div>
            )}
            onDrop={onDrop}
            sort={false}
            canDrop={(tree, { dragSource, dropTargetId }) => {
                if (dragSource?.parent === dropTargetId) {
                    return true;
                }

            }}
            onDragStart={onDragStart}
            placeholderRender={(node, { depth }) => (
                <Placeholder node={node} depth={depth} />
            )}
        />
        </div>
    );
}

export default ChecklistDnDTree;