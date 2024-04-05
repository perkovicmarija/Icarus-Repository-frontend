import React, {useEffect, useState} from 'react'
import {
  ForumTopic,
  ForumTopicAttachment,
  ForumTopicTagJoined,
  useCreateUpdateForumTopicMutation,
  useGetForumTopicQuery
} from "../../redux/forum/forumTopics/forumTopicsApi";
import {ForumTag, useGetForumTagsQuery} from "../../redux/forum/forumTags/forumTagsApi";
import FormTitleBarRich from "../../components/core/Form/FormTitleBarRich";
import ForumTagsComponent from "../../components/forum/ForumTagsComponent";
import {Grid, Paper, Tooltip} from "@mui/material";
import {styled} from "@mui/styles";
import {useHistory, useParams} from "react-router-dom";
import {ForumComment} from "../../redux/forum/forumComments/forumCommentsApi";
import {
  getForumTopicCommentsPaginationPath,
  getForumTopicLikesPaginationPath,
  getForumTopicsPaginationPath,
  getForumTopicSubscribersPaginationPath
} from "../../consts/routePaths";
import JoditEditor from "jodit-react";
import PeopleIcon from '@mui/icons-material/People';
import {FormattedMessage} from "react-intl";
import {ForumTopicUserJoined} from "../../redux/forum/forumUsers/forumTopicUsersApi";
import CommentIcon from '@mui/icons-material/Comment';
import {useGetForumUserByRepositoryUserQuery} from "../../redux/forum/forumUsers/forumUsersApi";
import IntlMessages from "../../components/core/IntlMessages";
import {
  ForumLike,
  useCreateForumLikeMutation,
  useDeleteForumLikeMutation
} from "../../redux/forum/forumLikes/forumLikesApi";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import {handleNotify} from "../../helpers/utility";
import {Controller, useForm} from "react-hook-form";
import TextField2 from "../../components/core/Fields/TextField2";
import {DialogActions2} from "../../components/core/Dialog/DialogActions2";

const StyledPaper = styled(Paper)({
  minHeight: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
});

const initialForumTopic = {
  forumTopicId: '',
  content: '',
  created: null,
  createdFormatted: '',
  title: '',
  forumUserCreatedDisplayName: '',
  forumTopicTagJoineds: new Array<ForumTopicTagJoined>(),
  forumTopicUserJoineds: new Array<ForumTopicUserJoined>(),
  forumComments: new Array<ForumComment>(),
  forumTopicAttachments: new Array<ForumTopicAttachment>(),
  forumLikes: new Array<ForumLike>()
}

