import React from 'react';

import {Button, DialogActions, DialogContent, Grid} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {ValidatorForm} from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';

import TextFieldValidation from '../core/TextField/TextFieldValidation';
import TypographyFieldTitle from '../core/TypographyFieldTitle';
import withValidation from '../../containers/HOC/withValidation';
import SwitchCustom from "../core/SwitchCustom";
import SelectMultipleCustom from "../core/Select/SelectMultipleCustom";
import SelectBasicCustomValidation from "../core/Select/SelectBasicCustomValidation";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2)
  },
  noMaxWidth: {
    maxWidth: 'none',
  },
}));

const DialogFormVersionMobile = ({
                              versionMobile,
                              onClose,
                              onSubmit,
                              onInputChange,
                              onSelectChange,
                              onValidationError,
                              clients
                            }) => {
  const classes = useStyles();

  return (
    <div>
      <ValidatorForm
        onSubmit={onSubmit}
        onError={onValidationError}
        noValidate>
        <DialogContent>
          <Grid container>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TypographyFieldTitle title="general.versionMobile"/>
              <TextFieldValidation
                disabled={false}
                id="versionMin"
                label="general.versionMobile"
                name="versionMin"
                value={versionMobile.versionMin}
                onInputChange={onInputChange}
                placeholder="general.versionMobile"
                type="text"
                validators={['required']}
                errorMessages={['This field is required']}
                required/>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TypographyFieldTitle title="general.platform"/>
              <TextFieldValidation
                disabled={false}
                id="platform"
                label="general.platform"
                name="platform"
                value={versionMobile.platform}
                onInputChange={onInputChange}
                placeholder="general.platform"
                type="text"
                validators={['required']}
                errorMessages={['This field is required']}
                required/>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <SelectBasicCustomValidation
                    disabled={false}
                    value={versionMobile.client}
                    name="status"
                    selectArray={clients}
                    label="general.status"
                    onSelectChange={onSelectChange} />
            </Grid>
          </Grid>




        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="uppercase">
            {!versionMobile.versionMobileId ? "Create" : "Update"}
          </Button>
        </DialogActions>
      </ValidatorForm>
    </div>
  )
}
DialogFormVersionMobile.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired
}

export default withValidation(DialogFormVersionMobile);