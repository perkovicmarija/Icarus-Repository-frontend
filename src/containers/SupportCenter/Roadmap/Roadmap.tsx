import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { usePagination } from "../../../helpers/pagination";
import { useHistory } from "react-router-dom";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
//

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddComment from "@mui/icons-material/AddComment";
import { makeStyles } from "@mui/styles";
import { Paper } from "@mui/material";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";

import Typography from "@mui/material/Typography";
import BuildIcon from "@mui/icons-material/Build";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FlightIcon from "@mui/icons-material/Flight";
import DialogFormRoadmap from "../../../components/support/DialogFormRoadmap";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
//import DialogFormRoadmapLogFilter from "../../../components/support/DialogFormRoadmapLogFilter";
import TableToolbar2 from "../../../components/core/Table/TableToolbar2";
import { DialogDelete2 } from "../../../components/core/Dialog/DialogDelete2";
import {
  RoadmapType,
  roadmapActions,
} from "../../../redux/support/roadmapSlice";

const useStyles = makeStyles((theme: any) => ({
  paper: {
    padding: "6px 16px",
  },
  timelineSuccess: {
    background: "green",
  },
  timelineInProgress: {
    background: "#c3922e",
  },
  timelineNeutral: {
    background: "#043076",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  deleteIcon: {
    color: "#d32f2f",
  },
  marginY: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

const checkIcon = (value: any) => {
  if (value === "completed") {
    return <EmojiEventsIcon />;
  }
  if (value === "in-progress") {
    return <BuildIcon />;
  }
  return <FlightIcon />;
};

function Roadmap() {
  const classes = useStyles();
  const checkIconColor = (value: any) => {
    if (value === "completed") {
      return classes.timelineSuccess;
    }
    if (value === "in-progress") {
      return classes.timelineInProgress;
    }
    return classes.timelineNeutral;
  };

  const dispatch = useAppDispatch();
  const history = useHistory();

  const data = useAppSelector((state) => state.Roadmap.data);
  const totalCount = useAppSelector((state) => state.Roadmap.meta.totalCount);
  const filters = useAppSelector((state) => state.Roadmap.filters);

  const [dialogWarning, setDialogWarning] = useState<RoadmapType>();
  const [dialogAddEdit, setDialogAddEdit] = useState<
    RoadmapType | {} | undefined
  >();

  const page = 0;
  const rowsPerPage = 50;

  const [loading, setLoading] = useState(false);

  const meta = useMemo(
    () => ({
      filters,
      pagination: {
        page,
        rowsPerPage,
      },
    }),
    [filters, page, rowsPerPage]
  );

  useLayoutEffect(() => {
    setLoading(true);
    dispatch(roadmapActions.getData(meta.pagination)).finally(() =>
      setLoading(false)
    );
  }, [meta]);

  return (
    <div>
      <TableToolbar2
        title="support.roadmap"
        //
        /* filters={filters}
        initFilters={initFilters}
        onFilterClick={handleRoadmapFilterClick} */
      />

      <Tooltip title="Roadmap">
        <IconButton aria-label="Add" onClick={() => setDialogAddEdit({})}>
          <AddComment />
        </IconButton>
      </Tooltip>

      <Timeline position="alternate" style={{ opacity: loading ? 0.25 : 1 }}>
        {data &&
          data.map((item: RoadmapType) => {
            return (
              <TimelineItem key={item.icarusRoadmapLogId}>
                <TimelineOppositeContent></TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot className={checkIconColor(item.status)}>
                    {checkIcon(item.status)}
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h6" component="h1">
                      {item.title}
                    </Typography>
                    <Typography className={classes.marginY}>
                      {item.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Estimated: {item.estimatedTimeFormatted}
                    </Typography>
                    <div className={classes.iconContainer}>
                      <IconButton
                        size="small"
                        onClick={() => setDialogAddEdit(item)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        className={classes.deleteIcon}
                        onClick={() => setDialogWarning(item)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            );
          })}
      </Timeline>

      {/* <DialogFormFrame
        onClose={handleFilterDialogClose}
        title="general.selectFilters"
        open={dialogFilterOpen}
      >
        <DialogFormRoadmapLogFilter
          filters={filters}
          onClearAll={handleClearAllFilters}
          onClose={handleFilterDialogClose}
          onSubmit={handleFilterSubmit}
          onFilterSelectBasicChange={handleFilterSelectBasicChange}
          onFilterInputChange={handleFilterInputChange}
          editDisabled={false}
        />
      </DialogFormFrame> */}

      {dialogAddEdit && (
        <DialogFormFrame
          onClose={() => setDialogAddEdit(undefined)}
          title="support.roadmap.new"
          open={dialogAddEdit}
        >
          <DialogFormRoadmap
            initialData={dialogAddEdit}
            onClose={() => setDialogAddEdit(undefined)}
            onSubmit={(payload: any) =>
              dispatch(roadmapActions.addEditItem({ payload, meta }))
            }
          />
        </DialogFormFrame>
      )}

      <DialogDelete2
        data={dialogWarning}
        text="general.deleteWarning"
        onSubmit={(payload) =>
          dispatch(roadmapActions.deleteItem({ payload, meta }))
        }
        onClose={() => setDialogWarning(undefined)}
      />
    </div>
  );
}

export default Roadmap;
