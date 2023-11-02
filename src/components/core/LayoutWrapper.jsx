import { Box } from "@mui/material";

const LayoutWrapper = ({ largeSpace, children }) => {
  return (
    <Box
      sx={{
        padding: ["1rem 0.75rem", largeSpace ? "2.5rem 1.5rem" : "1.5rem"],
      }}
    >
      {children}
    </Box>
  );
};

export { LayoutWrapper };
