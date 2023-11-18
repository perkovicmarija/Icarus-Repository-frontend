import { Info } from "@mui/icons-material";
import { Tooltip, Typography, TypographyProps } from "@mui/material";
import IntlMessages from "./IntlMessages";

export interface TypographyReportFieldProps extends TypographyProps {
  title: string;
  required?: boolean;
  info?: string;
}

const TypographyReportField = ({
  title,
  required,
  info,
  ...props
}: TypographyReportFieldProps) => {
  if (title === undefined) {
    return null;
  }

  return (
    <Typography variant="button" {...props}>
      <IntlMessages id={title} />
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
          title={<IntlMessages id={info} />}
          //classes={{ tooltip: classes.noMaxWidth }}
        >
          <Info
            style={{
              verticalAlign: "top",
              width: "22px",
              height: "22px",
              cursor: "pointer",
            }}
          />
        </Tooltip>
      )}
    </Typography>
  );
};

export default TypographyReportField;
