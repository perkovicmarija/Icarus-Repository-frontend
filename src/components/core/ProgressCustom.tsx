import { CircularProgress } from "@mui/material";

export const ProgressCustom = () => {
  return (
    <div
      style={{
        height: "4rem",
        marginTop: "2rem",
        width: "100%",
        textAlign: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
};
