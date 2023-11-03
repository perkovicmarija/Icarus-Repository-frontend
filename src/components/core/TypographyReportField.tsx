import { Info } from "@mui/icons-material";
import { Tooltip, Typography } from "@mui/material";
import IntlMessages from "./IntlMessages";

const TypographyReportField = ({ title, required, info, ...props }: any) => {
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
          <Info style={{ verticalAlign: "middle" }} />
        </Tooltip>
      )}
    </Typography>
  );
};

export default TypographyReportField;
