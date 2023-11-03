import { useIntl } from "react-intl";
import { TextField, TextFieldProps } from "@mui/material";
import { Control, UseControllerProps, useController } from "react-hook-form";
import TypographyReportField from "../TypographyReportField";

type TextField2Props = TextFieldProps & {
  control: Control;
  name: string;
  label?: string;
  rules?: UseControllerProps["rules"];
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  multiline?: boolean;
  info?: string;
};

const TextField2 = ({
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
}: TextField2Props) => {
  const {
    field: { ref, ...field },
    formState,
  } = useController({
    name,
    control,
    rules,
    defaultValue,
    disabled,
  });

  const intl = useIntl();

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
        error={Boolean(error)}
        helperText={
          error?.message && intl.formatMessage({ id: error.message as string })
        }
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
        {...field}
      />
    </>
  );
};

export default TextField2;
