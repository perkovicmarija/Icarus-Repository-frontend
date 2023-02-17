import React from 'react';

import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};