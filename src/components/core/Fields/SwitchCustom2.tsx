import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import { Control, UseControllerProps, useController } from "react-hook-form";
import TypographyReportField from "../TypographyReportField";
import { FormGroupProps } from "@mui/material";
import IntlMessages from "../IntlMessages";

type SwitchCustom2Props = FormGroupProps & {
  control: Control;
  name: string;
  label?: string;
  rules?: UseControllerProps["rules"];
  defaultValue?: string;
  inlineLabel?: string;
  disabled?: boolean;
  info?: string;
};

function SwitchCustom2({
  control,
  name,
  label,
  rules,
  defaultValue,
  inlineLabel,
  disabled,
  info,
  ...props
}: SwitchCustom2Props) {
  const {
    field: { ref, ...field },
    formState,
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

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
      <FormGroup row {...props}>
        <FormControlLabel
          control={
            <Switch
              disabled={disabled}
              onChange={(e: any) => field.onChange(e.target.checked)}
              checked={field.value}
            />
          }
          label={inlineLabel && <IntlMessages id={inlineLabel} />}
          labelPlacement="end"
        />
      </FormGroup>
    </>
  );
}

export default SwitchCustom2;