const ForumTopicForm = () => {
  const history = useHistory();
  const {forumTopicId} = useParams<{ forumTopicId: string }>();
  const userId = JSON.parse(localStorage.getItem("userId"))
  
  const [forumTopic, setForumTopic] = useState<ForumTopic>(initialForumTopic);
  const [loading, setLoading] = useState(false);
  
  const {handleSubmit, control} = useForm({
    defaultValues: initialForumTopic,
  });
  
  const [createUpdateForumTopic] = useCreateUpdateForumTopicMutation();
  const {
    data: forumTopicFromDb,
    refetch: refetchForumTopic
  } = useGetForumTopicQuery(forumTopicId, {skip: forumTopicId === "-1"});
  
  const {data: forumTags} = useGetForumTagsQuery();
  
  const {data: forumUser} = useGetForumUserByRepositoryUserQuery(userId, {
    skip: !userId,
  })
  
  const [createForumLike] = useCreateForumLikeMutation()
  const [deleteForumLike] = useDeleteForumLikeMutation()
  
  useEffect(() => {
    if (forumTopicId != "-1") {
      if (forumTopicFromDb?.data) {
        setForumTopic(forumTopicFromDb.data);
      } else {
        setForumTopic(initialForumTopic);
      }
    }
  }, [forumTopicFromDb]);
  
  const handleForumTopicSubmit = async (value: ForumTopic) => {
    debugger
    const result = await createUpdateForumTopic({
      ...value,
      forumTopicTagJoineds: forumTopic.forumTopicTagJoineds,
      forumUserCreatedDisplayName: forumUser.data.displayName,
    }).unwrap();
    handleNotify(result)
    history.push(getForumTopicsPaginationPath(0, 25))
  }
  
  const handleClickForumTag = (payload: ForumTag) => {
    setForumTopic(prevTopic => {
      const existingTag = prevTopic.forumTopicTagJoineds?.find(
        tagJoined => tagJoined.forumTag.forumTagId === payload.forumTagId
      );
      
      let newTags: ForumTopicTagJoined[];
      if (existingTag) {
        newTags = prevTopic.forumTopicTagJoineds!.filter(tagJoined => tagJoined.forumTag.forumTagId !== payload.forumTagId);
      } else {
        const newTagJoined: ForumTopicTagJoined = {
          forumTopicTagId: '',
          forumTopicId: prevTopic.forumTopicId,
          forumTag: payload,
        };
        newTags = [...(prevTopic.forumTopicTagJoineds || []), newTagJoined];
      }
      
      return {
        ...prevTopic,
        forumTopicTagJoineds: newTags,
      };
    });
  }
  
  const handleClickSubscribers = () => {
    history.push(getForumTopicSubscribersPaginationPath(forumTopicId, 0, 25));
  }
  
  const handleClickComments = () => {
    history.push(getForumTopicCommentsPaginationPath(forumTopicId, 0, 5));
  }
  
  const handleClickLikes = () => {
    history.push(getForumTopicLikesPaginationPath(forumTopicId, 0, 25));
  }
  
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/,
    uploader: {
      insertImageAsBase64URI: true,
    },
    cleanHTML: {
      fillEmptyParagraph: false,
    },
    height: 300,
  };
  
  const handleTopicLike = async () => {
    const existingLike: ForumLike = forumTopic.forumLikes.find((like) => like.forumUserCreatedDisplayName === forumUser.data.displayName)
    
    if (existingLike) {
      await deleteForumLike(existingLike.forumLikeId)
    } else {
      let forumLike = {
        forumTopicId: forumTopic.forumTopicId,
        forumUserCreatedDisplayName: forumUser.data.displayName
      }
      await createForumLike(forumLike)
    }
    
    refetchForumTopic()
  }
  
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FormTitleBarRich
            title={forumTopicId != "-1" ? "forum.topic.edit" : "forum.topic.new"}
            children={
              <Grid container spacing={2}>
                <Grid item>
                  <Tooltip title={<FormattedMessage id="forum.topic.likes"/>}>
                    <ThumbsUpDownIcon style={{color: "#FFFFFF", cursor: "pointer"}} fontSize="small"
                                      onClick={handleClickLikes}
                    />
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title={<FormattedMessage id="forum.comments"/>}>
                    <CommentIcon style={{color: "#FFFFFF", cursor: "pointer"}} fontSize="small"
                                 onClick={handleClickComments}
                    />
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title={<FormattedMessage id="forum.subscribers"/>}>
                    <PeopleIcon style={{color: "#FFFFFF", cursor: "pointer"}} fontSize="small"
                                onClick={handleClickSubscribers}
                    />
                  </Tooltip>
                </Grid>
              </Grid>
            }
          />
        </Grid>
        
        <Grid item xs={12}>
          <form
            onSubmit={(e) => {
              e.stopPropagation();
              handleSubmit((data) => {
                setLoading(true);
                handleForumTopicSubmit(data as ForumTopic)
                  .catch(() => setLoading(false));
              })(e);
            }}
          >
            <Grid container spacing={2}>
              
              <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                <StyledPaper style={{padding: "5rem"}}>
                  <TextField2
                    control={control}
                    label="forum.topic"
                    name="title"
                    rules={{required: "general.required"}}
                    placeholder="forum.topic"
                  />
                  
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <h4><IntlMessages id="forum.user"/>:&nbsp;</h4><span>{forumUser?.data.displayName}</span>
                  </div>
                </StyledPaper>
              </Grid>
              
              <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                <StyledPaper>
                  <ForumTagsComponent
                    onTagClick={handleClickForumTag}
                    forumTags={forumTags?.data}
                    selectedTags={forumTopic.forumTopicTagJoineds}
                    showAdd={false}
                  />
                </StyledPaper>
              </Grid>
              
              <Grid item xs={12}>
                <Controller
                  name="content"
                  control={control}
                  defaultValue=""
                  render={({field: {onChange, value}}) => (
                    <JoditEditor
                      value={forumTopic.content}
                      config={config}
                      onBlur={newContent => onChange(newContent)}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12}>
                Attachments here
              </Grid>
              
              {forumTopicId != "-1" &&
                <Grid item xs={12} style={{display: "flex", alignItems: "center"}}>
                  <div onClick={() => handleTopicLike()}
                       style={{cursor: "pointer", display: "inline-flex", alignItems: "center"}}>
                    {forumTopic.forumLikes.find((like) => like.forumUserCreatedDisplayName === forumUser?.data.displayName) ? (
                      <ThumbUpIcon fontSize="small" style={{marginRight: "0.3rem", transform: "scale(0.8)"}}/>
                    ) : (
                      <ThumbUpOutlinedIcon color="action" fontSize="small"
                                           style={{marginRight: "0.3rem", transform: "scale(0.8)"}}/>
                    )}
                  </div>
                  <p>{forumTopic.forumLikes.length} <IntlMessages id="forum.likes"/></p>
                </Grid>
              }
              
              <Grid item xs={12}>
                <DialogActions2 onClose={() => history.push(getForumTopicsPaginationPath(0, 25))} loading={loading}/>
              </Grid>
            
            </Grid>
          
          </form>
        </Grid>
      </Grid>
    </>
  
  )
}
export default ForumTopicForm
