import React from 'react'
import FormTitleBarRich from "../../../components/core/Form/FormTitleBarRich";
import {Grid, Tooltip} from "@mui/material";
import {FormattedMessage} from "react-intl";
import PeopleIcon from '@mui/icons-material/People';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import {
  getForumTopicCommentsPaginationPath,
  getForumTopicLikesPaginationPath,
  getForumTopicSubscribersPaginationPath
} from "../../../consts/routePaths";
import {useHistory, useParams} from "react-router-dom";


const ForumTopicHeader = () => {
  const history = useHistory();
  const {forumTopicId} = useParams<{ forumTopicId: string }>();
  
  const handleClickSubscribers = () => {
    history.push(getForumTopicSubscribersPaginationPath(forumTopicId, 0, 25));
  }
  
  const handleClickComments = () => {
    history.push(getForumTopicCommentsPaginationPath(forumTopicId, 0, 5));
  }
  
  const handleClickLikes = () => {
    history.push(getForumTopicLikesPaginationPath(forumTopicId, 0, 25));
  }
  
  return (
    <Grid item xs={12}>
      <FormTitleBarRich
        title={forumTopicId != "-1" ? "forum.topic.edit" : "forum.topic.new"}
        children={
          <Grid container spacing={4}>
            <Grid item>
              <Tooltip title={<FormattedMessage id="forum.topic.likes"/>}>
                <ThumbsUpDownIcon style={{color: "#FFFFFF", cursor: "pointer"}}
                                  onClick={handleClickLikes}
                />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={<FormattedMessage id="forum.comments"/>}>
                <CommentIcon style={{color: "#FFFFFF", cursor: "pointer"}}
                             onClick={handleClickComments}
                />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={<FormattedMessage id="forum.subscribers"/>}>
                <PeopleIcon style={{color: "#FFFFFF", cursor: "pointer"}}
                            onClick={handleClickSubscribers}
                />
              </Tooltip>
            </Grid>
          </Grid>
        }
      />
    </Grid>
  )
}
export default ForumTopicHeader
