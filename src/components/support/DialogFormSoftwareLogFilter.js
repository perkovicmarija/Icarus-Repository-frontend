import React from 'react';
import {Button, DialogActions, DialogContent, Grid} from "@mui/material";
import TypographyFieldTitle from "../core/TypographyFieldTitle";
import SelectMultipleCustom from "../core/Select/SelectMultipleCustom";
import PropTypes from "prop-types";

function DialogFormSoftwareLogFilter(props) {

  const {
    onMultiSelectChangeClients,
    onClearAll,
    onClose,
    onSubmit,
    clients,
    selectedClients
  } = props

  return (
    <div>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TypographyFieldTitle title="client.clientName"/>
            <SelectMultipleCustom
              disabled={false}
              title="client.clientName"
              objectArray={clients}
              selectArray={selectedClients}
              firstLvlValueProp="clientId"
              onMultiSelectChange={onMultiSelectChangeClients}
              optionProp="name"
              optionKey="clientId"/>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClearAll}>
          Clear all
        </Button>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onSubmit} className="uppercase">
          Submit
        </Button>
      </DialogActions>
    </div>
  );
}

DialogFormSoftwareLogFilter.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  clients: PropTypes.array.isRequired
}

export default DialogFormSoftwareLogFilter;