import React from 'react';

import { DialogActions, DialogContent, Button, Grid } from '@mui/material';
import { ValidatorForm } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';

import TextFieldValidation from '../core/TextField/TextFieldValidation';
import IntlMessages from '../core/IntlMessages';
import withValidation from '../../containers/HOC/withValidation';

function DialogFormComment(props) {

    const {
        onClose,
        onSubmit,
        item,
        onInputChange,
        onValidationError
    } = props;

    return (
        <div>
            <ValidatorForm
                onSubmit={onSubmit}
                onError={onValidationError}
                noValidate>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextFieldValidation
                                disabled={false}
                                id="comment"
                                label="Comment"
                                name="comment"
                                value={item.comment}
                                onInputChange={onInputChange}
                                rows="5"
                                placeholder="Write a comment..."
                                type="text"/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        <IntlMessages id="action.cancel"/>
                    </Button>
                    <Button type="submit" className="uppercase" variant="outlined" color="primary">
                        <IntlMessages id="action.submit"/>
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </div>
    )
}
DialogFormComment.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSelectChange: PropTypes.func.isRequired,
}

export default withValidation(DialogFormComment);

