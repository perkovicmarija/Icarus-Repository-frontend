import { LinearProgress, Grid, Box, DialogContent } from "@mui/material";
import { DialogActions2 } from "./DialogActions2";
import DialogNoCloseFrame from "./DialogNoCloseFrame";

export default function DialogProgress({
  progress,
  onClose,
  type,
}: {
  progress: number | undefined;
  onClose: () => void;
  type: "upload" | "download";
}) {
  if (progress === undefined) {
    return null;
  }

  return (
    <DialogNoCloseFrame
      title={type === "upload" ? "general.uploading" : "general.downloading"}
      open={progress !== undefined}
    >
      <DialogContent>
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ height: "0.5rem", borderRadius: "10px" }}
          />
        </Box>
        <Grid container>{progress}/100%</Grid>
      </DialogContent>
      <DialogActions2 onClose={onClose} hideSubmit />
    </DialogNoCloseFrame>
  );
}
