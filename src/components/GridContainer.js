import { Grid } from "@mui/material";
import React from "react";

/* This component is used to wrap sections of form fields within the form */
export const GridContainer = ({ children, style, ...props }) => {
  return (
    <Grid
      container
      spacing={2}
      style={{
        rowGap: "4px",
        alignItems: "flex-end",
        paddingBottom: "1.25rem",
        ...style,
      }}
      id="test_form_layout_vedran"
      {...props}
    >
      {children}
    </Grid>
  );
};
