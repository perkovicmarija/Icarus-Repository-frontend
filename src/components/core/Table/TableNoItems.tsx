import { Box } from "@mui/material";
import { FormattedMessage } from "react-intl";

export const TableNoItems = ({ message }: { message?: string }) => {
  return (
    <div style={{ width: "100%" }}>
      <Box
        display="flex"
        justifyContent="center"
        fontStyle="oblique"
        fontSize="fontSize"
        style={{ padding: "1.25rem 0" }}
      >
        <FormattedMessage id={message ?? "general.noItems"} />
      </Box>
    </div>
  );
};
