import TypographyReportField2, {
  TypographyReportField2Props,
} from "./TypographyReportField2";
import { UseControllerProps, useController } from "react-hook-form";
import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers";
import { useIntl } from "react-intl";
import { Moment } from "moment";

const DateTimePickerCustom2 = ({
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
}: UseControllerProps &
  DateTimePickerProps<Moment> & {
    label?: string;
    titleProps?: Omit<TypographyReportField2Props, "label">;
    hidePlaceholder?: boolean;
    placeholder?: string;
  }) => {
  const intl = useIntl();
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
        <TypographyReportField2
          required={Boolean(rules?.required)}
          label={label}
          {...titleProps}
        />
      )}
      <DateTimePicker
        disabled={disabled}
        {...field}
        inputRef={ref}
        slotProps={{
          textField: {
            fullWidth: true,
            placeholder: hidePlaceholder
              ? ""
              : intl.formatMessage({
                  id: placeholder ?? "general.dateTime.label",
                }),
            error: Boolean(error),
            helperText:
              error?.message &&
              intl.formatMessage({ id: error.message as string }),
          },
          field: {
            clearable: true,
          },
        }}
        format="DD-MMM-YYYY HH:mm"
        ampm={false}
        {...props}
      />
    </>
  );
};

export default DateTimePickerCustom2;
