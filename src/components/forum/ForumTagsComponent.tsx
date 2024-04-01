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
    showAdd: boolean,
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
                        {forumTags?.filter(tag => !(selectedTags) || selectedTags.find(topicTag => topicTag.forumTag.forumTagId === tag.forumTagId)
                            || !tag.deactivated).map((tag) => {

                            let isSelected: ForumTopicTagJoined | null = null
                            if (selectedTags) {
                                isSelected = selectedTags.find(forumTopicTagJoined =>
                                    forumTopicTagJoined.forumTag.forumTagId === tag.forumTagId
                                );
                            }

                            let styleSelected ={ border: "1px solid #C3922E", backgroundColor: "#C3922E", color: "#FFF", textTransform: "uppercase" }
                            let styleDeselected ={ border: "1px solid #C3922E", backgroundColor: "#FFF", color: "#000000", textTransform: "uppercase" }
                            let styleDeactivated = { border: "1px solid #D3D3D3", backgroundColor: "#F5F5F5", color: "#A9A9A9", textTransform: "uppercase"}
                            let styleSelectedDeactivated = { border: "1px solid #C3922E", backgroundColor: "#c9c9c9", color: "#000000", textTransform: "uppercase"}

                            return (
                                <Grid item xl={2} lg={3} md={4} sm={6} xs={6}
                                      key={tag.forumTagId}>
                                    <Chip
                                        label={tag.name}
                                        style={
                                            (tag.deactivated && isSelected) ? styleSelectedDeactivated :
                                            tag.deactivated ? styleDeactivated :
                                            isSelected ?  styleSelected :
                                            styleDeselected
                                        }
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
