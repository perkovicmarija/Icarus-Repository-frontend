import React from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import { DialogActions, DialogContent } from "@mui/material";
import Grid from "@mui/material/Grid";
import TypographyReportField from "../core/Typography/FormFieldTitle";
import TextFieldValidation from "../core/TextField/TextFieldValidation";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import SelectBasicCustomValidation from "../core/Select/SelectBasicCustomValidation";

function DialogFormRoadmapLogFilter({
  filters,
  editDisabled,
  onClearAll,
  onClose,
  onSubmit,
  onFilterSelectBasicChange,
  onFilterInputChange,
}) {
  const statusArray = ["in-progress", "future", "completed"];

  return (
    <div>
      <ValidatorForm onSubmit={onSubmit} noValidate autoComplete="off">
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
              <TypographyReportField title="general.title" />
              <TextFieldValidation
                disabled={editDisabled}
                id="title"
                name="title"
                label="general.title"
                value={filters.title}
                onInputChange={onFilterInputChange}
                placeholder="general.title"
                type="text"
              />
            </Grid>

            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
              <TypographyReportField title="general.description" />
              <TextFieldValidation
                disabled={editDisabled}
                id="description"
                name="description"
                label="general.description"
                value={filters.description}
                onInputChange={onFilterInputChange}
                placeholder="general.description"
                type="text"
              />
            </Grid>

            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
              <TypographyReportField title="general.status" />
              <SelectBasicCustomValidation
                disabled={editDisabled}
                value={filters.status}
                name="status"
                selectArray={statusArray}
                label="general.status"
                onSelectChange={onFilterSelectBasicChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </ValidatorForm>
      <DialogActions>
        <Button onClick={onClearAll}>Clear all</Button>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit} className="uppercase">
          Submit
        </Button>
      </DialogActions>
    </div>
  );
}

DialogFormRoadmapLogFilter.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default DialogFormRoadmapLogFilter;
