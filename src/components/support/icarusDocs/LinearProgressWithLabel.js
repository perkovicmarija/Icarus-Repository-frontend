import React from 'react';
import {Box, LinearProgress, Typography} from "@mui/material";

function LinearProgressWithLabel(props) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${props.value}%`}</Typography>
            </Box>
        </Box>
    );
}

export default LinearProgressWithLabel;