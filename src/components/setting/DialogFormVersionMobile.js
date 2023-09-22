import React from 'react';
import {Button, DialogActions, DialogContent, Grid} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {ValidatorForm} from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';
import TextFieldValidation from '../core/TextField/TextFieldValidation';
import TypographyFieldTitle from '../core/TypographyFieldTitle';
import withValidation from '../../containers/HOC/withValidation';
import IntlMessages from "../core/IntlMessages";
import SelectMultipleCustom from "../core/Select/SelectMultipleCustom";
import SelectBasicCustomValidation from "../core/Select/SelectBasicCustomValidation";
import {Alert} from "@mui/lab";

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
                              onMultiSelectChange,
                              onSelectChange,
                              onValidationError,
                              clients,
                              selectedClients,
                              entryExistsFlag
                            }) => {
  const classes = useStyles();

  return (
    <div>
      <ValidatorForm
        onSubmit={onSubmit}
        onError={onValidationError}
        noValidate>
        <DialogContent>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                  {entryExistsFlag && <Alert severity="error"><IntlMessages id="form.entryExists" /></Alert>}
              </Grid>
                <Grid item xs={12}>
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

              <Grid item xs={12}>
                  <TypographyFieldTitle title="general.platform"/>
                  <SelectBasicCustomValidation
                      disabled={versionMobile.versionMobileId && true}
                      value={versionMobile.platform}
                      name="platform"
                      selectArray={["iOS", "Android"]}
                      label="general.platform"
                      onSelectChange={onSelectChange}
                      validators={['required']}
                      errorMessages={['This field is required']}
                      required/>
              </Grid>

              <Grid item xs={12}>
                  <SelectMultipleCustom
                      disabled={versionMobile.versionMobileId && true}
                      title="general.companies"
                      objectArray={clients}
                      selectArray={selectedClients}
                      firstLvlValueProp="clientId"
                      onMultiSelectChange={onMultiSelectChange}
                      optionProp="name"
                      optionKey="clientId"
                  />
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
  versionMobile: PropTypes.object.isRequired
}

export default withValidation(DialogFormVersionMobile);