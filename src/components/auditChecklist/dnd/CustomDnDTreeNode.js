import React from 'react';
import { makeStyles } from "@mui/styles";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {TypeIcon} from "./TypeIcon";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles(() => ({
    root: {
        alignItems: 'center',
        display: 'grid',
        gridTemplateColumns: 'auto auto 1fr auto',
        overflow: 'auto',
        paddingInlineEnd: '8px',
        borderBottom: 'solid 1px #eee'
    },
    labelGridItem: {
        paddingInlineStart: '8px'
    },
    isOpen: {
        transform: 'rotate(90deg)'
    },
    elementLabel: {
        alignItems: 'center',
        display: 'grid',
        gridTemplateColumns: 'auto auto 1fr auto',
        paddingInlineEnd: '8px',
    }
}));

const CustomDnDTreeNode = (props) => {

    const classes = useStyles();

    const {
        droppable,
        text
    } = props.node;

    const indent = props.depth * 24;

    const handleToggle = (event) => {
        event.stopPropagation();
        props.onToggle(props.node.id);
    }

    return (
        <div
            className={`tree-node ${classes.root}`}
            style={{ paddingInlineStart: indent }}
        >
            <div
                className={props.isOpen ? classes.isOpen : ""}
            >
                {props.node.droppable && (
                    <div onClick={handleToggle}>
                        <ArrowRightIcon />
                    </div>
                )}
            </div>
            <div onClick={
                () => props.onClick(props.node.data)
            }
                 className={classes.elementLabel}>
                <div>
                    <TypeIcon droppable={droppable || false}/>
                </div>
                <div className={classes.labelGridItem}>
                    <Typography variant="body2">{text}</Typography>
                </div>
            </div>
        </div>
    );
}

export default CustomDnDTreeNode;