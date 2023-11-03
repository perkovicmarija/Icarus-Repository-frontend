import { forwardRef } from "react";
import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import TypographyReportField from "../TypographyReportField";
import {
  Controller,
  FieldValues,
  UseControllerProps,
  UseFormStateReturn,
} from "react-hook-form";
import { useIntl } from "react-intl";

type SelectCustomProps = {
  options: string[];
  formState: UseFormStateReturn<FieldValues>;
  name: string;
} & TextFieldProps;

const SelectCustom = forwardRef<HTMLInputElement, SelectCustomProps>(
  ({ name, options, label, disabled, required, formState, ...props }, ref) => {
    const intl = useIntl();
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
            error?.message &&
            intl.formatMessage({ id: error.message as string })
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
  control,
  name,
  rules,
  label,
  options,
  defaultValue,
  ...props
}: { label?: string; options: string[] } & UseControllerProps) => {
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
          label={label}
          options={options}
          required={Boolean(rules?.required)}
        />
      )}
    />
  );
};

export default SelectBasicCustom2;
