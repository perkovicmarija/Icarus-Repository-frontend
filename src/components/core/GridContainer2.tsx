import { Grid, GridProps } from "@mui/material";

/* This component is used to wrap sections of form fields within the form */
export const GridContainer2 = ({ children, sx, ...props }: GridProps) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        rowGap: "4px",
        alignItems: "flex-end",
        "& p.Mui-error": {
          position: "absolute",
          top: "100%",
          marginTop: 0,
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Grid>
  );
};
