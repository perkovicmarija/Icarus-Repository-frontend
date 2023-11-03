import React from "react";
import Switch from "@material-ui/core/Switch";
import { FormGroup, FormControlLabel } from "@material-ui/core";
import IntlMessages from "../../../../components/utility/intlMessages";
import { useController } from "react-hook-form";
import TypographyReportField from "../TypographyReportField";

function SwitchCustom2({
  control,
  name,
  rules,
  defaultValue,
  label,
  inlineLabel,
  disabled,
  ...props
}) {
  const {
    field: { ref, ...field },
    formState,
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const error = formState.errors[name];

  return (
    <>
      {label && (
        <TypographyReportField
          title={label}
          required={Boolean(rules?.required)}
        />
      )}
      <FormGroup row {...props}>
        <FormControlLabel
          control={
            <Switch
              disabled={disabled}
              onChange={(e) => field.onChange(e.target.checked)}
              checked={field.value}
            />
          }
          label={inlineLabel && <IntlMessages id={inlineLabel} />}
          labelPlacement="end"
        />
      </FormGroup>
    </>
  );
}

export default SwitchCustom2;
