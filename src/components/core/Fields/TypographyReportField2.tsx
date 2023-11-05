import { Info } from "@mui/icons-material";
import { Tooltip, Typography, TypographyProps } from "@mui/material";
import { FormattedMessage } from "react-intl";

export interface TypographyReportField2Props extends TypographyProps {
  label: string;
  required?: boolean;
  info?: string;
}

const TypographyReportField2 = ({
  label,
  required,
  info,
  ...props
}: TypographyReportField2Props) => {
  if (label === undefined) {
    return null;
  }

  return (
    <Typography variant="button" {...props}>
      <FormattedMessage id={label} />
      {required && (
        <span
          style={{
            transform: "translate(2px, -1px)",
            display: "inline-block",
            fontWeight: 400,
          }}
        >
          *
        </span>
      )}{" "}
      {info && (
        <Tooltip
          title={<FormattedMessage id={info} />}
          //classes={{ tooltip: classes.noMaxWidth }}
        >
          <Info style={{ verticalAlign: "middle" }} />
        </Tooltip>
      )}
    </Typography>
  );
};

export default TypographyReportField2;
