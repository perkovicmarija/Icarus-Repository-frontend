import { FormControlLabel, Switch } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";
import TypographyReportField from "../TypographyReportField";
import IntlMessages from "../IntlMessages";

interface SwitchCustom2Props {
  label?: string;
  inlineLabel?: string;
  info?: string;
}

function SwitchCustom2({
  control,
  name,
  label,
  rules,
  defaultValue = false,
  inlineLabel,
  disabled,
  info,
}: UseControllerProps<any> & SwitchCustom2Props) {
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
    <div style={{ display: "flex", flexDirection: "column" }}>
      {label && (
        <TypographyReportField
          title={label}
          required={Boolean(rules?.required)}
          info={info}
        />
      )}
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
    </div>
  );
}

export default SwitchCustom2;
