import { Build, Delete, Edit, EmojiEvents, Flight } from "@mui/icons-material";
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
import { IconButton, Paper, Typography, Box } from "@mui/material";
import { RoadmapType } from "../../../redux/support/roadmapSlice";
import { useState } from "react";
import { DialogDelete2 } from "../../../components/core/Dialog/DialogDelete2";

const checkIcon = (value: any) => {
  if (value === "completed") {
    return <EmojiEvents />;
  }
  if (value === "in-progress") {
    return <Build />;
  }
  return <Flight />;
};

const checkIconColor = (value: any) => {
  if (value === "completed") {
    return {
      background: "green",
    };
  }
  if (value === "in-progress") {
    return {
      background: "#c3922e",
    };
  }
  return {
    background: "#043076",
  };
};

export const RoadmapList = ({
  data,
  onEdit,
  onDelete,
  loading,
}: {
  data: RoadmapType[] | undefined;
  onEdit: (item: RoadmapType | {}) => void;
  onDelete: (item: RoadmapType) => Promise<any>;
  loading: boolean;
}) => {
  const [dialogWarning, setDialogWarning] = useState<RoadmapType>();

  return (
    <>
      <Timeline position="alternate" style={{ opacity: loading ? 0.25 : 1 }}>
        {data &&
          [...data]
            .sort((a, b) => {
              if (!a.estimatedTime) {
                return -1;
              }
              return a.estimatedTime > b.estimatedTime ? -1 : 1;
            })
            .map((item: RoadmapType) => {
              return (
                <TimelineItem key={item.icarusRoadmapLogId}>
                  <TimelineOppositeContent></TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot style={checkIconColor(item.status)}>
                      {checkIcon(item.status)}
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Paper
                      elevation={3}
                      sx={{
                        padding: "6px 16px",
                      }}
                    >
                      <Typography variant="h6" component="h1">
                        {item.title}
                      </Typography>
                      <Typography
                        sx={{
                          marginBottom: "0.5rem",
                          marginTop: "0.5rem",
                        }}
                      >
                        {item.description}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Estimated: {item.estimatedTimeFormatted}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginBottom: "0.5rem",
                          marginTop: "0.5rem",
                        }}
                      >
                        <IconButton size="small" onClick={() => onEdit(item)}>
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setDialogWarning(item)}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
      </Timeline>

      <DialogDelete2
        data={dialogWarning}
        text="general.deleteWarning"
        onSubmit={onDelete}
        onClose={() => setDialogWarning(undefined)}
      />
    </>
  );
};
