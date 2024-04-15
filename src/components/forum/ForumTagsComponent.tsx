import {
  Chip,
  Grid,
  IconButton,
  List,
  Tooltip,
  Typography,
} from "@mui/material";
import { ForumTag } from "../../redux/forum/forumTags/forumTagsApi";
import IntlMessages from "../core/IntlMessages";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { styled } from "@mui/styles";
import { CSSProperties } from "react";

const StyledIconButton = styled(IconButton)({
  marginLeft: "auto",
});

const StyledList = styled(List)({
  display: "flex",
  flexDirection: "row",
  padding: "1rem",
});

const styleSelected = {
  border: "1px solid #C3922E",
  backgroundColor: "#C3922E",
  color: "#FFF",
  textTransform: "uppercase",
} as CSSProperties;
const styleDeselected = {
  border: "1px solid #C3922E",
  backgroundColor: "#FFF",
  color: "#000000",
  textTransform: "uppercase",
} as CSSProperties;
const styleDeactivated = {
  border: "1px solid #D3D3D3",
  backgroundColor: "#F5F5F5",
  color: "#A9A9A9",
  textTransform: "uppercase",
} as CSSProperties;
const styleSelectedDeactivated = {
  border: "1px solid #C3922E",
  backgroundColor: "#c9c9c9",
  color: "#000000",
  textTransform: "uppercase",
} as CSSProperties;

const ForumTagsComponent = ({
  options,
  selectedTags,
  onTagClick,
  showAdd,
  isFetching,
}: {
  options: ForumTag[];
  selectedTags: ForumTag[] | null;
  onTagClick: (item: ForumTag | {}) => void;
  showAdd: boolean;
  isFetching?: boolean;
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
                  onTagClick({});
                }}
                edge="end"
                size="small"
              >
                {showAdd && <NoteAddIcon />}
              </StyledIconButton>
            </Tooltip>
          </StyledList>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            padding: "1rem",
            display: "flex",
            rowGap: "1rem",
            columnGap: "1rem",
            flexWrap: "wrap",
            opacity: isFetching ? 0.4 : 1,
          }}
        >
          {options
            ?.filter(
              (tag) =>
                !selectedTags ||
                selectedTags.find(
                  (topicTag) => topicTag.forumTagId === tag.forumTagId
                ) ||
                !tag.deactivated
            )
            .map((tag) => {
              let isSelected: boolean = false;
              if (selectedTags) {
                isSelected =
                  selectedTags.find(
                    (selectedTag) => selectedTag.forumTagId === tag.forumTagId
                  ) !== undefined;
              }

              return (
                <Chip
                  key={tag.forumTagId}
                  label={tag.name}
                  style={
                    tag.deactivated && isSelected
                      ? styleSelectedDeactivated
                      : tag.deactivated
                      ? styleDeactivated
                      : isSelected
                      ? styleSelected
                      : styleDeselected
                  }
                  onClick={() => onTagClick(tag)}
                />
              );
            })}
        </Grid>
      </Grid>
    </>
  );
};
export default ForumTagsComponent;
