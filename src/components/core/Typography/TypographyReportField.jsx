import React from "react";
import {Typography} from "@mui/material";
import IntlMessages from "../IntlMessages";

const TypographyReportField = ({ title, required, ...props }) => {
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
            fontWeight: 400
          }}
        >
          *
        </span>
      )}
    </Typography>
  );
};

export default TypographyReportField;
