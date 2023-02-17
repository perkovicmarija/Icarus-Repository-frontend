import React from 'react';

import { DialogActions, DialogContent, Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator';

import TextFieldValidation from '../core/TextField/TextFieldValidation';
import TypographyFieldTitle from '../core/TypographyFieldTitle';
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
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <TypographyFieldTitle title="general.title"/>
                            <TextFieldValidation
                                disabled={false}
                                id="title"
                                label=""
                                name="title"
                                value={item.title}
                                onInputChange={onInputChange}
                                placeholder="Title"
                                type="text"/>
                        </Grid>

                    </Grid>

                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <TextFieldValidation
                                disabled={false}
                                id="description"
                                label="Description"
                                name="description"
                                value={item.description}
                                onInputChange={onInputChange}
                                rows="5"
                                placeholder="Write a description..."
                                type="text"/>
                        </Grid>
                    </Grid>


                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} className="uppercase">
                        Add
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </div>
    )
}
DialogFormComment.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

export default withValidation(DialogFormComment);

