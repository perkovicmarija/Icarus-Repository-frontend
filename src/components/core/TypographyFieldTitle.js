import React from 'react';

import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

import IntlMessages from './IntlMessages';

const TypographyFieldTitle = ({title}) => {
    return (
        <Typography variant="button">
            <IntlMessages id={title} />
        </Typography>
    );
}

TypographyFieldTitle.propTypes = {
    title: PropTypes.string.isRequired
}
export default TypographyFieldTitle;