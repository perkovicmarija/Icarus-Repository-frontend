import React from "react";
import { injectIntl } from "react-intl";
import { TextField } from "@material-ui/core";
import { useController } from "react-hook-form";
import TypographyReportField from "../TypographyReportField";

const TextField2 = ({
  intl,
  //
  name,
  control,
  rules,
  defaultValue = "",
  label,
  placeholder,
  disabled,
  multiline,
  info,
  ...props
}) => {
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
          info={info}
        />
      )}
      <TextField
        {...field}
        error={Boolean(error)}
        helperText={error?.message && intl.formatMessage({ id: error.message })}
        disabled={disabled}
        placeholder={placeholder && intl.formatMessage({ id: placeholder })}
        fullWidth
        multiline={multiline}
        onKeyPress={(e) => {
          // to prevent accidental form submissions
          if (e.key === "Enter" && !multiline) {
            e.preventDefault();
          }
        }}
        {...props}
      />
    </>
  );
};

export default injectIntl(TextField2);
