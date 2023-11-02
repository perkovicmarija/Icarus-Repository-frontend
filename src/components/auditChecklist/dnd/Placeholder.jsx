import React from 'react';
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(() => ({
    lineOfPlaceholder: {
        backgroundColor: '#1967d2',
        height: '2px',
        transform: 'translateY(-50%)'
    }
}));

const Placeholder = (props) => {
    const classes = useStyles();

    const left = props.depth * 50;
    return (
        <div
            className={classes.lineOfPlaceholder}
            style={{ left }}
        />
    );
};

export default Placeholder;