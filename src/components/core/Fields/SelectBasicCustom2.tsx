import { forwardRef } from "react";
import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import TypographyReportField from "../TypographyReportField";
import {
  ControllerRenderProps,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { useIntl } from "react-intl";

type SelectCustomProps = {
  field: ControllerRenderProps<FieldValues, string>;
  options: string[];
  label?: string;
  required?: boolean;
  error: string | undefined;
  selectProps?: TextFieldProps;
};

const SelectCustom = forwardRef<HTMLInputElement, SelectCustomProps>(
  (
    { field: { ref, ...field }, options, label, required, error, selectProps },
    ref2
  ) => {
    const intl = useIntl();

    return (
      <>
        {label && <TypographyReportField title={label} required={required} />}
        <TextField
          {...field}
          {...selectProps}
          variant="standard"
          select
          fullWidth
          inputRef={ref}
          error={Boolean(error)}
          helperText={error && intl.formatMessage({ id: error })}
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
  defaultValue = "",
  disabled,
}: { label?: string; options: string[] } & UseControllerProps<any>) => {
  const { field, formState } = useController({
    name,
    control,
    rules,
    defaultValue,
    disabled,
  });

  const error = formState.errors[name];

  return (
    <SelectCustom
      field={field}
      error={error?.message as string | undefined}
      label={label}
      options={options}
      required={Boolean(rules?.required)}
    />
  );
};

export default SelectBasicCustom2;
