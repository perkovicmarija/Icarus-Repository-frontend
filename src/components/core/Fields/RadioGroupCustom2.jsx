import React, { forwardRef } from "react";
import {
  FormControl,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";
import { FormControlLabel } from "@mui/material";
import Typography from "@mui/material/Typography";
import IntlMessages from "../../../../components/utility/intlMessages";
import TypographyReportField from "../TypographyReportField";
import { injectIntl } from "react-intl";
import { useController } from "react-hook-form";

const RadioGroupCustom = forwardRef(
  (
    {
      intl,
      //
      value,
      name,
      onChange,
      required,
      formState,
      //
      row,
      options,
      label,
      sublabel,
      disabled,
      radioGroupProps,
    },
    ref
  ) => {
    const error = formState.errors[name];

    return (
      <>
        {label && <TypographyReportField title={label} required={required} />}
        {sublabel && (
          <Typography variant="body1" gutterBottom>
            <IntlMessages id={sublabel} />
          </Typography>
        )}
        <FormControl error={Boolean(error)} style={{ display: "block" }}>
          <RadioGroup
            row={row}
            name={name}
            value={value ?? ""}
            onChange={onChange}
            {...radioGroupProps}
          >
            {options.map((item) => {
              return (
                <FormControlLabel
                  key={item.value}
                  value={item.value}
                  control={<Radio disabled={disabled} />}
                  label={<IntlMessages id={item.label} />}
                />
              );
            })}
          </RadioGroup>
          {error?.message && (
            <FormHelperText>
              <IntlMessages id={error.message} />
            </FormHelperText>
          )}
        </FormControl>
      </>
    );
  }
);

const RadioGroupCustom2 = ({
  intl,
  //
  control,
  name,
  rules,
  defaultValue,
  //
  row,
  options,
  label,
  sublabel,
  disabled,
  radioGroupProps,
}) => {
  const { field, formState } = useController({
    control,
    name,
    rules,
    defaultValue,
  });

  return (
    <RadioGroupCustom
      intl={intl}
      {...field}
      formState={formState}
      required={Boolean(rules?.required)}
      row={row}
      options={options}
      label={label}
      sublabel={sublabel}
      disabled={disabled}
      radioGroupProps={radioGroupProps}
    />
  );
};

export default injectIntl(RadioGroupCustom2);
