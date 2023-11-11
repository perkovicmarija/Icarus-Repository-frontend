import { useIntl } from "react-intl";
import { TextField, TextFieldProps } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";
import TypographyReportField from "../TypographyReportField";

type TextField2Props = {
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  info?: string;
  textFieldProps?: TextFieldProps;
};

const TextField2 = ({
  name,
  control,
  rules,
  defaultValue = "",
  disabled,
  //
  label,
  placeholder,
  multiline,
  rows,
  info,
  textFieldProps,
}: UseControllerProps<any> & TextField2Props) => {
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
        {...field}
        {...textFieldProps}
        error={Boolean(error)}
        helperText={
          error?.message && intl.formatMessage({ id: error.message as string })
        }
        placeholder={placeholder && intl.formatMessage({ id: placeholder })}
        fullWidth
        multiline={multiline}
        rows={rows}
        onKeyPress={(e) => {
          // to prevent accidental form submissions
          if (e.key === "Enter" && !multiline) {
            e.preventDefault();
          }
        }}
      />
    </>
  );
};

export default TextField2;
