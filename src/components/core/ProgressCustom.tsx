import { CircularProgress } from "@mui/material";

export const ProgressCustom = () => {
  return (
    <div
      style={{
        height: "4rem",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
};
