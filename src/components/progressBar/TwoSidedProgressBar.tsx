import { Box, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    width: "100%",
    height: "10px",
    backgroundColor: "#f0f0f0",
    borderRadius: "5px",
    overflow: "hidden",
  },
  progress: {
    position: "absolute",
    height: "100%",
    borderRadius: "5px",
  },
  negative: {
    backgroundColor: "#021b43",
    right: "50%",
    transformOrigin: "right",
  },
  positive: {
    backgroundColor: "#021b43",
    left: "50%",
    transformOrigin: "left",
  },
}));

const TwoSidedProgressBar = ({ value }) => {
  const classes = useStyles();
  const progressValue = Math.abs(value * 50);

  return (
    <Tooltip title={`Value: ${value}`} arrow>
      <Box className={classes.root}>
        <Box
          className={`${classes.progress} ${
            value < 0 ? classes.negative : classes.positive
          }`}
          style={{ width: `${progressValue}%` }}
        />
      </Box>
    </Tooltip>
  );
};

export default TwoSidedProgressBar;
