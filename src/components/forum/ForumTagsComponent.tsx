import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Chip,
    Grid,
    IconButton,
    List,
    Tooltip,
    Typography
} from "@mui/material";
import {ForumTag} from "../../redux/forum/forumTags/forumTagsApi";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IntlMessages from "../core/IntlMessages";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import {styled} from "@mui/styles";
import {ForumTopicTagJoined} from "../../redux/forum/forumTopics/forumTopicsApi";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    marginLeft: 'auto',
}));

const StyledList = styled(List)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    padding: '1rem'
}));


const ForumTagsComponent = <T,>({
    forumTags,
    selectedTags,
    onTagClick,
    showAdd,
                   }: {
    forumTags: ForumTag[],
    selectedTags: ForumTopicTagJoined[] | null,
    onTagClick: (item: T) => void,
    showAdd: boolean
}) => {
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <StyledList>
                    <Typography variant="h6">
                        <IntlMessages id="general.tags" />
                    </Typography>
                    <Tooltip title={<IntlMessages id="forum.tags.create" />}>
                        <StyledIconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                onTagClick({})
                            }}
                            edge="end"
                            size="small"
                        >
                            {showAdd && <NoteAddIcon />}
                        </StyledIconButton>
                    </Tooltip>
                    </StyledList>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} style={{padding: "1rem"}}>
                        {forumTags?.map((tag) => {

                            let isSelected: ForumTopicTagJoined | null = null
                            if (selectedTags) {
                                isSelected = selectedTags.find(forumTopicTagJoined =>
                                    forumTopicTagJoined.forumTag.forumTagId === tag.forumTagId
                                );
                            }

                            return (
                                <Grid item xl={2} lg={3} md={4} sm={6} xs={6}
                                      key={tag.forumTagId}>
                                    <Chip
                                        label={tag.name}
                                        color={isSelected ? "primary" : "default"}
                                        onClick={() => onTagClick(tag)}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
export default ForumTagsComponent
