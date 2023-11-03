import React, { forwardRef } from "react";
import { MenuItem, TextField } from "@material-ui/core";
import TypographyReportField from "../TypographyReportField";
import { Controller } from "react-hook-form";
import { injectIntl } from "react-intl";

const SelectCustom = forwardRef(
  (
    {
      intl,
      //
      name,
      options,
      label,
      disabled,
      required,
      formState,
      ...props
    },
    ref
  ) => {
    const error = formState.errors[name];

    return (
      <>
        {label && <TypographyReportField title={label} required={required} />}
        <TextField
          select
          disabled={disabled}
          fullWidth
          inputRef={ref}
          error={Boolean(error)}
          helperText={
            error?.message && intl.formatMessage({ id: error.message })
          }
          {...props}
        >
          {options.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      </>
    );
  }
);

const SelectBasicCustom2 = ({
  intl,
  //
  name,
  control,
  rules,
  label,
  options,
  defaultValue,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      {...props}
      render={({ field, formState }) => (
        <SelectCustom
          {...field}
          formState={formState}
          intl={intl}
          label={label}
          options={options}
          required={Boolean(rules?.required)}
        />
      )}
    />
  );
};

export default injectIntl(SelectBasicCustom2);
