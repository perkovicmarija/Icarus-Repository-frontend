import React, { forwardRef } from "react";
import { TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import IntlMessages from "../../../../components/utility/intlMessages";
import { useController } from "react-hook-form";
import { injectIntl } from "react-intl";
import TypographyReportField from "../TypographyReportField";

const SelectCustom = forwardRef(
  (
    {
      intl,
      //
      value,
      name,
      onChange,
      formState,

      label,
      placeholder,
      disabled,
      options,
      keyProp,
      labelProp,
      translate,
      required,
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
          fullWidth
          disabled={Boolean(disabled)}
          value={value?.[keyProp] ?? ""}
          onChange={(e) =>
            onChange(options.find((item) => item[keyProp] === e.target.value))
          }
          error={Boolean(error)}
          helperText={
            error?.message && intl.formatMessage({ id: error.message })
          }
          inputRef={ref}
          {...props}
        >
          {!value && placeholder && (
            <div
              style={{
                left: "0em",
                top: "0.25em",
                zIndex: 2,
                backgroundColor: "transparent",
                position: "absolute",
                fontSize: "1em",
                color: "#BBB",
                fontWeight: "400",
                pointerEvents: "none",
              }}
            >
              <IntlMessages
                id={placeholder === true ? "general.select" : placeholder}
              />
            </div>
          )}

          {options.map((item) => (
            <MenuItem key={item[keyProp]} value={item[keyProp]}>
              {translate ? (
                <IntlMessages id={item[labelProp]} />
              ) : (
                item[labelProp]
              )}
            </MenuItem>
          ))}
        </TextField>
      </>
    );
  }
);

const SelectCustom2 = ({
  intl,
  //
  name,
  control,
  rules,
  defaultValue,
  label,
  placeholder,
  disabled,
  keyProp,
  labelProp,
  options,
  translate,
  ...props
}) => {
  const { field, formState } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <SelectCustom
      intl={intl}
      //
      {...field}
      formState={formState}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      options={options}
      keyProp={keyProp}
      labelProp={labelProp}
      translate={translate}
      required={Boolean(rules?.required)}
      {...props}
    />
  );
};

export default injectIntl(SelectCustom2);
