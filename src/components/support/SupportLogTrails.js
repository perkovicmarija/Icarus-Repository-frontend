import React from 'react';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(3),
    },
    wrap: {
        whiteSpace: 'pre-line'
    }
}));

function SupportLogTrails(props) {
    const classes = useStyles();

    const {logTrails} = props;
    return (
        <div className={classes.root}>
            {logTrails.map(item => {
                return (
                    <div key={item.supportSoftwareLogId}>
                        <p>{item.dateFormatted}</p>
                        <p>{item.title}</p>
                        <p className={classes.wrap}>{item.description}</p>
                    </div>

                )
            })}
        </div>
    )
}

export default SupportLogTrails;