import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { makeStyles } from "@mui/styles";
import {
  TableBody,
  TableCell,
  TableRow,
  Grid,
  Button,
  Typography,
  Divider,
  TableContainer,
  Table,
} from "@mui/material";
import { NoteAdd } from "@mui/icons-material";
import { cloneDeep } from "lodash";
import DialogFormComment from "../../../../components/support/DialogFormComment";
import IntlMessages from "../../../../components/core/IntlMessages";
import DialogFormFrame from "../../../../components/core/Dialog/DialogFormFrame";
import * as supportActions from "../../../../redux/support/supportActions";

const useStyles = makeStyles((theme) => ({
  block: {
    padding: theme.spacing(3),
  },
  commentRow: {
    whiteSpace: "pre-wrap",
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  dividerContainer: {
    height: "100%",
  },
}));

function SupportBugComments(props) {
  const classes = useStyles();

  const [dialogNewCommentOpen, setDialogNewCommentOpen] = useState(false);
  const [supportBug, setSupportBug] = useState({
    comments: [],
    supportBugAttachments: [],
  });
  const [newComment, setNewComment] = useState({});

  useEffect(() => {
    if (props.supportBug.supportBugId) {
      setSupportBug(props.supportBug);
    }
  }, [props.supportBug]);

  const handleInputChange = ({ target: { name, value } }) => {
    let newCommentClone = cloneDeep(newComment);
    newCommentClone[name] = value;
    setNewComment(newCommentClone);
  };

  const handleDialogCommentOpen = () => {
    setDialogNewCommentOpen(true);
  };

  const handleDialogCommentClose = () => {
    setDialogNewCommentOpen(false);
  };

  const handleSubmitComment = () => {
    let newCommentClone = cloneDeep(newComment);

    newCommentClone.supportBugId = supportBug.supportBugId;
    props.supportActions.addComment(newCommentClone);

    setDialogNewCommentOpen(false);
    setNewComment({});
  };

  return (
    <Grid container className={classes.block}>
      <Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
        <Grid container spacing={2}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h6" display="block">
              <IntlMessages id="general.title" />
            </Typography>
            <Typography variant="body2" gutterBottom>
              {supportBug.title}
            </Typography>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h6" display="block">
              <IntlMessages id="general.description" />
            </Typography>
            <Typography variant="body2" gutterBottom>
              {supportBug.bug}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1}>
        <Grid container className={classes.dividerContainer}>
          <Divider orientation="vertical" component="div" flexItem />
        </Grid>
      </Grid>
      <Grid item xl={8} lg={8} md={8} sm={8} xs={12}>
        {/* <EnhancedTableToolbarRich
                    title="general.comments"
                >
                    <Button className={classes.button} color="secondary" onClick={handleDialogCommentOpen}>
                        <IntlMessages id="general.addNew"/>
                        <NoteAdd className={classes.rightIcon}/>
                    </Button>
                </EnhancedTableToolbarRich> */}
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              {supportBug.comments.map((item) => {
                return (
                  <TableRow
                    className={classes.tableRow}
                    key={item.supportBugMessageId}
                    onClick={null}
                    hover={true}
                  >
                    <TableCell className={classes.tableData}>
                      {item.userAuthor.fullName}
                    </TableCell>
                    <TableCell className={classes.tableData}>
                      {item.created}
                    </TableCell>
                    {item.automaticMessage ? (
                      <TableCell className={classes.commentRow}>
                        <p>
                          <strong>{item.comment}</strong>
                        </p>
                      </TableCell>
                    ) : (
                      <TableCell className={classes.commentRow}>
                        <p>{item.comment}</p>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <DialogFormFrame
        onClose={handleDialogCommentClose}
        title="support.item"
        open={dialogNewCommentOpen}
      >
        <DialogFormComment
          onClose={handleDialogCommentClose}
          onSubmit={handleSubmitComment}
          onInputChange={handleInputChange}
          item={newComment}
        />
      </DialogFormFrame>
    </Grid>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    supportBug: state.SupportCenter.supportBug,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    supportActions: bindActionCreators(supportActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SupportBugComments);
