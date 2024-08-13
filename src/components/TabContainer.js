import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

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