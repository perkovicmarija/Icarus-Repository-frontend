import { Box, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    width: "100%",
    height: "10px",
    backgroundColor: "#ffb300",
    borderRadius: "5px",
    overflow: "hidden",
  },
  progress: {
    position: "absolute",
    height: "100%",
    borderRadius: "5px",
    backgroundColor: "#021b43",
  },
}));

const ProgressBar = ({ value }) => {
  const classes = useStyles();
  const progressValue = Math.abs(value * 50);

  return (
    <Tooltip title={`Value: ${value}`} arrow>
      <Box className={classes.root}>
        <Box
          className={classes.progress}
          style={{ width: `${progressValue}%` }}
        />
      </Box>
    </Tooltip>
  );
};

export default ProgressBar;
