import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as supportActions from '../../../redux/support/supportActions';
import {withRouter} from 'react-router-dom';
import DialogFormFrame from '../../../components/core/Dialog/DialogFormFrame';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddComment from '@mui/icons-material/AddComment';
import {cloneDeep} from "lodash";
import {makeStyles} from '@mui/styles';
import {Paper} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import BuildIcon from '@mui/icons-material/Build';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FlightIcon from '@mui/icons-material/Flight';
import DialogFormRoadmap from "../../../components/support/DialogFormRoadmap";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogDeleteWarning from "../../../components/core/Dialog/DialogDeleteWarning";
import DialogFormRoadmapLogFilter from "../../../components/support/DialogFormRoadmapLogFilter";
import EnhancedTableToolbarSingleOption from "../../../components/core/Table/EnhancedTableToolbarSingleOption";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: "100%",
    },
    table: {
    },
    tableRow: {
        cursor: 'pointer'
    },
    action:{
        width:'20%',
    },
    selectCustomMargin:{
        margin:'10px'
    },
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
    timelineSuccess:{
        background: "green"
    },
    timelineInProgress:{
        background:'#c3922e',
    },
    timelineNeutral:{
        background: "#043076"
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    deleteIcon: {
        color: '#d32f2f',
    },
    marginY: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    }
}));



