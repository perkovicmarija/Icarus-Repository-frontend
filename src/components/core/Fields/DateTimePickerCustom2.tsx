import TypographyReportField2, {
  TypographyReportField2Props,
} from "./TypographyReportField2";
import { UseControllerProps, useController } from "react-hook-form";
import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers";
import { useIntl } from "react-intl";
import dayjs, { Dayjs } from "dayjs";

const DateTimePickerCustom2 = ({
  name,
  control,
  rules,
  defaultValue = null,
  shouldUnregister,
  //
  label,
  labelProps,
  placeholder,
  hidePlaceholder,
  disabled,
  dateTimePickerProps,
}: UseControllerProps<any> & {
  label?: string;
  labelProps?: Omit<TypographyReportField2Props, "label">;
  placeholder?: string;
  hidePlaceholder?: boolean;
  dateTimePickerProps?: DateTimePickerProps<Dayjs>;
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
          {...labelProps}
        />
      )}
      <DateTimePicker
        {...field}
        value={field.value ? dayjs(field.value) : null}
        timezone="UTC"
        disabled={disabled}
        inputRef={ref}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: "standard",
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
        {...dateTimePickerProps}
      />
    </>
  );
};

export default DateTimePickerCustom2;
