import React from 'react';

import {
    DialogActions,
    DialogContent,
    Button,
    Grid
} from '@mui/material';
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator';

import TextFieldValidation from '../core/TextField/TextFieldValidation';
import TypographyFieldTitle from '../core/TypographyFieldTitle';
import withValidation from '../../containers/HOC/withValidation';
import SelectMultipleCustom from '../core/Select/SelectMultipleCustom';

function DialogFormComment(props) {



    const {
        onClose,
        onSubmit,
        softwareLog,
        clients,
        selectedClients,
        onInputChange,
        onMultiSelectChange,
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
                                label="general.title"
                                name="title"
                                value={softwareLog.title}
                                onInputChange={onInputChange}
                                placeholder="general.title"
                                type="text"/>
                        </Grid>

                    </Grid>

                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <TextFieldValidation
                                disabled={false}
                                id="description"
                                label="general.description"
                                name="description"
                                value={softwareLog.description}
                                onInputChange={onInputChange}
                                rows="5"
                                placeholder="form.writeDescription"
                                type="text"/>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <TypographyFieldTitle title="general.companies"/>
                            <SelectMultipleCustom
                              disabled={false}
                              title="general.companies"
                              objectArray={clients}
                              selectArray={selectedClients}
                              firstLvlValueProp="companyId"
                              onMultiSelectChange={onMultiSelectChange}
                              optionProp="name"
                              optionKey="companyId"/>
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

