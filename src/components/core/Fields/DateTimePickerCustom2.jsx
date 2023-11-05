import React from "react";
import { IconButton, InputAdornment } from "@mui/material";
import NavigateNext from "@material-ui/icons/NavigateNext";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import DateRange from "@material-ui/icons/DateRange";
import QueryBuilder from "@material-ui/icons/QueryBuilder";
import TypographyReportField from "../TypographyReportField";
import { injectIntl } from "react-intl";
import { useController } from "react-hook-form";
import { DateTimePicker } from "@material-ui/pickers";

const DateTimePickerCustom2 = ({
  intl,
  //
  name,
  control,
  rules,
  defaultValue = null,
  shouldUnregister,

  label,
  titleProps,
  placeholder,
  hidePlaceholder,
  disabled,
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
    shouldUnregister,
  });

  const error = formState.errors[name];

  return (
    <>
      {label && (
        <TypographyReportField
          title={label}
          required={Boolean(rules?.required)}
          {...titleProps}
        />
      )}
      <DateTimePicker
        disabled={disabled}
        {...field}
        inputRef={ref}
        placeholder={
          hidePlaceholder
            ? null
            : intl.formatMessage({
                id: placeholder ?? "general.dateTime.label",
              })
        }
        error={Boolean(error)}
        helperText={error?.message && intl.formatMessage({ id: error.message })}
        //
        leftArrowIcon={<NavigateBefore />}
        rightArrowIcon={<NavigateNext />}
        dateRangeIcon={<DateRange />}
        timeIcon={<QueryBuilder />}
        format="DD-MMM-YYYY HH:mm"
        fullWidth
        ampm={false}
        clearable={true}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <DateRange />
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...props}
      />
    </>
  );
};

export default injectIntl(DateTimePickerCustom2);
