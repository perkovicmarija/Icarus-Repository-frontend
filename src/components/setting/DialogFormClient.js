import React from 'react';

import {Button, DialogActions, DialogContent, Grid} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {ValidatorForm} from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';

import TextFieldValidation from '../core/TextField/TextFieldValidation';
import TypographyFieldTitle from '../core/TypographyFieldTitle';
import withValidation from '../../containers/HOC/withValidation';
import SwitchCustom from "../core/SwitchCustom";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2)
  },
  noMaxWidth: {
    maxWidth: 'none',
  },
}));

const DialogFormClient = ({
                              client,
                              onClose,
                              onSubmit,
                              onInputChange,
                              onSwitchClientDeactivatedChange,
                              onValidationError,
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
              <TypographyFieldTitle title="client.clientName"/>
              <TextFieldValidation
                disabled={false}
                id="name"
                label=""
                name="name"
                value={client.name}
                onInputChange={onInputChange}
                placeholder="client.clientName"
                type="text"/>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TypographyFieldTitle title="client.abbreviation"/>
              <TextFieldValidation
                disabled={false}
                id="abbreviation"
                label=""
                name="abbreviation"
                value={client.abbreviation}
                onInputChange={onInputChange}
                placeholder="client.abbreviation"
                type="text"/>
            </Grid>
          </Grid>

          {!client.clientId &&
          <Grid container>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TypographyFieldTitle title="client.deactivated"/>
              <SwitchCustom
                disabled={false}
                value={client.deactivated}
                onSwitchChange={onSwitchClientDeactivatedChange}
                name="showDeactivated"
              />
            </Grid>
          </Grid>}


        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit} className="uppercase">
            {!client.clientId ? "Add" : "Update"}
          </Button>
        </DialogActions>
      </ValidatorForm>
    </div>
  )
}
DialogFormClient.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired
}

export default withValidation(DialogFormClient);