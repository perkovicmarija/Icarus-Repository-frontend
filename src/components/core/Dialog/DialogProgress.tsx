import { LinearProgress, Grid, Box, DialogContent } from "@mui/material";

export default function DialogProgress({ progress }: { progress: number }) {
  return (
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
  );
}
