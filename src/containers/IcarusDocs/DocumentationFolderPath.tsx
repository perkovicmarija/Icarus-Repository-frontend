import React from "react";
import Button from "@mui/material/Button";
import IntlMessages from "../../components/core/IntlMessages";
import { ChevronRight } from "@mui/icons-material";
import { Box } from "@mui/material";

const computePath = (pathSegments: string[], index: number): string => {
  let path = "/";
  for (let i = 0; i <= index; i++) {
    path += pathSegments[i] + "/";
  }
  console.log(path);
  return path;
};

function DocumentationFolderPath({
  currentPath,
  onNavigate,
}: {
  currentPath: string;
  onNavigate: (path: string) => void;
}) {
  // we filter out initial path segment (HOME folder), before the first /
  // and also if there is a trailing / we filter "" segment following it
  const pathSegments = currentPath
    .split("/")
    .filter((pathSegment) => pathSegment.length > 0);

  console.log();

  return (
    <Box
      sx={{
        paddingLeft: "1rem",
        display: "flex",
        alignItems: "center",
        backgroundColor: (theme) => theme.palette.primary.main,
        color: "white",
      }}
    >
      <Button
        sx={{
          fontWeight: "500",
          fontSize: "1.1em",
          color: "white",
        }}
        onClick={() => onNavigate("/")}
      >
        <IntlMessages id="general.homeFolder" />
      </Button>
      {pathSegments.map((pathSegment, index) => {
        return (
          <React.Fragment key={index}>
            <ChevronRight
              style={{ verticalAlign: "top", margin: "0 0.5rem" }}
            />
            <Button
              sx={{
                fontWeight: "500",
                fontSize: "1.1em",
                color: "white",
              }}
              onClick={() => onNavigate(computePath(pathSegments, index))}
            >
              {pathSegment}
            </Button>
          </React.Fragment>
        );
      })}
    </Box>
  );
}
export default DocumentationFolderPath;
