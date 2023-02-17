import React from 'react';

import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

import IntlMessages from '../IntlMessages';

const FormFieldTitle = ({title, ...rest}) => {
    return (
        <Typography variant="button" {...rest}>
            <IntlMessages id={title} />
        </Typography>
    );
}

FormFieldTitle.propTypes = {
    title: PropTypes.string.isRequired
}
export default FormFieldTitle;