function Roadmap(props) {

    const {
        roadmaps,
        filters
    } = props;

    const classes = useStyles();

    const createInitialState = () => ({
        title: "",
        description: "",
        estimatedTime: "",
        status: "",
        created: null,
    });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [dialogWarningOpen, setDialogWarningOpen] = useState(false);
    const [roadmapLogIdForDelete, setRoadmapLogIdForDelete] = useState(undefined)
    const [dialogNewLog, setDialogNewLog] = useState(false);
    const [roadmapLog, setRoadmapLog] = useState(createInitialState);
    const [dialogFilterOpen, setDialogFilterOpen] = useState(false)

    useEffect(() => {
        const viewModel = {
            page,
            rows_per_page: rowsPerPage,
        }
        props.supportActions.loadRoadmapLogsPaginateFilter(viewModel);
        // props.supportActions.loadAllRoadmapLogs();
    }, []);

    const handleRoadmapLogSubmit = () => {
        if (roadmapLog.icarusRoadmapLogId) {
            props.supportActions.updateRoadmapLog(roadmapLog);
        } else {
            props.supportActions.createRoadmapLog(roadmapLog);
        }
        setDialogNewLog(false)
        setRoadmapLog(createInitialState)
        props.supportActions.loadAllRoadmapLogs();
    };

    const handleInputChange = ({ target: { name, value } }) => {
        setRoadmapLog(prevState => ({ ...prevState, [name]: value }));
    };

    const checkIconColor = (value) => {
        if(value === "completed"){
            return classes.timelineSuccess;
        }
        if(value === "in-progress"){
            return classes.timelineInProgress;
        }
        return classes.timelineNeutral;

    };

    const checkIcon = value => {
        if(value === "completed"){
            return  <EmojiEventsIcon />;
        }
        if(value === "in-progress"){
            return  <BuildIcon />;
        }
        return <FlightIcon />;
    };

    const handleDialogLogOpen  = () => {
        setDialogNewLog(true);
    };

    const handleDialogLogClose  = () => {
        setDialogNewLog(false);
        setRoadmapLog(createInitialState)
    };

    const handleSelectChange = ({target: {name, value}}) => {
        let roadmapLogClone = cloneDeep(roadmapLog);
        roadmapLogClone[name] = value
        setRoadmapLog(roadmapLogClone);
    }

    const handleDateTimeChange = name => dateTime => {
        let viewModel = cloneDeep(roadmapLog);
        viewModel[name] = dateTime;
        setRoadmapLog(viewModel);
    };

    const handleRoadmapLogUpdate = (roadmapLog) => {
        handleDialogLogOpen()
        setRoadmapLog(roadmapLog)
    }

    const handleRoadmapLogDelete = (roadmapLog) => {
        setRoadmapLogIdForDelete(roadmapLog.icarusRoadmapLogId);
        setDialogWarningOpen(true);
    }

    const handleDeleteRoadmapLogClose = () => {
        setDialogWarningOpen(false);
        setRoadmapLogIdForDelete(undefined);
    }

    const handleDeleteRoadmapLogConfirmed = () => {
        let viewModel = {
            icarusRoadmapLogId: roadmapLogIdForDelete,
        }
        props.supportActions.deleteRoadmapLog(viewModel);
        setDialogWarningOpen(false);
    }

    // Filters

    const handleRoadmapFilterClick = () => {
        setDialogFilterOpen(true);
    }

    const handleFilterDialogClose = () => {
        setDialogFilterOpen(false);
    }

    const handleClearAllFilters = () => {
        props.supportActions.clearAllRoadmapLogFilters()
    }

    const handleFilterSubmit = () => {
        setDialogFilterOpen(false);
        const viewModel = {
            page,
            rows_per_page: rowsPerPage,
            title: filters.title,
            description: filters.description,
            status: filters.status
        }
        props.supportActions.loadRoadmapLogsPaginateFilter(viewModel)
    }

    const handleFilterSelectBasicChange = ({ target: {name, value} }) => {
        props.supportActions.changeRoadmapLogFilters({ ...filters, [name]: value })
    }

    const handleFilterInputChange = ({ target: {name, value} }) => {
        props.supportActions.changeRoadmapLogFilters({ ...filters, [name]: value })
    }

        return (
            <div>
                <EnhancedTableToolbarSingleOption
                    title="support.roadmap"
                    onFilterClick={handleRoadmapFilterClick}
                    filtersActive={!Object.values(filters).every(value => !value)}
                    onSearchSubmit={handleFilterSubmit}
                    noAdd={true}
                />

                <Tooltip title="Roadmap">
                    <IconButton className={classes.iconColor} aria-label="Add" onClick={handleDialogLogOpen}>
                        <AddComment/>
                    </IconButton>
                </Tooltip>

                <Timeline position="alternate">
                    {roadmaps.map(item => {
                        return (
                            <TimelineItem key={item.roadmapLogId}>
                                <TimelineOppositeContent>

                                </TimelineOppositeContent>
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
                                        <Typography className={classes.marginY}>{item.description}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Estimated: {item.estimatedTimeFormatted}
                                        </Typography>
                                        <div className={classes.iconContainer}>
                                            <IconButton size="small">
                                                <EditIcon onClick={() => handleRoadmapLogUpdate(item)}/>
                                            </IconButton>
                                            <IconButton size="small" className={classes.deleteIcon} onClick={() => handleRoadmapLogDelete(item)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    </Paper>
                                </TimelineContent>
                            </TimelineItem>
                        );
                    })}
                </Timeline>

                <DialogFormFrame
                    onClose={handleFilterDialogClose}
                    title="general.selectFilters"
                    open={dialogFilterOpen}>
                    <DialogFormRoadmapLogFilter
                        gridSpacing={2}
                        filters={filters}
                        onClearAll={handleClearAllFilters}
                        onClose={handleFilterDialogClose}
                        onSubmit={handleFilterSubmit}
                        onFilterSelectBasicChange={handleFilterSelectBasicChange}
                        onFilterInputChange={handleFilterInputChange}
                        editDisabled={false}
                    />
                </DialogFormFrame>

                <DialogFormFrame
                    onClose={handleDialogLogClose}
                    title="support.logs.new"
                    open={dialogNewLog}
                    formComponent={
                        <DialogFormRoadmap
                            onClose={handleDialogLogClose}
                            onSubmit={handleRoadmapLogSubmit}
                            onInputChange={handleInputChange}
                            onSelectChange={handleSelectChange}
                            onDateTimeChange={handleDateTimeChange}
                            roadmapLog={roadmapLog}
                            />
                    } />
                <DialogDeleteWarning
                    open={dialogWarningOpen}
                    text="general.deleteWarning"
                    onDelete={handleDeleteRoadmapLogConfirmed}
                    onClose={handleDeleteRoadmapLogClose}/>

            </div>
        );
    
}

function mapStateToProps(state, ownProps) {
    return {
        roadmaps: state.SupportCenter.roadmaps,
        totalCount: state.SupportCenter.totalCount,
        filters: state.SupportCenter.roadmapFilters
    }
}

function mapDispatchToProps(dispatch) {
    return {
        supportActions: bindActionCreators(supportActions, dispatch),
    };
}

export default (connect(mapStateToProps, mapDispatchToProps) (withRouter(Roadmap)));
